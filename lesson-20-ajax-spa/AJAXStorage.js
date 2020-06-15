'use strict';

 const hashAjaxName = 'ALKHIMOVICH_DRINKS_DISHES';

  var AjaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
  var UpdatePassword;
  var storage = {};

function TAJAXStorage(storageName) {
  storage[storageName] = {};
  var items = storage[storageName];

  function updateItemsAjax(storageUpd) {
    UpdatePassword = Math.random();
    $.ajax(
      {
        url: AjaxHandlerScript,
        type: 'POST',
        data: {
          f: 'LOCKGET', n: hashAjaxName,
          p: UpdatePassword
        },
        cache: false,
        success: LockGetReady,
        error: ErrorHandler
      }
    );

    function LockGetReady(newStr) {
      if (newStr.error !== undefined)
        alert(newStr.error);
      else {
        $.ajax(
          {
            url: AjaxHandlerScript,
            type: 'POST',
            data: {
              f: 'UPDATE', n: hashAjaxName,
              v: JSON.stringify(storageUpd), p: UpdatePassword
            },
            cache: false,
            success: UpdateReady,
            error: ErrorHandler
          }
        );
      }
    };

    function UpdateReady(ResultH) {
      if (ResultH.error != undefined)
        alert(ResultH.error);
    };

    function ErrorHandler(jqXHR, StatusStr, ErrorStr) {
      alert(StatusStr + ' ' + ErrorStr);
    };
  }

  this.AddValue = function (name, description) {
    items[name] = description;
    updateItemsAjax(storage);
  }

  this.GetValue = function (searchName) {
    return (searchName in items) ? items[searchName] : false;
  };

  this.DeleteValue = function (eraseName) {
    if (eraseName in items) {
      delete items[eraseName];
      updateItemsAjax(storage);
      return true;
    } else return false;
  };

  this.GetKeys = function () {
    return Object.keys(items);
  };

  this.Reset = function () {
    $.ajax(
      {
        url: AjaxHandlerScript,
        type: 'POST',
        data: { f: 'READ', n: hashAjaxName },
        cache: false,
        success: ReadReady,
        error: ErrorHandler
      }
    );

    function ReadReady(answerStr) {
      var storageAnsw = {};
      if (answerStr.error !== undefined) {
        alert(answerStr.error);
      } else {
        if (answerStr.result !== "") {
          storageAnsw = JSON.parse(answerStr.result);
          for (var key in storageAnsw[storageName]) {
            items[key] = storageAnsw[storageName][key];
          }
        }
      }
    };

    function ErrorHandler(jqXHR, StatusStr, ErrorStr) {
      alert(StatusStr + ' ' + ErrorStr);
    };
  }
}
