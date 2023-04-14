import React, { useState } from "react";
import { ResetButton } from "./components/ResetButton";
import { ScoreBoard } from "./components/ScoreBoard";
import { Board } from "./components/Board";
import { RestartButton } from "./components/RestartButton";
import { RedoButton } from "./components/RedoButton";

export default function Home() {
  const win_combinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [6, 7, 8],
    [2, 5, 8],
    [3, 4, 5],
    [1, 4, 7],
    [2, 4, 6]
  ];

  const [is_x_playing, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ x_score: 0, o_score: 0 });
  const [is_game_over, setGameOver] = useState(false);
  const [turns, setTurns] = useState(1);
  const [last_board, setLastBoard] = useState(Array(9).fill(null));
  const [is_one_player, setOnePlayer] = useState(false);

  const mainBoardHandling = (boxIdx) => {
    setLastBoard(board);
    // Update the board
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return is_x_playing ? "X" : "O";
      } else {
        return value;
      }
    });

    setBoard(updatedBoard);

    const count = turns + 1;
    setTurns(count);

    //Alternating the player
    setXPlaying(!is_x_playing);

    //Check for winner and update the score
    const winner = checkForWinner(updatedBoard);

    if (winner) {
      if (winner === "O") {
        let { o_score } = scores;
        o_score += 1;
        setScores({ ...scores, o_score });
      } else {
        let { x_score } = scores;
        x_score += 1;
        setScores({ ...scores, x_score });
      }
      alert(`Player - ${winner} won the round ;)`);
      setTimeout(nextRound(), 3000);
    } else {
      //check if all boxes are filled and there is draw
      if (turns === 9)
        if (is_game_over === false) {
          setTurns(1);
          setGameOver(true);
          alert(`Draw :0`);
          setTimeout(nextRound(), 3000);
        }
    }
  };

  const allEmpty = () => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "X" || board[i] === "O") {
        return false;
      }
    }
    return true;
  };

  const equalArray = (array1, array2) => {
    if (!(array1.length === array2.length)) {
      return false;
    }

    for (let i = 0; i < array1.length; i++) {
      if (!(array1[i] === array2[i])) {
        return false;
      }
    }
    return true;
  };

  const restartGame = () => {
    let conf_msg = "Do you want to restart the game??";
    if (!window.confirm(conf_msg)) {
      return;
    }
    setTurns(1);
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setLastBoard(Array(9).fill(null));
    setScores({ x_score: 0, o_score: 0 });
  };

  const resetBoard = () => {
    let conf_msg = "Do you want to reset the Board??";
    if (!window.confirm(conf_msg)) {
      return;
    }
    setTurns(1);
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setLastBoard(Array(9).fill(null));
  };

  const nextRound = () => {
    setTurns(1);
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setLastBoard(Array(9).fill(null));
  };

  const checkForWinner = (board) => {
    for (let i = 0; i < win_combinations.length; i++) {
      const [x, y, z] = win_combinations[i];

      // Iterate through win conditions and check if either player satisfies them
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setTurns(1);
        setGameOver(true);
        return board[x];
      }
    }
  };
  const redo = () => {
    if (!equalArray(board, last_board)) {
      setTurns(turns - 1);
      setBoard(last_board);
      if (is_one_player === false) {
        setOnePlayer(is_one_player);
        if (!allEmpty()) setXPlaying(!is_x_playing);
      }
    }
  };

  return (
    <div className="Home">
      <ScoreBoard scores={scores} is_x_playing={is_x_playing} />
      <Board
        board={board}
        onClick={is_game_over ? resetBoard : mainBoardHandling}
      />
      <RedoButton redo={redo} />
      <RestartButton restartGame={restartGame} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}
