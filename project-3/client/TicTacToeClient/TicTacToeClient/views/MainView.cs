using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;
using TicTacToeClient.controllers;
using TicTacToeClient.models;

namespace TicTacToeClient
{
    public partial class MainView : Form
    {
        private readonly MainViewController controller = new MainViewController();
        private readonly Image circle = Properties.Resources.circle;
        private readonly Image cross = Properties.Resources.cross;
        private string symbol = "X";

        public MainView()
        {
            InitializeComponent();

            foreach (Control control in Board.Controls)
            {
                control.MouseClick += new MouseEventHandler(Board_Click);
                control.MouseEnter += new EventHandler(Board_Hover);
                control.MouseLeave += new EventHandler(Board_Leave);
            }

            UpdateTopPlayers();
        }

        private void UpdateTopPlayers()
        {
            foreach (TopPlayerEntry player in controller.TopPlayers)
            {
                string[] subItems = { player.Name, player.Time.ToString() };
                ListViewItem item = new ListViewItem(subItems);
                TopPlayersList.Items.Add(item);
            }

            TopPlayersList.AutoResizeColumns(ColumnHeaderAutoResizeStyle.ColumnContent);
        }

        private void StartButton_Click(object sender, EventArgs e)
        {
            if(StartButton.Text == "Replay")
            {
                CleanBoard();
                controller.ResetGame();
            }

            StatusLabel.Text = "Connecting to server...";
            controller.BotPlaying = PlayVsAI.Checked;
            controller.StartGame();
            StatusLabel.Text = "Game started";
            StartButton.Enabled = false;
            PlayVsAI.Enabled = false;
        }

        private void CleanBoard()
        {
            foreach (Control control in Board.Controls)
            {
                Panel panel = control as Panel;
                panel.BackColor = default;
                panel.BackgroundImage = null;
            }
        }

        private void Board_CellPaint(object sender, TableLayoutCellPaintEventArgs e)
        {
            var panel = sender as TableLayoutPanel;
            e.Graphics.SmoothingMode = SmoothingMode.HighQuality;
            var rectangle = e.CellBounds;
            using (var pen = new Pen(Color.Black, 1))
            {
                pen.Alignment = PenAlignment.Center;
                pen.DashStyle = DashStyle.Solid;

                if (e.Row == (panel.RowCount - 1))
                {
                    rectangle.Height -= 1;
                }

                if (e.Column == (panel.ColumnCount - 1))
                {
                    rectangle.Width -= 1;
                }

                e.Graphics.DrawRectangle(pen, rectangle);
            }
        }

        private void ToggleSymbol()
        {
            symbol = symbol == "X" ? "O" : "X";
        }

        private Image GetSymbol()
        {
            if (symbol == "X")
                return cross;
            else if (symbol == "O")
                return circle;
            else
                return null;
        }

        private void Board_Hover(object sender, EventArgs e)
        {
            var panel = sender as Panel;
            if (panel.BackColor == Color.Green)
                return;
            panel.BackColor = Color.White;
        }

        private void Board_Leave(object sender, EventArgs e)
        {
            var panel = sender as Panel;
            if (panel.BackColor == Color.Green)
                return;
            panel.BackColor = default;
        }

        private bool UpdateBoard(string status)
        {
            return status == MainViewController.MESSAGE_PROGRESS || status == MainViewController.MESSAGE_FINISHED;
        }

        private bool ShowWinner(string status)
        {
            return status == MainViewController.MESSAGE_FINISHED_REPEAT || status == MainViewController.MESSAGE_FINISHED;
        }

        private void SetGreenBackground(int row, int col)
        {
            Panel panel = Board.GetControlFromPosition(col, row) as Panel;
            panel.BackColor = Color.Green;
        }

        private void SetCellBackground(string message, Panel cell)
        {
            if (!UpdateBoard(message))
                return;

            cell.BackgroundImage = GetSymbol();
            cell.BackgroundImageLayout = ImageLayout.Zoom;
            ToggleSymbol();
        }

        private void ShowWinner(string type, string direction)
        {
            if(type == "r")
            {
                int row = int.Parse(direction);
                for(int col = 0; col < 3; ++col)
                    SetGreenBackground(row, col);
            }
            else if(type == "c")
            {
                int col = int.Parse(direction);
                for (int row = 0; row < 3; ++row)
                    SetGreenBackground(row, col);
            }
            else if(type == "d" && direction == "l")
            {
                for(int pair = 0; pair < 3; pair++)
                    SetGreenBackground(pair, pair);
            }
            else if (type == "d" && direction == "r")
            {
                for (int row = 0, col = 2; row < 3 && col >= 0; row++, col--)
                    SetGreenBackground(row, col);
            }
        }

        private void RunPostGameTasks()
        {
            string[] winnerInfo = controller.GetWinnerInfo();
            if(winnerInfo.Length > 2)
                ShowWinner(winnerInfo[0], winnerInfo[1]);

            string gameTime = controller.GetGameTime();
            TimeLabel.Text = "Time: " + gameTime + " seconds";

            SaveTimeButton.Enabled = true;
            PlayerNameTextBox.Enabled = true;

            StartButton.Text = "Replay";
            StartButton.Enabled = true;
            PlayVsAI.Enabled = true;
        }

        private void Board_Click(object sender, MouseEventArgs e)
        {
            StatusLabel.Text = "Connecting to server...";

            var clickedRow = Board.GetRow(sender as Control);
            var clickedColumn = Board.GetColumn(sender as Control);
            string status = controller.Mark(clickedRow, clickedColumn);
            StatusLabel.Text = status;
            SetCellBackground(status, sender as Panel);

            if (status != MainViewController.MESSAGE_PROGRESS)
            {
                if (ShowWinner(status))
                    RunPostGameTasks();

                return;
            }

            if (!controller.BotPlaying)
                return;

            status = controller.BotMark();
            var botCoordinates = controller.BotPlay;
            BotMark(botCoordinates.Y, botCoordinates.X, status);

            StatusLabel.Text = status;
            if (status != MainViewController.MESSAGE_PROGRESS)
                if (ShowWinner(status))
                    RunPostGameTasks();
        }
            
        private void BotMark(int row, int col, string message)
        {
            Panel cell = Board.GetControlFromPosition(col, row) as Panel;
            SetCellBackground(message, cell);
        }

        private void SaveTimeButton_Click(object sender, EventArgs e)
        {
            string playerName = PlayerNameTextBox.Text;
            StatusLabel.Text = "Connecting to server...";
            string status = controller.SavePlayerTime(playerName);
            TopPlayersList.Items.Clear();
            UpdateTopPlayers();
            StatusLabel.Text = status;
        }
    }
}
