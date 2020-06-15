'use strict';

var drinkStorage = new TAJAXStorage('drinks');
drinkStorage.Reset();

document.getElementById('alcohol_input_item_info').addEventListener('click', function () {
  var nameDrink = prompt('Введите название напитка:') || '';
  if (nameDrink) {
    drinkStorage.AddValue(nameDrink, (function () {
      var newItem = {
        isAlcohol: confirm('Напиток алкогольный?'),
        prescription: prompt('Напишите рецепт приготовления:') || ''
      };
      return newItem;
    }()));
  };
});

document.getElementById('alcohol_get_item_info').addEventListener('click', function () {
  var nameDrink = prompt('Введите название напитка:') || '';
  var foundItem = drinkStorage.GetValue(nameDrink);
  var nameText = document.getElementById('alcohol_name');
  var alcoholText = document.getElementById('is_alcohol');
  var prescriptionText = document.getElementById('alcohol_prescription');

  if (foundItem) {
    nameText.textContent = 'Напиток: ' + nameDrink;
    alcoholText.textContent = 'Алкогольный: ' + ((foundItem.isAlcohol) ? 'да' : 'нет');
    prescriptionText.textContent = 'Рецепт приготовления: ' + foundItem.prescription;
  } else {
    alert('Такой записи не найдено');
  }

});

document.getElementById('alcohol_del_item').addEventListener('click', function () {
  var itemDel = prompt('Введите название удаляемого напитка:') || '';
  (drinkStorage.DeleteValue(itemDel)) ? alert('Удалено') : alert('Напитка с таким названием не найдено!');
})

document.getElementById('alcohol_get_items_names').addEventListener('click', function () {
  var keys = drinkStorage.GetKeys();
  var nameText = document.getElementById('alcohol_name');
  var alcoholText = document.getElementById('is_alcohol');
  var prescriptionText = document.getElementById('alcohol_prescription');

  if (keys.length) {
    nameText.textContent = 'Список напитков: ' + (keys.join(', '));
    alcoholText.textContent = '';
    prescriptionText.textContent = '';
  } else {
    alert('Записей не найдено');
  }
});

