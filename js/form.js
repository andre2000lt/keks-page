'use strict';

(function () {
  // Поле для ввода хэштегов загруженной фотографии
  var textHashtags = document.querySelector('.text__hashtags');

  // Поле для ввода описания загруженной фотографии
  var textDescription = document.querySelector('.text__description');

  window.form = {
    // Очищает текстовые поля формы
    clearTextFields: function () {
      textHashtags.value = '';
      textDescription.value = '';
      textHashtags.setCustomValidity('');
      textDescription.setCustomValidity('');
      window.form.markInvalidfields(textHashtags);
      window.form.markInvalidfields(textDescription);
    },

    markInvalidfields: function (field) {
      if (!field.checkValidity()) {
        field.style.boxShadow = '0 0 3px 3px red';
      } else {
        field.style.boxShadow = 'none';
      }
    },

    // Валидация введеных хэштегов
    checkHashtags: function () {
      textHashtags.addEventListener('input', function () {
        var hashtagRe = /^#[0-9a-zA-Zа-яА-я]{1,19}$/;
        var hashtagsErrorCount = 0;

        var text = textHashtags.value.trim();
        if (text) {
          var hashtags = text.split(' ');

          for (var i = 0; i < hashtags.length; i++) {
            if (!hashtagRe.test(hashtags[i])) {
              hashtagsErrorCount++;
            }
          }

          if (hashtagsErrorCount) {
            textHashtags.setCustomValidity('Исправьте ошибки в ' + hashtagsErrorCount + ' хэштеге');
            textHashtags.reportValidity();
          } else if (hashtags.length > 5) {
            textHashtags.setCustomValidity('Не больше 5 хэштегов');
            textHashtags.reportValidity();
          } else if (window.functions.checkSameHashtags(hashtags)) {
            textHashtags.setCustomValidity('Удалите одинаковые хэштеги');
            textHashtags.reportValidity();
          } else {
            textHashtags.setCustomValidity('');
          }
        } else {
          textHashtags.setCustomValidity('');
        }

        window.form.markInvalidfields(textHashtags);
      });

      textHashtags.addEventListener('focus', function () {
        document.removeEventListener('keydown', window.uploadImage.onEditImageFormPressEsc);
      });

      textHashtags.addEventListener('blur', function () {
        document.addEventListener('keydown', window.uploadImage.onEditImageFormPressEsc);
      });
    },

    // Проверяет введеное описание к изображению на количество символов
    checkPhotoDescription: function (simbolCount) {
      textDescription.addEventListener('input', function () {
        var text = textDescription.value;
        var extraSimbols = 0;

        if (text) {
          if (text.length > simbolCount) {
            extraSimbols = text.length - simbolCount;
            textDescription.setCustomValidity('Удалите лишние ' + extraSimbols + ' символов');
            textDescription.reportValidity();
          } else {
            textDescription.setCustomValidity('');
          }
        } else {
          textDescription.setCustomValidity('');
        }

        window.form.markInvalidfields(textDescription);
      });

      textDescription.addEventListener('focus', function () {
        document.removeEventListener('keydown', window.uploadImage.onEditImageFormPressEsc);
      });

      textDescription.addEventListener('blur', function () {
        document.addEventListener('keydown', window.uploadImage.onEditImageFormPressEsc);
      });
    }
  };

})();


