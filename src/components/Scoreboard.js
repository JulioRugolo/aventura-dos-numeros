import React from 'react';
import { useScore } from '../context/ScoreContext'; // Importando o useScore
import '../styles/scoreboard.css';

function Scoreboard() {
  const { score } = useScore(); // Acessando a pontuação diretamente do contexto

  return (
    <div className="scoreboard">
      Score: {score}
    </div>
  );
}

export default Scoreboard;
