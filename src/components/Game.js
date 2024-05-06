import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { useScore } from '../context/ScoreContext'; // Importando o useScore
import '../styles/game.css'; // Asegurando que os estilos estão sendo importados

function Game() {
  const { setScore } = useScore(); // Acessar o setScore para atualizar a pontuação
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState('');

  const backgroundAudioRef = useRef(new Audio('http://localhost:3000/audio/background.mp3'));
  const correctSoundRef = useRef(new Audio('http://localhost:3000/audio/correct.mp3'));
  const wrongSoundRef = useRef(new Audio('http://localhost:3000/audio//wrong.mp3'));

  useEffect(() => {
    const savedPlayer1 = JSON.parse(localStorage.getItem('player1'));
    const savedPlayer2 = JSON.parse(localStorage.getItem('player2'));
    setPlayer1(savedPlayer1);
    setPlayer2(savedPlayer2);
    setCurrentPlayer(savedPlayer1);
    setCurrentQuestion(generateRandomQuestion());
    backgroundAudioRef.current.loop = true;
    backgroundAudioRef.current.play();
  }, []);

  function togglePlayer(object) {
    const { title, icon, confirmButtonText } = object;
    setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
    Swal.fire({
      title: title,
      text: `É a vez de ${currentPlayer === player1 ? player2.name : player1.name}`,
      icon: icon,
      confirmButtonText: confirmButtonText
    });
  };

  function generateRandomQuestion() {
    const questionType = Math.floor(Math.random() * 3); // Gera um número aleatório entre 0 e 2
    let num1, num2, correctAnswer, displayQuestion;

    switch (questionType) {
      case 0: // Soma
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 + num2;
        displayQuestion = `Quanto é ${num1} + ${num2}?`;
        break;
      case 1: // Subtração
        num1 = Math.floor(Math.random() * 10) + 10;  // Garante um número um pouco maior
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 - num2;
        displayQuestion = `Quanto é ${num1} - ${num2}?`;
        break;
      case 2: // Próximo número na sequência
        num1 = Math.floor(Math.random() * 5) + 1;
        correctAnswer = num1 + 5;
        displayQuestion = `Qual o próximo número da sequência: ${Array.from({length: 5}, (_, i) => i + num1).join(', ')} e ?`;
        break;
      default: // Caso padrão, nunca deve ocorrer
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 + num2;
        displayQuestion = `Quanto é ${num1} + ${num2}?`;
        break;
    }
    return { displayQuestion, correctAnswer };
}

function updatePlayerScore(playerKey) {
  const player = playerKey === 'player1' ? player1 : player2;
  const updatedPlayer = { ...player, score: player.score + 1 };
  if (playerKey === 'player1') {
    setPlayer1(prevPlayer1 => ({
      ...prevPlayer1,
      score: updatedPlayer.score
    }));
    localStorage.setItem('player1', JSON.stringify(updatedPlayer));
  } else {
    setPlayer2(prevPlayer2 => ({
      ...prevPlayer2,
      score: updatedPlayer.score
    }));
    localStorage.setItem('player2', JSON.stringify(updatedPlayer));
  }
}



  function handleSubmit(event) {
    event.preventDefault();
    if (parseInt(userAnswer, 10) === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
      correctSoundRef.current.play();
      const result = {
        title: 'Correto!',
        text: 'Parabéns.',
        icon: 'success',
        confirmButtonText: 'Próximo jogador'
      };
      updatePlayerScore(currentPlayer === player1 ? 'player1' : 'player2');
      togglePlayer(result);
    } else {
      wrongSoundRef.current.play();
      const result = {
        title: 'Incorreto!',
        text: 'Tente novamente.',
        icon: 'error',
        confirmButtonText: 'Tentar Novamente'
      };
      togglePlayer(result);
    }
    setCurrentQuestion(generateRandomQuestion());
    setUserAnswer('');
  }

  return (
    <div className='game-container'>
      <h2 className='game-question'>{currentQuestion.displayQuestion}</h2>
      <form onSubmit={handleSubmit} className='game-form'>
        <input
          type="tel"
          className='answer-input'
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          autoFocus
        />
        <button type="submit" className='game-button'>Enviar</button>
      </form>
      <p>Jogador Atual: {currentPlayer.name}</p>
    </div>
  );
}

export default Game;
