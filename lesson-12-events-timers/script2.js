'use strict';

const radius = 150; // радиус часов
const radiusDig = 15; // радиус цифр
const sizeDig = 20; // размер цифр
const dX = 25; // поправка радиуса для сближения цифр к центру циферблата

drawClock();

function drawClock() {
  var clockWraper = document.getElementById('clock');
  clockWraper.style.width = 2 * radius + 'px';
  clockWraper.style.height = 2 * radius + 'px';

  var clockCircle = document.createElement('div');
  clockCircle.className = 'clock';
  clockWraper.appendChild(clockCircle);

  //получим координаты центра часов
  var centerX = clockCircle.offsetLeft + clockCircle.offsetWidth / 2;
  var centerY = clockCircle.offsetTop + clockCircle.offsetHeight / 2;

  //рисуем 12 цифр
  for (let i = 1; i <= 12; i++) {
    var angle = (30 * i / 180) * Math.PI;
    var divDigitCenterX = centerX + (radius - dX) * Math.sin(angle);
    var divDigitCenterY = centerY - (radius - dX) * Math.cos(angle);
    var divDigit = document.createElement('div');
    divDigit.className = 'digits';
    divDigit.style.width = 2 * radiusDig + 'px';
    divDigit.style.height = 2 * radiusDig + 'px';
    var number = document.createElement('p');
    number.style.fontSize = sizeDig + 'px';
    number.innerHTML = i;
    divDigit.appendChild(number);
    clockCircle.appendChild(divDigit);
    divDigit.style.left = Math.round(divDigitCenterX - divDigit.offsetWidth / 2) + 'px';
    divDigit.style.top = Math.round(divDigitCenterY - divDigit.offsetHeight / 2) + 'px';
  }
  drawDiv(clockCircle, 'time_string');
  drawDiv(clockCircle, 'second_arrow');
  drawDiv(clockCircle, 'minute_arrow');
  drawDiv(clockCircle, 'hour_arrow');
}

function drawDiv(parentName, divClassName) {
  var newDiv = document.createElement('div');
  newDiv.className = divClassName;
  parentName.appendChild(newDiv);
}

// -----------------ход часов-----------------
setInterval(updateTime, 1000);

function updateTime() {
  var currTime = new Date();
  var currSec = currTime.getSeconds();
  var currMin = currTime.getMinutes();
  var currHour = currTime.getHours();
  var currTimeStr = formatTime(currTime);
  document.querySelector('.time_string').innerHTML = currTimeStr;

  //движение стрелок
  var secondArrow = document.querySelector('.second_arrow');
  var minuteArrow = document.querySelector('.minute_arrow');
  var hourArrow = document.querySelector('.hour_arrow');
  secondArrow.style.transform = 'rotate(' + 360 * (currSec / 60) + 'deg)';
  minuteArrow.style.transform = 'rotate(' + 360 * currMin / 60 + 'deg)';
  hourArrow.style.transform = 'rotate(' + (360 * (currHour % 12) / 12 + currMin / 2) + 'deg)';
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
