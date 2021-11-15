using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicTacToeClient.controllers
{
    public class MainViewController
    {
        private B72905.B72905_TicTacToePortClient client = new B72905.B72905_TicTacToePortClient();
        private String lastStatus { get; set; }

        public MainViewController()
        {
            lastStatus = "standby";
        }
        public void StartGame()
        {
            client.startGame();
        }

        public String Mark(int row, int col)
        {
            String status = client.mark(row, col);

            if (status == "invalidMovement")
                return "Invalid Movement";
            else if (status == "inProgress")
                return "In progress";
            else if (status == "finished")
                return "Game finished";
            else if (status == "standby")
                return "Game has not started";

            return "Unexpected status";
        }
    }
}
