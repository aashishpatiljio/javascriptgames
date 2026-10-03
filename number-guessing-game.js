// Number Guessing Game
// A simple game where the user tries to guess a random number

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function startGame() {
  const secretNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;
  let isGameActive = true;

  console.log('\n🎮 Welcome to the Number Guessing Game! 🎮');
  console.log('I have thought of a number between 1 and 100.');
  console.log('Can you guess it? Let\'s see how many attempts it takes!\n');

  function askGuess() {
    if (!isGameActive) return;

    rl.question('Enter your guess: ', (input) => {
      const guess = parseInt(input);

      // Validate input
      if (isNaN(guess) || guess < 1 || guess > 100) {
        console.log('❌ Please enter a valid number between 1 and 100.\n');
        askGuess();
        return;
      }

      attempts++;

      // Check the guess
      if (guess === secretNumber) {
        console.log(`\n🎉 Correct! You guessed the number ${secretNumber} in ${attempts} attempt(s)! 🎉\n`);
        isGameActive = false;

        rl.question('Do you want to play again? (yes/no): ', (answer) => {
          if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
            startGame();
          } else {
            console.log('Thanks for playing! Goodbye! 👋\n');
            rl.close();
          }
        });
      } else if (guess < secretNumber) {
        console.log(`📈 Too low! Try a higher number. (Attempt: ${attempts})\n`);
        askGuess();
      } else {
        console.log(`📉 Too high! Try a lower number. (Attempt: ${attempts})\n`);
        askGuess();
      }
    });
  }

  askGuess();
}

// Start the game
startGame();
