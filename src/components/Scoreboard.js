import React from 'react';
import '../styles/scoreboard.css';

function Scoreboard({playerScore1, playerScore2}) {
  const player1 = JSON.parse(localStorage.getItem('player1'));
  const player2 = JSON.parse(localStorage.getItem('player2'));
  console.log(playerScore1, playerScore2);

  return (
    <div className="scoreboard">
      <div className="player-score">
        <h2>{player1.name}: </h2>
        <p>{playerScore1 ? playerScore1 : '0'}</p>
      </div>
      <div className="player-score">
        <h2>{player2.name}: </h2>
        <p>{playerScore2 ? playerScore2 : '0'}</p>
      </div>
    </div>
  );
}

export default Scoreboard;
