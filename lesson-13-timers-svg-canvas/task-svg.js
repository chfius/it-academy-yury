'use strict';

const radiusClock = 150; // радиус часов
const numbersRadius = radiusClock - 20; //радиус оси цифр циферблата
const radiusDigits = 15; // радиус цифр
const sizeDigits = 30; // размер цифр

var center = radiusClock;

drawClock();
startClock();

function drawClock() {
  //отрисовка циферблата
  var clockWraper = document.getElementById('clock');
  clockWraper.style.width = radiusClock * 2;
  clockWraper.style.height = radiusClock * 2;
  clockWraper.appendChild(drawFaceClock());

  // цифровая строка времени
  clockWraper.appendChild(drawDigitalClock('time_string'));

  // рисуем малые окуржности часов циферблата
  for (var i = 1; i <= 12; i++) {
    var angle = (30 * i / 180) * Math.PI;
    var digitX = center + numbersRadius * Math.sin(angle);
    var digitY = center - numbersRadius * Math.cos(angle);
    clockWraper.appendChild(drawDigitsRadius(digitX, digitY)); // рисуем кружок
    clockWraper.appendChild(drawDigits(digitX, digitY, i));   // пишем цифру в него
  }

  // рисуем стрелки часов
  clockWraper.appendChild(drawArrow("second_arrow", radiusClock - 20, 1, "red"));   //секундная стрелка
  clockWraper.appendChild(drawArrow("minute_arrow", radiusClock - 40, 4, "black")); //минутная стрелка
  clockWraper.appendChild(drawArrow("hour_arrow", radiusClock - 70, 6, "black"));    //часовая стрелка
}

function drawFaceClock() {
  var clockCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
  clockCircle.setAttribute("cx", radiusClock);
  clockCircle.setAttribute("cy", radiusClock);
  clockCircle.setAttribute("r", radiusClock);
  //clockCircle.setAttribute("stroke", "red");
  clockCircle.setAttribute("fill", "#FCCA66");
  return clockCircle;
}

function drawDigitalClock(id) {
  var digitalClock = document.createElementNS("http://www.w3.org/2000/svg", 'text');
  var clockX = center - 50; // смещение часов над центром по Х
  var clockY = center / 1.5; // смещение часов над центром по Y
  digitalClock.setAttribute("id", id);
  digitalClock.setAttribute("x", clockX);
  digitalClock.setAttribute("y", clockY);
  digitalClock.style.fill = "black";
  digitalClock.style.fontSize = sizeDigits;
  return digitalClock;
}

function drawDigitsRadius(x, y) {
  var digitCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
  digitCircle.setAttribute("cx", x);
  digitCircle.setAttribute("cy", y);
  digitCircle.setAttribute("r", radiusDigits);
  digitCircle.setAttribute("fill", "#48B382");
  return digitCircle;
}

function drawDigits(x, y, number) {
  var txt = document.createElementNS("http://www.w3.org/2000/svg", 'text');
  number > 9 ? txt.setAttribute("x", x - 8) : txt.setAttribute("x", x - 4); // небольшой сдвиг для десятичных цифр
  txt.setAttribute("y", y + 5);
  txt.style.fill = "black";
  txt.textContent = number;
  return txt;
}

function drawArrow(id, size, width, color) {
  var arrow = document.createElementNS("http://www.w3.org/2000/svg", 'line');
  arrow.setAttribute("id", id);
  arrow.setAttribute("x1", center);
  arrow.setAttribute("x2", center);
  arrow.setAttribute("y1", center);
  arrow.setAttribute("y2", center - size);
  arrow.setAttribute("stroke-width", width);
  arrow.setAttribute("stroke-linecap", "round");
  arrow.setAttribute("stroke", color);
  arrow.style.transformOrigin = "50% 50%";
  return arrow;
}

function startClock() {
  setInterval(updateTime, 1000);

  function updateTime() {
    var currTime = new Date();
    var currSec = currTime.getSeconds();
    var currMin = currTime.getMinutes();
    var currHour = currTime.getHours();
    var currTimeStr = formatTime(currTime);
    document.getElementById('time_string').innerHTML = currTimeStr;

    //движение стрелок
    var secondArrow = document.getElementById('second_arrow');
    var minuteArrow = document.getElementById('minute_arrow');
    var hourArrow = document.getElementById('hour_arrow');
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
}
