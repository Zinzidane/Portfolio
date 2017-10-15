// Навигация на мобильных устройствах
  var navMain = document.querySelector(".main-nav");
    var navToggler = document.querySelector(".main-nav__toggler");

    navMain.classList.remove("main-nav--nojs");

    navToggler.addEventListener("click", function() {
      if (navMain.classList.contains("main-nav--closed")) {
        navMain.classList.remove("main-nav--closed");
        navMain.classList.add("main-nav--opened");
      } else {
        navMain.classList.add("main-nav--closed");
        navMain.classList.remove("main-nav--opened");
      }
    });

  // Отправка формы 

 var URL = 'https://formspree.io/ya-gans@mail.ru';
  var sendRequest = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          onError(xhr.status + 'Неверный запрос');
          break;
        case 404:
          onError(xhr.status + 'Не найдено');
          break;
        case 418:
          onError(xhr.status + 'Я чайник'); // ))
          break;
        case 500:
          onError(xhr.status + 'Ошибка сервера');
          break;
        default:
          onError('Неизвестный статус' + xhr.status + xhr.statusText);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 4000;

    xhr.open(method, url);

    xhr.send(data);

  };
  window.backend = {
    save: function (onLoad, onError, data) {
      sendRequest('POST', URL, onLoad, onError, datas);
    }
  };


  var form = document.querySelector('.contacts__form');
  var addresser = form.querySelector('#addresser');
  var email = form.querySelector("#email");
  var addresserMessage = form.querySelector("#addresserMessage");

  var setDefaultForm = function () {
    form.reset();
    addresser.required = true;
    addresser.minLength = 1;
    addresser.maxLength = 100;
    email.required = true;
    addresserMessage.min = 2;
    addresserMessage.max = 1000;
    addresserMessage.required = true;
  };

 // Валидация текстового поля
  var validateInput = function (textField, minLength, maxLength) {
    if (textField.value.length < minLength || textField.value.length > maxLength) {
      textField.style.borderColor = 'red';
      return false;
    }
    textField.style.borderColor = '';
    return true;
  };


  // Функция валидация формы
  var validateForm = function () {
    var addresserValid = validateInput(addresser, addresser.minLength, addresser.maxLength);
    var addresserMessageValid = validateInput(addresserMessage, addresserMessage.minLength, addresserMessage.maxLength);

    return addresserValid && addresserMessageValid;
  };


  var onSuccess = function () {
    setDefaultForm();
    var node = document.createElement('div');
    node.style.margin = 'auto';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'white';
    node.style.position = 'relative';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.color = 'black';
    node.textContent = 'Данные успешно отправлены';
    document.querySelector('.page-footer').insertAdjacentElement('beforeend', node);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style.margin = 'auto';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'red';
    node.style.position = 'relative';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.color = 'white';
    node.textContent = errorMessage;
    document.querySelector('.page-footer').insertAdjacentElement('beforeend', node);
  };

  // Проверка правильности заполнения полей формы
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (validateForm()) {
      window.backend.save(onSuccess, onError, new FormData(form));s
    }
  });
