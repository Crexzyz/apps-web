using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using Newtonsoft.Json;
using TicTacToeClient.models;

namespace TicTacToeClient.controllers
{
    public class MainViewController
    {
        private B72905.B72905_TicTacToePortClient client = new B72905.B72905_TicTacToePortClient();
        private string LastStatus { get; set; }
        public bool BotPlaying { get; set; } = true;
        public Point BotPlay { get; set; }

        public List<TopPlayerEntry> TopPlayers { get; set; }

        public static readonly string CONTROLLER_INVALID = "invalidMovement";
        public static readonly string CONTROLLER_PROGRESS = "inProgress";
        public static readonly string CONTROLLER_FINISHED = "finished";
        public static readonly string CONTROLLER_STANDBY = "standby";

        public static readonly string MESSAGE_INVALID = "Invalid movement";
        public static readonly string MESSAGE_PROGRESS = "Game in progress";
        public static readonly string MESSAGE_FINISHED_REPEAT = "Game already finished";
        public static readonly string MESSAGE_FINISHED = "Game finished";
        public static readonly string MESSAGE_STANDBY = "Game has not started";
        public static readonly string MESSAGE_UNEXPECTED = "Unexpected status";


        public MainViewController()
        {
            LastStatus = "standby";
            UpdateTopPlayers();
        }

        public void UpdateTopPlayers()
        {
            string topPlayersJsonString = client.getTopPlayers();
            TopPlayers = JsonConvert.DeserializeObject<List<TopPlayerEntry>>(topPlayersJsonString);
        }
        public void StartGame()
        {
            client.startGame();
        }

        private string StatusToMessage(string controllerStatus)
        {
            string status;
            if (controllerStatus == CONTROLLER_INVALID)
                status = MESSAGE_INVALID;
            else if (controllerStatus == CONTROLLER_PROGRESS)
                status = MESSAGE_PROGRESS;
            else if (controllerStatus == CONTROLLER_FINISHED && LastStatus == CONTROLLER_PROGRESS)
                status = MESSAGE_FINISHED;
            else if (controllerStatus == CONTROLLER_FINISHED && LastStatus == CONTROLLER_FINISHED)
                status = MESSAGE_FINISHED_REPEAT;
            else if (controllerStatus == CONTROLLER_STANDBY)
                status = MESSAGE_STANDBY;
            else
                status = MESSAGE_UNEXPECTED;

            LastStatus = controllerStatus;
            return status;
        }

        public string BotMark()
        {
            if(LastStatus == CONTROLLER_FINISHED)
            {
                return MESSAGE_FINISHED;
            }

            string controllerStatus = client.botPlay();
            string status = StatusToMessage(controllerStatus);

            string[] botCoordinates = client.getLastBotPlay().Split(',');
            // X = col, Y = row
            BotPlay = new Point(int.Parse(botCoordinates[1]), int.Parse(botCoordinates[0]));

            return status;
        }

        public string Mark(int row, int col)
        {
            string controllerStatus = client.mark(row, col);
            return StatusToMessage(controllerStatus);
        }

        public string[] GetWinnerInfo()
        {
            return client.getWinnerInfo().Split(',');
        }

        public string GetGameTime()
        {
            return client.getTime().ToString();
        }

        public void ResetGame()
        {
            client.resetGame();
        }

        public string SavePlayerTime(string playerName)
        {
            client.setPlayerName(playerName);
            string controllerStatus = client.saveTime();
            string status;
            if (controllerStatus == CONTROLLER_FINISHED)
                status = "Saved";
            else
                status = "Game could not be saved";

            UpdateTopPlayers();
            return status;
        }
    }
}
