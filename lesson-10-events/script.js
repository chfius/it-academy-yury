var titleForm = 'Для внесения вашего сайта в каталог, заполните форму:';
var nameForm = 'dynForm';
var descriptionForm = [
  { elemtype: 'text', label: 'Разработчики:', width: 400 },
  { elemtype: 'text', label: 'Название сайта:', width: 400 },
  { elemtype: 'text', label: 'URL сайта:', width: 300 },
  { elemtype: 'text', label: 'Дата запуска сайта:', width: 100 },
  { elemtype: 'text', label: 'Посетителей в сутки:', width: 100 },
  { elemtype: 'text', label: 'E-mail для связи:', width: 200 },
  { elemtype: 'select', label: 'Рубрика каталога:', items: 'Здоровье,Домашний уют,Бытовая техника' },
  { elemtype: 'radio', label: 'Размещение:', items: 'бесплатное,платное,VIP' },
  { elemtype: 'checkbox', label: 'Разрешить отзывы:' },
  { elemtype: 'textarea', label: 'Описание сайта:', width: 550, height: 150 },
  { elemtype: 'submit', label: 'Опубликовать', width: 100 },
];

function buildForm(arrParams, nameForm) {
  var formSelectorOld = document.getElementsByName(nameForm)[0];
  var formSelector = formSelectorOld.cloneNode();
  var spansStyle = 'display: block; float: left; width: 150px;';

  function makeTextField(text) {
    var newSpan = document.createElement('span');
    newSpan.setAttribute('style', spansStyle);
    newSpan.textContent = text;
    newDiv.appendChild(newSpan);
  }

  function insertInputSubmit(textLabel, typeItem, widthField) {

    makeTextField(textLabel);

    if (typeItem == 'text') {
      var newInput = document.createElement('input');
      newInput.type = 'text';
      newInput.style.width = widthField + 'px';
      newInput.name = textLabel;
      newDiv.appendChild(newInput);
      return newDiv;
    }
    if (typeItem == 'submit') {
      var newBtn = document.createElement('input');
      newBtn.textContent = textLabel;
      newBtn.type = 'submit';
      newBtn.style.width = widthField + 'px';
      return newBtn;
    }
    if (typeItem == 'checkbox') {
      var newInput = document.createElement('input');
      newInput.name = textLabel;
      newInput.type = 'checkbox';
      newDiv.appendChild(newInput);
      return newDiv;
    }
  }

  function insertMultiFields(textMulti, typeMulti, itemsMulti) {
    var fields = itemsMulti.split(',');

    makeTextField(textMulti);

    if (typeMulti == 'select') {
      var newMultiFields = document.createElement(typeMulti);
      newMultiFields.name = textMulti;
      for (var j = 0; j < fields.length; j++) {
        newMultiFields.appendChild(new Option(fields[j], fields[j]));
      }
      newDiv.appendChild(newMultiFields);
    }
    if (typeMulti == 'radio') {
      for (var j = 0; j < fields.length; j++) {
        var newRadio = document.createElement('input');
        newRadio.type = 'radio';
        newRadio.name = textMulti;
        newRadio.value = fields[j];
        newDiv.appendChild(newRadio);
        newDiv.insertAdjacentText('beforeend', fields[j]);
      }
    }
    return newDiv;
  }

  function insertLabelTextarea(textLabel, width, height) {
    var newTextarea = document.createElement('textarea');

    makeTextField(textLabel);
    newDiv.appendChild(document.createElement('br'));

    newTextarea.name = textLabel;
    newTextarea.style.width = width + 'px';
    newTextarea.style.height = height + 'px';
    newDiv.appendChild(newTextarea);
    return newDiv;
  }

  // begin buildForm
  var title = document.createElement('p');
  title.textContent = titleForm;
  formSelector.appendChild(title);

  for (var i = 0; i < arrParams.length; i++) {
    var newDiv = document.createElement('div');

    if ((arrParams[i].elemtype == 'text') ||
      (arrParams[i].elemtype == 'submit') ||
      (arrParams[i].elemtype == 'checkbox')) {
      var labelElem = arrParams[i].label;
      var typeItem = arrParams[i].elemtype;
      var widthElem = arrParams[i].width;
      formSelector.appendChild(insertInputSubmit(labelElem, typeItem, widthElem));
    };
    if (arrParams[i].elemtype == 'select' || arrParams[i].elemtype == 'radio') {
      var labelElem = arrParams[i].label;
      var typeItems = arrParams[i].elemtype;
      var items = arrParams[i].items;
      formSelector.appendChild(insertMultiFields(labelElem, typeItems, items));
    };
    if (arrParams[i].elemtype == 'textarea') {
      var labelElem = arrParams[i].label;
      var widthElem = arrParams[i].width;
      var heightElem = arrParams[i].height;
      formSelector.appendChild(insertLabelTextarea(labelElem, widthElem, heightElem));
    };
  }
  document.body.replaceChild(formSelector, formSelectorOld);
  // end buildForm
}

buildForm(descriptionForm, nameForm);
