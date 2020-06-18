"use strict";

const pathToListArticles = "articles/articles_list.json"; //список статей энциклопедии

let articles = {
  list: {}, // список статей
  titleLoadedArticle: null, // название текущей загруженной статьи
  HTMLLoadedArticle: null, // содержание текущей загруженной статьи
  init(pathLoad) {
    $.ajax(pathLoad, {
      type: "GET",
      dataType: "json",
      async: false,
      cache: false,
      success: (data) => {
        this.list = data; // загрузим список статей
      },
      error: (jqXHR, StatusStr, ErrorStr) => {
        alert(StatusStr + " " + ErrorStr);
      },
    });
    // и сразу инициализируем первую статью
    let firstArticle = Object.keys(this.list)[0];
    this.loadArticle(firstArticle);
  },
  loadArticle(title) {
    $.ajax(`articles/${this.list[title]}.html`, {
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
  },
};
