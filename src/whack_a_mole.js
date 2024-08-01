// Minimax algorithm to determine the best move
function minimax(board, player, isMaximizing) {
  const result = calculateWinner(board);
  const scores = {
    X: 1,
    O: -1,
    draw: 0,
  };

  if (result) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = player;
        const score = minimax(newBoard, player, false); // Switch to minimizing player
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore; // Return the best score for maximizing player
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = player === 'X' ? 'O' : 'X'; // Switch to maximizing player
        const score = minimax(newBoard, player, true); // Switch to maximizing player
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore; // Return the best score for minimizing opponent
  }
}

// Function to check if there is a winning move available for the AI
 function findWinningMove(board, player) {
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const newBoard = [...board];
      newBoard[i] = player;
      if (calculateWinner(newBoard) === player) {
        return i; // Return the index of the winning move
      }
    }
  }
  return null; // Return null if no winning move is found
}

// Function to calculate the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winning player (X or O)
    }
  }
  return null; // Return null if there is no winner yet
}

// Main Tic Tac Toe component
window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const TicTacToe = ({ assetsUrl }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X'); // Player starts as 'X'
    const [winner, setWinner] = useState(null);

    const handleClick = (index) => {
      if (board[index] || winner) return; // Ignore if cell is filled or game is won

      const newBoard = board.slice();
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      checkWinner(newBoard);
      setCurrentPlayer('O'); // Switch to AI
    };

    const checkWinner = (squares) => {
      const result = calculateWinner(squares);
      if (result) {
        setWinner(result);
      } else if (!squares.includes(null)) {
        setWinner('Tie');
      }
    };

    const resetGame = () => {
      setBoard(Array(9).fill(null));
      setCurrentPlayer('X');
      setWinner(null);
    };

    useEffect(() => {
      if (currentPlayer === 'O' && !winner) {
        // Check for a winning move for the AI
        const winningMove = findWinningMove(board, 'O');
        if (winningMove !== null) {
          const newBoard = board.slice();
          newBoard[winningMove] = 'O';
          setBoard(newBoard);
          checkWinner(newBoard);
          setCurrentPlayer('X'); // Switch back to player
        } else {
          // If no winning move, use minimax to find the best move
          const move = getBestMove(board, 'O');
          const newBoard = board.slice();
          newBoard[move] = 'O';
          setBoard(newBoard);
          checkWinner(newBoard);
          setCurrentPlayer('X'); // Switch back to player
        }
      }
    }, [currentPlayer, board, winner]);

    return React.createElement(
      'div',
      { className: "tic-tac-toe" },
      React.createElement('h2', null, "Tic-Tac-Toe"),
      React.createElement(
        'div',
        { className: "game-board" },
        board.map((cell, index) =>
          React.createElement(
            'div',
            {
              key: index,
              className: "cell",
              onClick: () => handleClick(index),
            },
            cell === 'X'
              ? React.createElement('img', { src: `${assetsUrl}/cross.png`, alt: "Cross" })
              : cell === 'O'
              ? React.createElement('img', { src: `${assetsUrl}/circle.png`, alt: "Circle" })
              : null
          )
        )
      ),
      winner && React.createElement('p', null, winner === 'Tie' ? "It's a Tie!" : `${winner} wins!`),
      React.createElement(
        'button',
        { onClick: resetGame },
        "Reset Game"
      )
    );
  };

  return () => React.createElement(TicTacToe, { assetsUrl: assetsUrl });
};
console.log('Tic Tac Toe game script loaded');
