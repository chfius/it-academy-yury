'use strict';

drawClock();

function drawClock() {
  var clockRound = document.createElement('div');
  clockRound.className = 'clock_round';

  for (let i = 1; i <= 12; i++) {
    var block = document.createElement('div');
    var number = document.createElement('div');
    var digit = document.createElement('span');
    block.className = 'block';
    number.className = 'numbers_round';
    digit.textContent = i;
    number.appendChild(digit);
    block.appendChild(number);
    clockRound.appendChild(block);
  }
  document.body.appendChild(clockRound);

  drawDiv('time_string');
  drawDiv('second_arrow');
  drawDiv('minute_arrow');
  drawDiv('hour_arrow');
}

function drawDiv(divClassName) {
  var newDiv = document.createElement('div');
  newDiv.className = divClassName;
  document.body.appendChild(newDiv);
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
