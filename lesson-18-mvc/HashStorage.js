'use strict';

function HashStorage() {
  var items = {};
   this.AddValue = function (name, description) {
     return items[name] = description;
  }

  this.GetValue = function (searchName) {
    return (searchName in items) ? items[searchName] : false;
  };

  this.DeleteValue = function (eraseName) {
     if (eraseName in items) {
      delete items[eraseName];
      return true;
     } else return false;
   };

  this.GetKeys = function () {
    var keys = [];
    for (var key in items) { keys.push(key) };
    return (keys.length != 0) ? keys : false;
  };
}
