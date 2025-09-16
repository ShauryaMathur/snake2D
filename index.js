
import {Snake} from './snake.js'
import {WIDTH,HEIGHT,NAME, SNAKE_SPAWN_X, SNAKE_SPAWN_Y,SPEED} from './constants.js';
import {FoodGenerator} from './foodGenerator.js'
import {Player} from './player.js'
import {drawBorder, getDirections} from './utils.js'

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Food
let isEaten = false
const foodGenerator = new FoodGenerator(ctx);
let isFoodAvailable = false

// Snake
let snake = null;

// Direction + Speed
let directions = getDirections(SPEED);

document.addEventListener('keydown', (event) => {
    let {key} = event;
    snake.changeDirection(key);
})

function initializeGame(){
    player = new Player(NAME);
    playerName.innerHTML = player.name
    playerScoreElement.innerHTML = player.score

    snake = new Snake(ctx,SNAKE_SPAWN_X,SNAKE_SPAWN_Y,directions);
    snake.drawSnake();

    isFoodAvailable = foodGenerator.generateFood();
    foodGenerator.drawFood();

    drawBorder(ctx,WIDTH,HEIGHT);
}
// Game Loop
function gameLoop(){
    try{
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        isEaten = snake.move(isFoodAvailable,foodGenerator.lastFood);
        snake.drawSnake();
        if(isEaten || !isFoodAvailable){
            player.increaseScore();
            playerScoreElement.innerHTML = player.score

            if(player.score % 100 === 0){
                // let speedIncrement = player.score / 100;
                snake.incrementSpeed();
            }

            isFoodAvailable = foodGenerator.generateFood();
            isEaten = false
        }
        foodGenerator.drawFood();
        drawBorder(ctx,WIDTH,HEIGHT);
        requestAnimationFrame(gameLoop); 
    }catch(e){
        console.log(e);
        window.alert(`Gam Over! Score: ${player.score}`)
        initializeGame();
    }
}

const startGameButton = document.getElementById('startGameButton');

//Player Details
let player = null;
const playerName = document.getElementById('playerName');

const playerScoreElement = document.getElementById('playerScore');

initializeGame();

startGameButton.addEventListener('click', () => {
    gameLoop();
});