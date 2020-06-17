"use strict";

window.onhashchange = switchToStateFromURLHash;
switchToStateFromURLHash();

function switchToStateFromURLHash() {
  var urlHash = window.location.hash;
  var SPAstate = {};
  var stateJSON = decodeURIComponent(urlHash.substr(1));

  if (stateJSON !== "") {
    SPAstate = JSON.parse(stateJSON);
  } else {
    SPAstate = { pagename: "main" };
  }

  var pageHTML = "";
  switch (SPAstate.pagename) {
    case "main":
      pageHTML += '<h1 class="title" id="title">Энциклопедиа</h1>';
      pageHTML +=
        '<a class="contents" id="contents" href="/" onclick="switchToContents(event)">список статей здесь</a>';
      break;
    case "contents":
      pageHTML += '<h1 class="title" id="title">Оглавление</h1>';
     // pageHTML += makeContents();
      break;
    case "article":
      pageHTML += '<h1 class="title" id="title">Гродно</h1>';
      pageHTML += '<p class="article_text">Текст статьи</p>';
      break;
  }
  document.getElementById("wrapper").innerHTML = pageHTML;
}

function switchToState(newState) {
  location.hash = encodeURIComponent(JSON.stringify(newState));
}

function switchToMain(event) {
  event.preventDefault();
  switchToState({ pagename: "main" });
}

function switchToContents(event) {
  event.preventDefault();
  switchToState({ pagename: "contents" });
}

function switchToArticle(event) {
  event.preventDefault();
  switchToState({ pagename: "article" });
}
