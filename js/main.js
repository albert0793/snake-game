const board = document.querySelector('.board');
const maxScoreElement = document.getElementById('max-score');
const scoreElement = document.getElementById('score');
const head = document.getElementById('head');
let maxScore = localStorage.getItem('max-score') || 0;
let foodX;
let foodY;
let snakeX = 7, snakeY = 9;
let velocityX = 0, velocityY = 0;
let score = 0;
let timeOut = 125;
let interval;
let snakeBody = [];
let gameOver = false;
const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30 + 1);
  foodY = Math.floor(Math.random() * 30 + 1);
}

const initGame = () => {
  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
  snakeBody[0] = [snakeX, snakeY];
  for(let i = snakeBody.length - 1; i > 0; i--) {
   snakeBody[i] = snakeBody[i - 1];
  }
  
  snakeX += velocityX;
  snakeY += velocityY;
  for(let i = 0; i < snakeBody.length; i++) {
    html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
  }
  board.innerHTML = html;
  
  // validation when snake eat food
  if(snakeX == foodX && snakeY == foodY) {
    score += 1;
    scoreElement.innerHTML = `Score : ${score}`;
    snakeBody.push([snakeX, snakeY]);
    changeFoodPosition();
  }
  if(score > maxScore) {
    localStorage.setItem('max-score', score);
    maxScoreElement.innerHTML = `Max Score : ${localStorage.getItem('max-score')}`
    
  }
  if(snakeY <= 0 ) {
    snakeY = 30;
  }
}


//moving head into all directions
const moveHead = (direction) => {
  if(direction == 'up') {
    velocityY = -1;
    velocityX = 0;
  } else if(direction == 'down') {
    velocityY = 1;
    velocityX = 0;

  } else if (direction == 'left') {
    velocityX = -1;
    velocityY = 0;
    
  } else if(direction == 'right') {
    velocityX = 1;
    velocityY = 0;
  }
 
}


interval = setInterval(initGame,  120);
changeFoodPosition();

document.getElementById('up').addEventListener('click', () => {
  moveHead('up')
})
document.getElementById('down').addEventListener('click', () => {
  moveHead('down')
})
document.getElementById('left').addEventListener('click', () => {
  moveHead('left')
})
document.getElementById('right').addEventListener('click', () => {
  moveHead('right')
})

document.addEventListener('DOMContentLoaded', () => {
  maxScoreElement.innerHTML = `Max Score : ${maxScore}`
});
