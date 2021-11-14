<?php

class TicTacToe {
    private $TOP_FILENAME = "Top.json";
    private $STATUS_STANDBY = 'standby';
    private $STATUS_INVALID_MOVEMENT = 'invalidMovement';
    private $STATUS_IN_PROGRESS = 'inProgress';
    private $STATUS_FINISHED = 'finished';
    private $ROWS = 3;
    private $COLS = 3;

    private $board = array(
        array('-', '-', '-'),
        array('-', '-', '-'),
        array('-', '-', '-'),
    );

    private $turn = 'X';
    private $status = '';
    private $winnerInfo = '';
    private $turnNumber = 0;

    private $playerStartTime = 0;
    private $playerFinalTime = 0;
    private $playerName = 'No name';

    private $lastBotPlay = '';

    public function __construct() {
        $this->status = $this->STATUS_STANDBY;
    }

    private function toggleTurn() {
        $this->turnNumber++;
        $this->turn = $this->turn === 'X' ? 'O' : 'X';
    }

    private function getWinnerRow() {
        $rowWin = true;
        
        for($row = 0; $row < $this->ROWS; $row++) {
            $rowWin = true;
            $symbol = $this->board[$row][0];

            for($col = 1; $col < $this->COLS; $col++) {
                $currentSymbol =  $this->board[$row][$col];
                if($symbol === '-' || $symbol !== $currentSymbol)
                    $rowWin = false;
               
            }
            if($rowWin)
                break;
        }

        if($rowWin)
            return "r,$row,{$symbol}";

        return '';
    }

    private function getWinnerCol() {
        $colWin = true;

        for($col = 0; $col < $this->COLS; $col++) {
            $colWin = true;
            $symbol = $this->board[0][$col];
            
            for($row = 1; $row < $this->ROWS; $row++) {
                $currentSymbol =  $this->board[$row][$col];
                if($symbol === '-' || $symbol !== $currentSymbol)
                    $colWin = false;
            }
            if($colWin)
                break;
        }
        
        if($colWin)
            return "c,$col,{$symbol}";

        return '';
    }

    private function getWinnerDiag() {
        $diagWin = true;

        $symbol = $this->board[0][0];
        
        for($pair = 1; $pair < $this->ROWS; $pair++) {
            $currentSymbol =  $this->board[$pair][$pair];
            if($symbol === '-' || $symbol !== $currentSymbol)
                $diagWin = false;
        }
        
        if($diagWin)
            return "d,l,{$symbol}";
        
        $diagWin = true;
        $symbol = $this->board[0][$this->COLS - 1];

        $row = 1;
        $col = 1;
        while ($row < $this->ROWS && $col >= 0) {
            $currentSymbol = $this->board[$row][$col];

            if($symbol === '-' || $symbol !== $currentSymbol)
                $diagWin = false;

            $row++;
            $col--;
        }
        
        if($diagWin)
            return "d,r,{$symbol}";

        return '';
    }

    private function searchWinner() {
        $rowsStatus = $this->getWinnerRow();

        if($rowsStatus !== '') {
            $this->status = $this->STATUS_FINISHED;
            return $rowsStatus;
        }
            
        $colsStatus = $this->getWinnerCol();

        if($colsStatus !== '') {
            $this->status = $this->STATUS_FINISHED;
            return $colsStatus;
        }

        $diagsStatus = $this->getWinnerDiag();

        if($diagsStatus !== '') {
            $this->status = $this->STATUS_FINISHED;
            return $diagsStatus;
        }

        if($this->turnNumber >= 7) {
            $this->status = $this->STATUS_FINISHED;
            return 'draw';
        }

        $this->status = $this->STATUS_IN_PROGRESS;
        return '';
    }

    private function updateTop() {
        $top = json_decode(file_get_contents($this->TOP_FILENAME), true);

        $playerEntry = array(
            'name' => $this->playerName,
            'time' => $this->playerFinalTime
        );
        
        array_push($top, $playerEntry);
        array_multisort(array_column($top, 'time'), SORT_ASC, $top);
        array_pop($top);

        file_put_contents($this->TOP_FILENAME, json_encode($top));
    }

    public function botPlay() {
        $freePositions = array();
        for($row = 0; $row < $this->ROWS; $row++) {
            for($col = 0; $col < $this->COLS; $col++) {
                if($this->board[$row][$col] === '-')
                    array_push($freePositions, array($row, $col));
            }
        }

        $markIndex = random_int(0, count($freePositions) - 1);
        $markPosition = $freePositions[$markIndex];
        $status = $this->mark($markPosition[0], $markPosition[1]);
        if($status !== $this->STATUS_INVALID_MOVEMENT)
            $this->lastBotPlay = "$markPosition[0], $markPosition[1]";
        else
            $this->lastBotPlay = $this->STATUS_INVALID_MOVEMENT;

        return $status;
    }

    public function getLastBotPlay() {
        return $this->lastBotPlay;
    }

    public function getWinnerInfo() {
        return $this->winnerInfo;
    }

    public function printBoard() {
        echo "Turn: {$this->turnNumber}";
        echo PHP_EOL;
        for($row = 0; $row < $this->ROWS; $row++) {
            for($col = 0; $col < $this->COLS; $col++) {
                echo $this->board[$row][$col];
            }
            echo PHP_EOL;
        }
    }

    public function getTopPlayers() {
        return file_get_contents($this->TOP_FILENAME);
    }

    public function setPlayerName($name = "No name") {
        $this->playerName = $name;
    }

    public function startGame() {
        $this->playerStartTime = microtime(true);
        $this->status = $this->STATUS_IN_PROGRESS;
    }

    public function getTime() {
        if($this->status !== $this->STATUS_FINISHED)
            return -1;

        return round($this->playerFinalTime, 2);
    }

    public function saveTime() {
        if($this->status !== $this->STATUS_FINISHED) 
            return $this->STATUS_INVALID_MOVEMENT;
        
        $this->updateTop();
        return $this->status;
    }

    public function mark($row = -1, $col = -1) {
        if($this->status === $this->STATUS_STANDBY)
            return $this->status;

        if($this->status === $this->STATUS_FINISHED)
            return $this->status;

        if($row < 0 || $row > 2 || $col < 0 || $col > 2) {
            $this->status = $this->STATUS_INVALID_MOVEMENT;
            return $this->status;
        }

        if($this->board[$row][$col] !== '-') {
            $this->status = $this->STATUS_INVALID_MOVEMENT;
            return $this->status;
        }

        $this->board[$row][$col] = $this->turn;
        $this->toggleTurn();
        $this->winnerInfo = $this->searchWinner();

        if($this->status === $this->STATUS_FINISHED) {
            $endTime = microtime(true);
            $this->playerFinalTime = $endTime - $this->playerStartTime;
        }

        return $this->status;
    }
}

?>
