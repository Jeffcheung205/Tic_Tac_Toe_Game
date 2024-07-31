// tic-tac-toe.js
window.initGame = (React, assetsUrl) => {
  const { useState } = React;

  // Initialise the tic tac toe
   const TicTacToe = ({  assetsUrl })  => {
    const handleClick = (index) => {
      if (board[index] === null) {
        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    };

    const checkWin = () => {
      const winningLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
      ];

      for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
          return board[a];
        }
      }

      if (board.every(cell => cell !== null)) {
        return 'Tie';
      }

      return null;
    };

    const winner = checkWin();

    return React.createElement(
      'div',
      { className: "tic-tac-toe" },
      React.createElement('h2', null, "Tic Tac Toe"),
      React.createElement(
        'div',
        { className: "board" },
        board.map((cell, index) =>
          React.createElement(
            'div',
            {
              key: index,
              className: `cell ${cell === 'X' ? 'x' : cell === 'O' ? 'o' : ''}`,
              onClick: () => handleClick(index)
            },
           index === 'X' ?  React.createElement('img', { src: `${assetsUrl}/cross.png`, alt: 'cross' }) : 
            React.createElement('img', { src: `${assetsUrl}/circle.png`, alt: 'circle' })
          )
        ),
      )
      winner && React.createElement('div', { className: "result" }, `${winner} wins!`)
    );
  };
 return React.createElement(TicTacToe, { assetsUrl: assetsUrl });
};
console.log('Tic-Tac-Toe game script loaded');
