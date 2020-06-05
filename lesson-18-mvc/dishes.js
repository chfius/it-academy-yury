'use strict';

var dishStorage = new TLocalStorage('dishes');
dishStorage.Reset();

document.getElementById('dish_input_item_info').addEventListener('click', function () {
  var nameDish = prompt('Введите название блюда:') || '';
  if (nameDish) {
    dishStorage.AddValue(nameDish, (function () {
      var newItem = {
        prescription: prompt('Напишите рецепт приготовления:') || ''
      };
      return newItem;
    }()));
  };
});

document.getElementById('dish_get_item_info').addEventListener('click', function () {
  var nameDish = prompt('Введите название блюда:') || '';
  var foundItem = dishStorage.GetValue(nameDish);
  var nameText = document.getElementById('dish_name');
  var prescriptionText = document.getElementById('dish_prescription');

  if (foundItem) {
    nameText.textContent = 'Название блюда: ' + nameDish;
    prescriptionText.textContent = 'Рецепт приготовления: ' + foundItem.prescription;
  } else {
    alert('Такой записи не найдено');
  }

});

document.getElementById('dish_del_item').addEventListener('click', function () {
  var itemDel = prompt('Введите название удаляемого блюда:') || '';
  (dishStorage.DeleteValue(itemDel)) ? alert('Удалено') : alert('Блюда с таким названием не найдено!');
})

document.getElementById('dish_get_items_names').addEventListener('click', function () {
  var keys = dishStorage.GetKeys();
  var nameText = document.getElementById('dish_name');
  var prescriptionText = document.getElementById('dish_prescription');

  if (keys) {
    nameText.textContent = 'Список блюд: ' + (keys.join(', '));
    prescriptionText.textContent = '';
  } else {
    alert('Записей не найдено');
  }
});

