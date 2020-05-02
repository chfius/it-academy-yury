var descriptionForm = [
  { elemtype: 'text', label: 'Разработчики:', width: 400 },
  { elemtype: 'text', label: 'Название сайта:', width: 400 },
  { elemtype: 'text', label: 'URL сайта:', width: 300 },
  { elemtype: 'text', label: 'Дата запуска сайта:', width: 100 },
  { elemtype: 'text', label: 'Посетителей в сутки:', width: 100 },
  { elemtype: 'text', label: 'E-mail для связи:', width: 200 },
  { elemtype: 'selector', label: 'Рубрика каталога:', options: 'Здоровье,Домашний уют,Бытовая техника' },
  { elemtype: 'radio', label: 'Размещение:', items: 'бесплатное,платное,VIP' },
  { elemtype: 'checkbox', label: 'Разрешить отзывы:' },
  { elemtype: 'textarea', label: 'Описание сайта:', width: 550, height: 150 },
  { elemtype: 'submit', label: 'Опубликовать', width: 100 },
];
var nameForm = 'dynForm';
var titleForm = 'Для внесения вашего сайта в каталог, заполните форму:';

function buildForm(arrParams, nameForm) {
  var formSelectorOld = document.forms[0];
  var formSelector = formSelectorOld.cloneNode();
  formSelector.name = nameForm;

  var spansStyle = 'display: block; float: left; width: 150px;';
  var newSpan = function (textLabel) {
    var spanField = document.createElement('span');
    spanField.setAttribute('style', spansStyle);
    spanField.textContent = textLabel;
    return spanField;
  }

  function insertLabelInput(textLabel, widthInputField) {
    var newDiv = document.createElement('div');
    newDiv.appendChild(newSpan(textLabel));

    var newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.style.width = widthInputField + 'px';
    newInput.name = textLabel;
    newDiv.appendChild(newInput);
    return newDiv;
  }

  function insertLabelSelector(textLabel, options) {
    var newDiv = document.createElement('div');
    newDiv.appendChild(newSpan(textLabel));

    var optionsSelector = options.split(',');
    var newSelect = document.createElement('select');
    newSelect.name = textLabel;
    for (j = 0; j < optionsSelector.length; j++) {
      var newOption = new Option(optionsSelector[j], optionsSelector[j]);
      newSelect.appendChild(newOption);
    }
    newDiv.appendChild(newSelect);
    return newDiv;
  }

  function insertLabelRadio(textLabel, items) {
    var newDiv = document.createElement('div');
    newDiv.appendChild(newSpan(textLabel));

    var itemsRadio = items.split(',');
    for (var j = 0; j < itemsRadio.length; j++) {
      var newRadio = document.createElement('input');
      newRadio.name = textLabel;
      newRadio.type = 'radio';
      newRadio.value = itemsRadio[j];
      newDiv.appendChild(newRadio);
      newDiv.insertAdjacentText('beforeend', itemsRadio[j]);
    }
    return newDiv;
  }

  function insertLabelCheckbox(textLabel) {
    var newDiv = document.createElement('div');
    newDiv.appendChild(newSpan(textLabel));

    var newInput = document.createElement('input');
    newInput.name = textLabel;
    newInput.type = 'checkbox';
    newDiv.appendChild(newInput);
    return newDiv;
  }

  function insertLabelTextarea(textLabel, width, height) {
    var newDiv = document.createElement('div');
    newDiv.appendChild(newSpan(textLabel));
    newDiv.appendChild(document.createElement('br'));

    var newTextarea = document.createElement('textarea');
    newTextarea.name = textLabel;
    newTextarea.style.width = width + 'px';
    newTextarea.style.height = height + 'px';
    newDiv.appendChild(newTextarea);
    return newDiv;
  }

  function insertSubmit(textLabel, width) {
    var newBtn = document.createElement('input');
    newBtn.textContent = textLabel;
    newBtn.type = 'submit';
    newBtn.style.width = width + 'px';
    return newBtn;
  }

  // begin buildForm
  var title = document.createElement('p');
  title.textContent = titleForm;
  formSelector.appendChild(title);

  for (var i = 0; i < arrParams.length; i++) {
    switch (arrParams[i].elemtype) {
      case 'text':
        var labelElem = arrParams[i].label;
        var widthElem = arrParams[i].width;
        formSelector.appendChild(insertLabelInput(labelElem, widthElem));
        break;
      case 'selector':
        var labelElem = arrParams[i].label;
        var options = arrParams[i].options;
        formSelector.appendChild(insertLabelSelector(labelElem, options));
        break;
      case 'radio':
        var labelElem = arrParams[i].label;
        var items = arrParams[i].items;
        formSelector.appendChild(insertLabelRadio(labelElem, items));
        break;
      case 'checkbox':
        var labelElem = arrParams[i].label;
        formSelector.appendChild(insertLabelCheckbox(labelElem));
        break;
      case 'textarea':
        var labelElem = arrParams[i].label;
        var widthElem = arrParams[i].width;
        var heightElem = arrParams[i].height;
        formSelector.appendChild(insertLabelTextarea(labelElem, widthElem, heightElem));
        break;
      case 'submit':
        var labelElem = arrParams[i].label;
        var widthElem = arrParams[i].width;
        formSelector.appendChild(insertSubmit(labelElem, widthElem));
        break;
    }
  }

  document.body.replaceChild(formSelector, formSelectorOld);
  // end buildForm
}

buildForm(descriptionForm, nameForm);
