import React, { useState } from 'react';
import './App.css';
import Game from './components/Game';
import { ScoreProvider } from './context/ScoreContext'; // Importando o ScoreProvider

function App() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    // Verifica se ambos os jogadores têm nomes válidos antes de iniciar o jogo
    if (player1.trim() !== '' && player2.trim() !== '') {
      // Salva os dados dos jogadores no localStorage
      localStorage.setItem('player1', JSON.stringify({ name: player1, score: 0 }));
      localStorage.setItem('player2', JSON.stringify({ name: player2, score: 0 }));
      setGameStarted(true);
    } else {
      alert('Por favor, insira os nomes dos dois jogadores para começar o jogo.');
    }
  };

  return (
    <ScoreProvider> {/* Usando o ScoreProvider para envolver os componentes */}
      <div className="App">
        <header>
          <h1>Aventura dos Números</h1>
        </header>
        {!gameStarted && <div className="players">
          <input
            type="text"
            className="name"
            placeholder="Jogador 1"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
          <input
            type="text"
            className="name"
            value={player2}
            placeholder="Jogador 2"
            onChange={(e) => setPlayer2(e.target.value)}
          />
          <button onClick={handleStartGame}>Iniciar Jogo</button>
        </div>}
        {gameStarted && <Game />}
      </div>
    </ScoreProvider>
  );
}

export default App;
