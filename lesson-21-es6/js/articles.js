"use strict";

const pathToListArticles = "articles/articles_list.json"; //список статей энциклопедии

function Articles() {
  this.list = {}; // список статей
  this.titleLoadedArticle = null; // название текущей загруженной статьи
  this.HTMLLoadedArticle = null; // содержание текущей загруженной статьи

  this.init = function (pathLoad) {
    $.ajax(pathLoad, {
      type: "GET",
      dataType: "json",
      cache: false,
      success: (data) => {
        this.list = data;
      },
      error: (jqXHR, StatusStr, ErrorStr) => {
        alert(StatusStr + " " + ErrorStr);
      },
    });
  };

  this.loadArticle = function (title) {
    var articlePath = `articles/${this.list[title]}.html`;

    $.ajax(articlePath, {
      type: "GET",
      async: false,
      dataType: "html",
      cache: false,
      success: (data) => {
        this.titleLoadedArticle = title;
        this.HTMLLoadedArticle = data;
      },
      error: (jqXHR, StatusStr, ErrorStr) => {
        alert(StatusStr + " " + ErrorStr);
      },
    });
  };
}

var articles = new Articles();
articles.init(pathToListArticles); // загружаем список статей
