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

  articles.load(pathToListArticles);
  var pageHTML = "";
  switch (SPAstate.pagename) {
    case "main":
      pageHTML += '<h1 class="title" id="title">Энциклопедиа</h1>';
      pageHTML +=
        '<a class="contents" id="contents" href="/" onclick="switchToContents(event)">список статей здесь</a>';
      break;
    case "contents":
      pageHTML += '<h1 class="title" id="title">Оглавление</h1>';
      pageHTML += "<div>";
      for (var title in articles.list) {
        pageHTML += `<a id='article' href="articles/${articles.list[title]}.html" onclick="switchToArticle(event)">${title}</a>`;
      }
      pageHTML += "</div>";
      break;
    case "article":
      pageHTML += "<ul class='article_menu'>";
      for (var title in articles.list) {
        pageHTML += `<li><a href="articles/${articles.list[title]}.html" onclick="switchToArticle(event)">${title}</a></li>`;
      }
      pageHTML += "</ul>";
      pageHTML += `<h1 class="title" id="title">${articles.titleLoadedArticle}</h1>`;
      pageHTML += `<p class="article_text">${articles.HTMLLoadedArticle}</p>`;
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

  let titleArticle = event.target.textContent;
  let pathToArticle = event.target.href;
  $.ajax(pathToArticle, {
    // проверим есть ли файл на диске?
    type: "HEAD",
    error: () => {
      alert("Файл не найден!");
    },
    success: () => {
      articles.loadArticle(titleArticle);
      switchToState({ pagename: "article" });
    },
  });
}
