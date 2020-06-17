"use strict";

const pathToListArticles = "articles/articles_list.json"; //список статей энциклопедии
var articles = {};

document.addEventListener("DOMContentLoaded", function () {
  $.ajax(pathToListArticles, {
    type: "GET",
    dataType: "json",
    cache: false,
    success: (data) => {
      articles = data;
    },
    error: (jqXHR, StatusStr, ErrorStr) => {
      alert(StatusStr + " " + ErrorStr);
    },
  });
});
