'use strict';

const sizeFieldX = 400; // размер поля
const sizeFieldY = 300; // размер поля
const ballSize = 30; // размер игрового мяча
const sizeRacketX = 10; // ширина ракетки
const sizeRacketY = 100; // длина ракетки
const k = 20; //дельта, на которую еще считается, что мяч попал по ракетке


var field = {
  width: sizeFieldX,
  height: sizeFieldY,
  create() {
    var fieldObj = document.getElementById('wrapper');
    fieldObj.style.width = this.width + "px";
    fieldObj.style.height = this.height + "px";
  }
}

var ball = {
  posX: 200 - ballSize / 2,
  posY: 150 - ballSize / 2,
  speedX: 0,
  speedY: 0,
  width: ballSize,
  height: ballSize,
  create() {
    var ballObj = document.getElementById('ball');
    ballObj.style.width = this.width + "px";
    ballObj.style.height = this.height + "px";
  },
  update() {
    var ballObj = document.getElementById('ball');
    ballObj.style.left = this.posX + "px";
    ballObj.style.top = this.posY + "px";
  }
}

var score = {
  player1: 0,
  player2: 0,
  update() {
    var scoreObj = document.getElementById('score');
    scoreObj.innerHTML = this.player1 + " : " + this.player2;
  }
}

function Racket(player) { // ТТХ ракетки
  this.posY = sizeFieldY / 3; // первоначальное положение ракеток
  this.speedY = 0;
  this.width = sizeRacketX;
  this.height = sizeRacketY;
  this.update = function () {
    var racketObj = document.getElementById(player);
    racketObj.style.top = this.posY + "px";
    racketObj.style.width = this.width + "px";
    racketObj.style.height = this.height + "px";
  }
}

var player1 = new Racket('player1');
var player2 = new Racket('player2');

window.addEventListener('load', initGame);
function initGame() {
  // инициализация игрового процесса
  // создаем игровое поле установленного размера
  field.create();
  ball.create();
  // расположим мяч в центре поля
  ballInCenter();
  // пишем счет
  score.update();
  // расположим вторую ракетку на правой стороне
  var pl2 = document.getElementById('player2');
  pl2.style.left = (field.width - player2.width + 1) + "px"; // + 1px нужен из-за рамки border 1px
  // запуск таймера и ожидание нажатия клавиш управления ракетками и запуска мяча
  setInterval(game, 40);
}

function ballInCenter() {
  var divField = document.getElementById('wrapper');
  var centerFieldX = divField.offsetWidth / 2 - ballSize / 2;
  var centerFieldY = divField.offsetHeight / 2 - ballSize / 2;
  ball.posX = centerFieldX;
  ball.posY = centerFieldY;
}

function game() {
  //обновляем положение мяча и ракеток
  ball.update();
  player1.update();
  player2.update();
  score.update();

  // проверяем, чтобы ракетки не выехали за пределы поля
  if (player1.posY + player1.height + player1.speedY <= field.height &&
    player1.posY + player1.speedY >= 0) {
    player1.posY += player1.speedY;
  }
  if (player2.posY + player2.height + player2.speedY <= field.height &&
    player2.posY + player2.speedY >= 0) {
    player2.posY += player2.speedY;
  }

  // проверяем, чтобы мяч не вылетел за пределы поля или отбился ракеткой
  ball.posX += ball.speedX;
  // правая сторона
  if (ball.posY >= player2.posY - k && ball.posY <= player2.posY + player2.height - k) {
    if (ball.posX + ball.width > field.width - player2.width) {
      ball.speedX = -ball.speedX;
      ball.posX = field.width - player2.width - ball.width;
    }
  }

  if (ball.posX + ball.width > field.width) {
    stopGame(1);
    ball.posX = field.width - ball.width;
  }

  // левая сторона
  if (ball.posY >= player1.posY - k && ball.posY <= player1.posY + player1.height - k) {
    if (ball.posX < 0 + player1.width) {
      ball.speedX = -ball.speedX;
      ball.posX = 0 + player1.width;
    }
  }

  if (ball.posX < 0) {
    stopGame(2);
    ball.posX = 0;
  }

  // движение мяча вверх либо вниз
  ball.posY += ball.speedY;
  if (ball.posY + ball.height > field.height) {
    ball.speedY = -ball.speedY;
    ball.posY = field.height - ball.height;
  }
  if (ball.posY < 0) {
    ball.speedY = -ball.speedY;
    ball.posY = 0;
  }

  // следим за нажатыми кнопками
  document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
      case 16: // shift - левая ракетка вверх
        player1.speedY = -5;
        break;
      case 17: // ctrl - левая ракетка вниз
        player1.speedY = 5;
        break;
      case 38: // стрелка вверх - ракетка ракетка вверх
        player2.speedY = -5;
        break;
      case 40: // стрелка вниз - правая ракетка вниз
        player2.speedY = 5;
        break;
    }
  });

  document.addEventListener('keyup', () => { // сброс движения ракеток
    player1.speedY = 0;
    player2.speedY = 0;
  });
}

function start() {
  // нажата кнопка "старт!"
  function random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }
  ballInCenter();
  // направление движения мяча в начале игры - случайное
  ball.speedX = random(-5, 5);
  ball.speedY = random(-2, 2);
}

function stopGame(playerWin) {
  // стоп игра
  ball.speedX = 0;
  ball.speedY = 0;

  switch (playerWin) {
    case 1:
      score.player1 += 1;
      break;
    case 2:
      score.player2 += 1;
      break;
  }
}
