// tic-tac-toe.js
window.initGame = (React, assetsUrl) => {
  const { useState } = React;
  
// Initialize the tic-tac-toe game
  const TicTacToe = ({ assetsUrl }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);

    // Handle the onClick event
    const handleClick = (index) => {
      if (board[index] || winner) return; // Ignore if cell is filled or game is won
      const newBoard = board.slice();
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      checkWinner(newBoard);   
};

    const checkWinner = (squares) => {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          setWinner(squares[a]);
          return;
        }
      }
      if (!squares.includes(null)) {
        setWinner('Tie');
      }
    };

    // AI Opponent
     const opponentMove = () => {
      let availableMoves = board.map((cell, index) => (cell === null ? index : null)).filter(index => index !== null);
      if (availableMoves.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        const move = availableMoves[randomIndex];
        const newBoard = board.slice();
        newBoard[move] = 'X'; 
        setBoard(newBoard);
        checkWinner(newBoard);
        setCurrentPlayer('O'); // Switch back to player
      }
    };

    // Reset the game
    const resetGame = () => {
      setBoard(Array(9).fill(null));
      setCurrentPlayer('X');
      setWinner(null);
    };

     useEffect(() => {
      if (currentPlayer === 'O' && !winner) {
        const move = getBestMove(board, 'O');
        const newBoard = board.slice();
        newBoard[move] = 'O';
        setBoard(newBoard);
        checkWinner(newBoard);
        setCurrentPlayer('X'); // Switch back to player
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
        { onClick: resetGame},
        "Reset"
      )
    );
  };

  return () => React.createElement(TicTacToe, { assetsUrl: assetsUrl });
};

console.log('Tic Tac Toe game script loaded');
