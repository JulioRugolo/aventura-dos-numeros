import React from 'react';
import './App.css';
import Game from './components/Game';
import Scoreboard from './components/Scoreboard';
import { ScoreProvider } from './context/ScoreContext'; // Importando o ScoreProvider

function App() {
  return (
    <ScoreProvider> {/* Usando o ScoreProvider para envolver os componentes */}
      <div className="App">
        <header>
          <h1>Aventura dos Números</h1>
        </header>
        <Scoreboard />
        <Game />
      </div>
    </ScoreProvider>
  );
}

export default App;
