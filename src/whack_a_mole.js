import React, { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return; // Ignore if cell is filled or game is won
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);

  return (
    <div className="tic-tac-toe">
      <h2>Tic Tac Toe</h2>
      <div className="game-board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell === 'X' ? 'x' : cell === 'O' ? 'o' : ''}`}
            onClick={() => handleClick(index)}
          >
            {cell === 'X' ? <img src="./asset/cross.png" alt="X" /> : cell === 'O' ? <img src="./assets/circle.png" alt="O" /> : null}
          </div>
        ))}
      </div>
      {winner && <div className="result">{winner} wins!</div>}
      {!winner && board.every(cell => cell) && <div className="result">It's a tie!</div>}
    </div>
  );
};

export default TicTacToe;
