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


  // LAZYLOAD

  // Get all of the images that are marked up to lazy load
const images = document.querySelectorAll('.js-lazy-image');
const config = {
  // If the image gets within 50px in the Y axis, start the download.
  rootMargin: '50px 0px',
  threshold: 0.01
};

let imageCount = images.length;
let observer;

// If we don't have support for intersection observer, loads the images immediately
if (!('IntersectionObserver' in window)) {
  loadImagesImmediately(images);
} else {
  // It is supported, load the images
  observer = new IntersectionObserver(onIntersection, config);

  // foreach() is not supported in IE
  for (let i = 0; i < images.length; i++) { 
    let image = images[i];
    if (image.classList.contains('js-lazy-image--handled')) {
      continue;
    }

    observer.observe(image);
  }
}

/**
 * Fetchs the image for the given URL
 * @param {string} url 
 */
function fetchImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = resolve;
    image.onerror = reject;
  });
}

/**
 * Preloads the image
 * @param {object} image 
 */
function preloadImage(image) {
  const src = image.dataset.src;
  if (!src) {
    return;
  }

  return fetchImage(src).then(() => { applyImage(image, src); });
}

/**
 * Load all of the images immediately
 * @param {NodeListOf<Element>} images 
 */
function loadImagesImmediately(images) {
  // foreach() is not supported in IE
  for (let i = 0; i < images.length; i++) { 
    let image = images[i];
    preloadImage(image);
  }
}

/**
 * Disconnect the observer
 */
function disconnect() {
  if (!observer) {
    return;
  }

  observer.disconnect();
}

/**
 * On intersection
 * @param {array} entries 
 */
function onIntersection(entries) {
  // Disconnect if we've already loaded all of the images
  if (imageCount === 0) {
    observer.disconnect();
  }

  // Loop through the entries
  for (let i = 0; i < entries.length; i++) { 
    let entry = entries[i];
    // Are we in viewport?
    if (entry.intersectionRatio > 0) {
      imageCount--;

      // Stop watching and load the image
      observer.unobserve(entry.target);
      preloadImage(entry.target);
    }
  }
}

/**
 * Apply the image
 * @param {object} img 
 * @param {string} src 
 */
function applyImage(img, src) {
  // Prevent this from being lazy loaded a second time.
  img.classList.add('js-lazy-image--handled');
  img.src = src;
  img.classList.add('fade-in');
}