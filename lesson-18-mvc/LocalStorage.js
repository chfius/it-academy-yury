'use strict';

function TLocalStorage(storageName) {
  var items = {};
  this.AddValue = function (name, description) {
    items[name] = description;
    localStorage[storageName] = JSON.stringify(items);
  }

  this.GetValue = function (searchName) {
    return (searchName in items) ? items[searchName] : false;
  };

  this.DeleteValue = function (eraseName) {
    if (eraseName in items) {
      delete items[eraseName];
      localStorage[storageName] = JSON.stringify(items);
      return true;
    } else return false;
  };

  this.GetKeys = function () {
    var keys = [];
    for (var key in items) { keys.push(key) };
    return (keys.length != 0) ? keys : false;
  };

  this.Reset = function () {
    if (localStorage.length > 0) {
      var storage = JSON.parse(localStorage[storageName]);
      for (var key in storage) {
        items[key] = storage[key];
      }
    }
  }
}
