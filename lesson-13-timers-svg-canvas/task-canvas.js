'use strict';

const radiusClock = 150; // радиус часов
const numbersRadius = radiusClock - 20; //радиус оси цифр циферблата
const radiusDigits = 15; // радиус цифр
const sizeDigits = 15; // размер цифр
const sizeDigitalClock = 25; //размер шрифта цифровых часов

var center = radiusClock;
var canvas = document.getElementById('clock');
var context = canvas.getContext('2d');
var currSecAngle = 0;
var currMinAngle = 0;
var currHourAngle = 0;
var currTimeStr;

drawClock();
startClock();

function drawClock() {
  canvas.width = radiusClock * 2;
  canvas.height = radiusClock * 2;

  //отрисовка циферблата
  drawFaceClock();

  // цифровая строка времени
  drawDigitalClock();

  // рисуем малые окуржности часов циферблата
  for (var i = 1; i <= 12; i++) {
    var angle = (30 * i / 180) * Math.PI;
    var digitX = center + numbersRadius * Math.sin(angle);
    var digitY = center - numbersRadius * Math.cos(angle);
    drawDigitsRadius(digitX, digitY); // рисуем кружок
    drawDigits(digitX, digitY, i);   // пишем цифру в него
  }

  // рисуем стрелки часов
  drawArrow(radiusClock - 70, 6, "black", currHourAngle); //минутная стрелка
  drawArrow(radiusClock - 40, 4, "black", currMinAngle); //минутная стрелка
  drawArrow(radiusClock - 20, 2, "red", currSecAngle);   //секундная стрелка
}

function drawFaceClock() {
  context.fillStyle = '#FCCA66';
  context.beginPath();
  context.arc(center, center, radiusClock, 0, Math.PI * 2, false);
  context.fill();
}

function drawDigitalClock() {
  context.fillStyle = 'black';
  context.font = `normal ${sizeDigitalClock}px Arial`;
  context.fillText(currTimeStr, radiusClock - 50, radiusClock - 50);
}

function drawDigitsRadius(x, y) {
  context.fillStyle = '#48B382';
  context.beginPath();
  context.arc(x, y, radiusDigits, 0, Math.PI * 2, false);
  context.fill();
}

function drawDigits(x, y, n) {
  context.fillStyle = 'black';
  context.font = `normal ${sizeDigits}px Arial`;
  context.fillText(n, n > 9 ? x - 8 : x - 4, y + 5); // небольшой сдвиг для десятичных цифр
}

function drawArrow(size, width, color, angle) {
  var moveX = center + size * Math.cos(Math.PI / 2 - angle * (Math.PI / 180));
  var moveY = center - size * Math.sin(Math.PI / 2 - angle * (Math.PI / 180));

  context.strokeStyle = color;
  context.lineWidth = width;
  context.lineCap = 'round';
  context.beginPath();
  context.moveTo(center, center);
  context.lineTo(moveX, moveY);
  context.stroke();
  context.closePath();
}

/*   ------------- ход часов ------------------- */

function startClock() {
  setInterval(updateTime, 1000);

  function updateTime() {
    var currTime = new Date();
    var currSec = currTime.getSeconds();
    var currMin = currTime.getMinutes();
    var currHour = currTime.getHours();
    currTimeStr = formatTime(currTime);

    //движение стрелок
    currSecAngle = 360 * (currSec / 60);
    currMinAngle = 360 * (currMin / 60);
    currHourAngle = 360 * (currHour % 12) / 12 + currMin / 2;
    drawClock();
  }

  function formatTime(DT) {
    var Hours = DT.getHours();
    var Minutes = DT.getMinutes();
    var Seconds = DT.getSeconds();
    return Str0L(Hours, 2) + ':' + Str0L(Minutes, 2) + ':' + Str0L(Seconds, 2);
  }

  // дополняет строку Val слева нулями до длины Len
  function Str0L(Val, Len) {
    var StrVal = Val.toString();
    while (StrVal.length < Len)
      StrVal = '0' + StrVal;
    return StrVal;
  }
}
