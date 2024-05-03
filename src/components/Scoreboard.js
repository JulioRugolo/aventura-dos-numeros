import React from 'react';
import { useScore } from '../context/ScoreContext'; // Importando o useScore
import '../styles/scoreboard.css';

function Scoreboard() {
  const { score } = useScore(); // Acessando a pontuação diretamente do contexto
  const player1 = JSON.parse(localStorage.getItem('player1'));
  const player2 = JSON.parse(localStorage.getItem('player2'));

  return (
    <div className="scoreboard">
      <div className="player-score">
        <h2>Jogador 1: <p>{player1 ? player1.score : 0}</p></h2>
      </div>
      <div className="player-score">
        <h2>Jogador 2: <p>{player2 ? player2.score : 0}</p></h2>
      </div>
    </div>
  );
}

export default Scoreboard;
