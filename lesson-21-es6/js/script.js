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
        '<div><a class="contents" id="contents" href="/" onclick="switchToContents(event)">список статей здесь</a></div>';
      break;
    case "contents":
      if (articles.sortedList) {
        articles.sortList();
      }
      let items = articles.sortedList;
      pageHTML += '<h1 class="title" id="title">Оглавление</h1>';
      pageHTML += "<div>";

      for (let i = 0; i < items.length; i++) {
        pageHTML += `<ul>${items[i][0]}`;
        for (let j = i; j < items.length; j++) {
          if (items[i][0] == items[j][0]) {
            pageHTML += `<li><a id="article" href="articles/${
              articles.list[items[j]]
            }.html" onclick="switchToArticle(event)">${items[j]}</a></li>`;
          } else {
            pageHTML += "</ul>";
            break;
          }
        }
      }
      pageHTML += "</div>";
      break;
    case "article":
      if (articles.titleLoadedArticle == null) {
        articles.loadArticle(Object.keys(articles.list)[0]);
      }
      pageHTML += "<ul class='article_menu'>";
      articles.sortedList.forEach((item) => {
        pageHTML += `<li><a id="article" href="articles/${articles.list[item]}.html" onclick="switchToArticle(event)">${item}</a></li>`;
      });
      pageHTML += "</ul>";
      pageHTML += `<h1 class="title" id="title">${articles.titleLoadedArticle}</h1>`;
      pageHTML += `${articles.HTMLLoadedArticle}`;
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
  articles.sortList();
  switchToState({ pagename: "contents" });
}

function switchToArticle(event) {
  event.preventDefault();
  let titleArticle = event.target.textContent;
  let pathToArticle = event.target.href;
  $.ajax(pathToArticle, {
    // проверим, есть ли файл на диске?
    type: "HEAD",
    error: () => {
      alert("Файл не найден!");
    },
    success: () => {
      articles.loadArticle(titleArticle);
      switchToState({ pagename: "article" });
      switchToStateFromURLHash();
    },
  });
}
