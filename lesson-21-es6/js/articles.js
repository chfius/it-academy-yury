"use strict";

const pathToListArticles = "articles/articles_list.json"; //список статей энциклопедии

let articles = {
  list: {}, // список статей
  titleLoadedArticle: null, // название текущей загруженной статьи
  HTMLLoadedArticle: null, // содержание текущей загруженной статьи
  load(pathLoad) {
    $.ajax(pathLoad, {
      type: "GET",
      dataType: "json",
      async: false, //выкл синхронность, ждем полной загрузки
      cache: false,
      success: (data) => {
        this.list = data; // загрузим список статей
      },
      error: (jqXHR, StatusStr, ErrorStr) => {
        alert(StatusStr + " " + ErrorStr);
      },
    });
    this.sortList(); // сразу запишем отсортированный массив
  },
  loadArticle(title) {
    $.ajax(`articles/${this.list[title]}.html`, {
      type: "GET",
      async: false,
      dataType: "text",
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
  sortedList: [],
  sortList() {
    this.sortedList = Object.keys(this.list).sort();
  },
};
