import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useScore } from '../context/ScoreContext'; // Importando o useScore
import '../styles/game.css'; // Asegurando que os estilos estão sendo importados

function Game() {
  const { setScore } = useScore(); // Acessar o setScore para atualizar a pontuação

  // Estado para armazenar a pergunta atual e a resposta do usuário
  const [currentQuestion, setCurrentQuestion] = useState(generateRandomQuestion());
  const [userAnswer, setUserAnswer] = useState('');

  // Função para gerar uma nova pergunta aleatoriamente
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
      default: // Default case
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 + num2;
        displayQuestion = `Quanto é ${num1} + ${num2}?`;
        break;
    }
    return { displayQuestion, correctAnswer };
  }

  // Manipulador de eventos para quando o usuário submete uma resposta
  function handleSubmit(event) {
    event.preventDefault();
    if (parseInt(userAnswer, 10) === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);  // Atualiza a pontuação
      Swal.fire({
        title: 'Correto!',
        text: 'Você acertou a resposta.',
        icon: 'success',
        confirmButtonText: 'Continuar'
      });
    } else {
      Swal.fire({
        title: 'Incorreto!',
        text: 'Tente novamente.',
        icon: 'error',
        confirmButtonText: 'Tentar Novamente'
      });
    }
    setCurrentQuestion(generateRandomQuestion());  // Gera uma nova pergunta
    setUserAnswer('');  // Limpa a resposta
  }

  // Renderiza o componente Game
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
    </div>
  );
}

export default Game;
