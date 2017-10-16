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
      sendRequest('POST', URL, onLoad, onError, data);
    }
  };


  var form = document.querySelector('.contacts__form');
  var addresser = form.querySelector('#addresser');
  var email = form.querySelector("#email");
  var addresserMessage = form.querySelector("#addresserMessage");

  var setDefaultForm = function () {
    form.reset();
    addresser.required = true;
    email.required = true;
    addresserMessage.required = true;
  };


  var onSuccess = function () {
    setDefaultForm();
    var htmlLang = document.getElementsByTagName('html')[0].getAttribute('lang');
    var node = document.createElement('div');
    node.style.margin = 'auto';
    node.style.padding = '10px';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'white';
    node.style.position = 'relative';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.color = 'black';
    if (htmlLang="ru") {
      node.textContent = 'Отправлено!';
    } else {
      node.textContent = 'Sent!';
    }
    form.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {return node.style.display = "none"}, 4000);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style.margin = 'auto';
    node.style.padding = '10px';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'red';
    node.style.position = 'relative';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.color = 'white';
    node.textContent = errorMessage;
    form.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {return node.style.display = "none"}, 4000);
  };

  // Проверка правильности заполнения полей формы
  form.addEventListener('submit', function (evt) {
    window.backend.save(onSuccess, onError, new FormData(form));
  });
