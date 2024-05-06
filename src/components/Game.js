import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { useScore } from '../context/ScoreContext'; // Importando o useScore
import '../styles/game.css'; // Asegurando que os estilos estão sendo importados
import img1 from '../images/dog.jpg'; // Importando as imagens
import img2 from '../images/cat.jpg';
import img3 from '../images/horse.jpg';
import img4 from '../images/parrot.jpg';
import img5 from '../images/rabbit.jpg';
import img6 from '../images/bear.jpg';
import img7 from '../images/elephant.jpg';
import img8 from '../images/tiger.jpg';
import img9 from '../images/monkey.jpg';
import audioCorrect from '../audio/correct.mp3';
import audioWrong from '../audio/wrong.mp3';
import Scoreboard from './Scoreboard';

function Game() {
  const { setScore } = useScore(); // Acessar o setScore para atualizar a pontuação
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState('');


  const correctSoundRef = useRef(new Audio(audioCorrect));
  const wrongSoundRef = useRef(new Audio(audioWrong));

  useEffect(() => {
    const savedPlayer1 = JSON.parse(localStorage.getItem('player1'));
    const savedPlayer2 = JSON.parse(localStorage.getItem('player2'));
    setPlayer1(savedPlayer1);
    setPlayer2(savedPlayer2);
    setCurrentPlayer(savedPlayer1);
    setCurrentQuestion(generateRandomQuestion());
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
    const questionTypes = ['math', 'math', 'sequence', 'image']; // Ajustei para incluir 'image' e ajustar a distribuição
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    let num1, num2, correctAnswer, displayQuestion, imageUrl;

    switch (questionType) {
      case 'math': // Soma e Subtração
        const isSubtraction = Math.random() > 0.5;
        num1 = Math.floor(Math.random() * 10) + (isSubtraction ? 10 : 1);
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = isSubtraction ? num1 - num2 : num1 + num2;
        displayQuestion = `Quanto é ${num1} ${isSubtraction ? '-' : '+'} ${num2}?`;
        break;
      case 'sequence': // Próximo número na sequência
        num1 = Math.floor(Math.random() * 5) + 1;
        correctAnswer = num1 + 5;
        displayQuestion = `Qual o próximo número da sequência: ${Array.from({length: 5}, (_, i) => i + num1).join(', ')} e ?`;
        break;
      case 'image': // Identificação de animais através de imagens
      const animals = [
        { name: "Cachorro", imageUrl: img1 },
        { name: "Gato", imageUrl: img2 },
        { name: "Cavalo", imageUrl: img3 },
        { name: "Papagaio", imageUrl: img4 },
        { name: "Coelho", imageUrl: img5 },
        { name: "Urso", imageUrl: img6 },
        { name: "Elefante", imageUrl: img7 },
        { name: "Tigre", imageUrl: img8 },
        { name: "Macaco", imageUrl: img9 }
      ];
      
        const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
        displayQuestion = "Qual é o animal na imagem?";
        correctAnswer = randomAnimal.name;
        imageUrl = randomAnimal.imageUrl;
        return { displayQuestion, correctAnswer, imageUrl }; // Retorna a imagem junto com a pergunta e a resposta
      default:
        // Caso padrão, nunca deve ocorrer
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
  // Remove espaços adicionais e converte para minúsculas para comparação de string insensível a maiúsculas
  const trimmedAnswer = userAnswer.trim().toLowerCase();
  const correctAnswer = typeof currentQuestion.correctAnswer === 'string'
      ? currentQuestion.correctAnswer.toLowerCase() // Assume que a resposta correta também é uma string
      : currentQuestion.correctAnswer;

  // Verifica se a resposta é correta considerando tanto números quanto strings
  const isCorrect = (typeof correctAnswer === 'number' && parseInt(trimmedAnswer, 10) === correctAnswer) ||
                    (typeof correctAnswer === 'string' && trimmedAnswer === correctAnswer);

  if (isCorrect) {
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
      <Scoreboard playerScore1={player1.score} playerScore2={player2.score} />
      {currentQuestion.imageUrl && (
        <div className='question-image-container'>
          <img src={currentQuestion.imageUrl} alt="Question" className="question-image"/>
        </div>
      )}
      <h2 className='game-question'>{currentQuestion.displayQuestion}</h2>
      <form onSubmit={handleSubmit} className='game-form'>
        <input
          type={currentQuestion.imageUrl ? "text" : "tel"} // Se for pergunta de imagem, o tipo deve permitir texto
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
