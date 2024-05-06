import React from 'react';
import '../styles/scoreboard.css';

function Scoreboard() {
  const player1 = JSON.parse(localStorage.getItem('player1'));
  const player2 = JSON.parse(localStorage.getItem('player2'));

  return (
    <div className="scoreboard">
      <div className="player-score">
        <h2>{player1.name}:</h2>
        <p>{player1 ? player1.score : 0}</p>
      </div>
      <div className="player-score">
        <h2>{player2.name}:</h2>
        <p>{player2 ? player2.score : 0}</p>
      </div>
    </div>
  );
}

export default Scoreboard;
