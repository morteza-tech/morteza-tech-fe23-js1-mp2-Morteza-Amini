document.addEventListener('DOMContentLoaded', function () {
  const gameForm = document.getElementById('gameForm');
  const playerNameInput = document.getElementById('playerName');
  const startBtn = document.getElementById('startBtn');
  const gameContainer = document.getElementById('game');
  const choices = document.querySelectorAll('.choice');
  const resultDiv = document.getElementById('result');
  const playerScoreDiv = document.getElementById('playerScore');
  const computerScoreDiv = document.getElementById('computerScore');

  let playerName = '';
  let playerScore = 0;
  let computerScore = 0;

  gameForm.addEventListener('submit', function (event) {
    event.preventDefault();
    startGame();
  });

  function startGame() {
    playerName = playerNameInput.value;
    if (playerName.trim() === '') {
      alert('Ditt name.');
      return;
    }

    playerNameInput.disabled = true;
    startBtn.disabled = true;
    gameContainer.classList.remove('hidden');
    startRound();
  }
  function startRound() {
    choices.forEach(choice => choice.addEventListener('click', playRound));
  }

  function playRound(event) {
    const playerChoice = event.target.id;
    const computerChoice = generateComputerChoice();
    const roundResult = getRoundResult(playerChoice, computerChoice);
    displayResult(playerChoice, computerChoice, roundResult);
    updateScore(roundResult);
    if (playerScore === 3 || computerScore === 3) {
      endGame();
    }
  }

  function generateComputerChoice() {
    const choices = ['sten', 'påse', 'sax'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  }

  function getRoundResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
      return 'Det är oavgjort!';
    } else if (
      (playerChoice === 'sten' && computerChoice === 'sax') ||
      (playerChoice === 'påse' && computerChoice === 'sten') ||
      (playerChoice === 'sax' && computerChoice === 'påse')
    ) {
      return playerName + ' wins!';
    } else {
      return 'dator wins!';
    }
  }

  function displayResult(playerChoice, computerChoice, result) {
    resultDiv.textContent = `Player: ${playerName} väljer ${playerChoice}. dator väljer ${computerChoice}. ${result}`;
  }

  function updateScore(roundResult) {
    if (roundResult.includes(playerName)) {
      playerScore++;
    } else if (roundResult.includes('dator')) {
      computerScore++;
    }
    playerScoreDiv.textContent = `Player: ${playerScore}`;
    computerScoreDiv.textContent = `dator: ${computerScore}`;
    
    
    setTimeout(() => {
      resultDiv.textContent = '';
      choices.forEach(choice => choice.removeEventListener('click', playRound));
      startRound();
    }, 5000); 
  }

  function endGame() {
    choices.forEach(choice => choice.removeEventListener('click', playRound));
    if (playerScore === 3) {
      resultDiv.textContent = `${playerName} wins the game!`;
    } else {
      resultDiv.textContent = 'dator wins the game!';
    }

    setTimeout(() => {
      resetGame();
    }, 5000);
  }

  function resetGame() {
    playerNameInput.value = '';
    playerNameInput.disabled = false;
    startBtn.disabled = false;
    gameContainer.classList.add('hidden');
    playerScore = 0;
    computerScore = 0;
    playerScoreDiv.textContent = 'Player: 0';
    computerScoreDiv.textContent = 'Dator: 0';
    resultDiv.textContent = '';
  }
});
