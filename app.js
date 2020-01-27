//Game variables
let min = 1,
    max = 10,
    guessesLeft = 3,
    winningNum = getRandomNumber(min, max);

//UI elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessInput = document.querySelector('#guess-number'),
    guessBtn = document.querySelector('#guess-btn'),
    result = document.querySelector('.result-text');

//Assign min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again')
        window.location.reload();
});

guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);
    
    //Validate
    if(isNaN(guess) || guess < min || guess > max)
    {
        printMessage(`Please enter a value between ${min} and ${max}..`, 'red');
        guessInput.value = '';
    }
    else
    {
        if(guess === winningNum)
        {
            //GAME OVER: Won
            gameOver(true, `${guess} is correct, YOU WIN!`);
        }
        else
        {
            guessesLeft -= 1;
            if(guessesLeft === 0)
            {
                //GAME OVER: Lost
                gameOver(false, `GAME OVER, You lost. The correct number was ${winningNum}`);
            }
            else
            {
                //Wrong answer: Game continues
                guessForm = (guessesLeft > 1)? 'guesses' : 'guess';
                guessInput.value = '';
                printMessage(`${guess} is not correct, ${guessesLeft} ${guessForm} left.`, 'red');
            }
        }
    }
});

//Print message
function printMessage(msg, clr)
{
    guessInput.style.borderColor = clr;
    result.textContent = msg;
    result.style.color = clr;
}

//GAME OVER
function gameOver(won, msg)
{
    let clr;
    clr = won === true? 'green' : 'red';

    guessInput.disabled = 'true';
    printMessage(msg, clr);

    //Play again
    guessBtn.value = 'Play again';
    guessBtn.className = 'play-again';
    
}

//Get random number

function getRandomNumber(min, max)
{
    return Math.floor((Math.random()*(max - min + 1))+min);
}