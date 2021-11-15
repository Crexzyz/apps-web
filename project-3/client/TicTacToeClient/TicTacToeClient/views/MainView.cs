using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;
using TicTacToeClient.controllers;

namespace TicTacToeClient
{
    public partial class MainView : Form
    {
        private readonly MainViewController controller = new MainViewController();
        private readonly Image circle = global::TicTacToeClient.Properties.Resources.circle;
        private readonly Image cross = global::TicTacToeClient.Properties.Resources.cross;
        private String symbol = "X";

        public MainView()
        {
            InitializeComponent();

            foreach (Control control in this.Board.Controls)
            {
                control.MouseClick += new MouseEventHandler(Board_Click);
                control.MouseEnter += new EventHandler(Board_Hover);
                control.MouseLeave += new EventHandler(Board_Leave);
            }
        }

        private void StartButton_Click(object sender, EventArgs e)
        {
            controller.StartGame();
            this.LastMovementLabel.Text = "Game started";
            this.StartButton.Enabled = false;
        }

        private void Board_CellPaint(object sender, TableLayoutCellPaintEventArgs e)
        {
            var panel = sender as TableLayoutPanel;
            e.Graphics.SmoothingMode = SmoothingMode.HighQuality;
            var rectangle = e.CellBounds;
            using (var pen = new Pen(Color.Black, 1))
            {
                pen.Alignment = System.Drawing.Drawing2D.PenAlignment.Center;
                pen.DashStyle = System.Drawing.Drawing2D.DashStyle.Solid;

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

            panel.BackColor = Color.White;
        }

        private void Board_Leave(object sender, EventArgs e)
        {
            var panel = sender as Panel;

            panel.BackColor = default(Color);
        }

        private void Board_Click(object sender, MouseEventArgs e)
        {
            var clickedRow = Board.GetRow((Control)sender);
            var clickedColumn = Board.GetColumn((Control)sender);

            String status = controller.Mark(clickedRow, clickedColumn);

            this.LastMovementLabel.Text = status;

            if (status != "In progress" && status != "Game finished")
                return;

            var cell = sender as Panel;
            cell.BackgroundImage = GetSymbol();
            cell.BackgroundImageLayout = ImageLayout.Zoom;
            ToggleSymbol();
        }
    }
}
