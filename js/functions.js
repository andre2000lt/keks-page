'use strict';

(function () {
  var HUNDRED_PERCENT = 100;

  var SCALE_MAX_VALUE = 1;

  var body = document.querySelector('body');

  window.functions = {
    // Возвращает случайное число от min до max
    getRandomNumber: function (min, max) {
      if (min === max) {
        return min;
      }

      if (min > max) {
        var n = min;
        min = max;
        max = n;
      }
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Ищет одинаковые строки в массиве
    checkSameHashtags: function (hashtags) {
      for (var i = 0; i < hashtags.length - 1; i++) {
        for (var j = i + 1; j < hashtags.length; j++) {
          var re = new RegExp('^' + hashtags[i] + '$', 'i');
          if (re.test(hashtags[j])) {
            return true;
          }
        }
      }

      return false;
    },

    // Добавляет или удаляет body класс modal-open
    toggleBodyClass: function (action) { // action = {add, remove}
      if (action === 'add') {
        if (!body.classList.contains('modal-open')) {
          body.classList.add('modal-open');
        }
      } else {
        body.classList.remove('modal-open');
      }
    },

    // Преобразует число в css свойство scale
    convertIntToScale: function (intValue) {
      if (intValue !== HUNDRED_PERCENT) {
        return 'scale(0.' + intValue + ')';
      } else {
        return 'scale(' + SCALE_MAX_VALUE + ')';
      }
    },

    // Добавляет элементу element класс visually-hidden
    hideElement: function (element) {
      if (!element.classList.contains('visually-hidden')) {
        element.classList.add('visually-hidden');
      }
    },

    // Удаляет у элемента element класс visually-hidden
    showElement: function (element) {
      element.classList.remove('visually-hidden');
    }

  };

})();


