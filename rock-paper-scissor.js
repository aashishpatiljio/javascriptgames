// Rock Paper Scissor Game
// A classic game between the player and the computer

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const choices = ['rock', 'paper', 'scissor'];

let playerScore = 0;
let computerScore = 0;
let rounds = 0;

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
  // Same choice = tie
  if (playerChoice === computerChoice) {
    return 'tie';
  }

  // Player wins
  if (
    (playerChoice === 'rock' && computerChoice === 'scissor') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissor' && computerChoice === 'paper')
  ) {
    return 'win';
  }

  // Computer wins
  return 'lose';
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = determineWinner(playerChoice, computerChoice);
  rounds++;

  console.log(`\n📍 Round ${rounds}`);
  console.log(`Your choice: ${playerChoice.toUpperCase()}`);
  console.log(`Computer choice: ${computerChoice.toUpperCase()}`);

  if (result === 'tie') {
    console.log("🤝 It's a TIE!\n");
  } else if (result === 'win') {
    console.log('✅ You WIN this round!\n');
    playerScore++;
  } else {
    console.log('❌ Computer WINS this round!\n');
    computerScore++;
  }

  displayScore();
}

function displayScore() {
  console.log(`Score → You: ${playerScore} | Computer: ${computerScore}`);
}

function startGame() {
  playerScore = 0;
  computerScore = 0;
  rounds = 0;

  console.log('\n🎮 Welcome to Rock Paper Scissor Game! 🎮');
  console.log('Enter your choice: rock, paper, or scissor');
  console.log('Type "quit" to exit the game\n');

  playNextRound();
}

function playNextRound() {
  rl.question('Your choice (rock/paper/scissor): ', (input) => {
    const userInput = input.toLowerCase().trim();

    if (userInput === 'quit') {
      endGame();
      return;
    }

    if (!choices.includes(userInput)) {
      console.log('❌ Invalid choice! Please enter rock, paper, or scissor.\n');
      playNextRound();
      return;
    }

    playRound(userInput);

    rl.question('Play again? (yes/no): ', (answer) => {
      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        playNextRound();
      } else {
        endGame();
      }
    });
  });
}

function endGame() {
  console.log('\n📊 Final Score:');
  console.log(`Your Score: ${playerScore}`);
  console.log(`Computer Score: ${computerScore}`);
  console.log(`Total Rounds: ${rounds}`);

  if (playerScore > computerScore) {
    console.log('\n🏆 Congratulations! You won the game! 🏆\n');
  } else if (computerScore > playerScore) {
    console.log('\n🤖 Computer won the game! Better luck next time! 🤖\n');
  } else {
    console.log('\n🤝 It\'s a tie game! Well played! 🤝\n');
  }

  console.log('Thanks for playing! Goodbye! 👋\n');
  rl.close();
}

// Start the game
startGame();
