'use strict';

(function () {
  var sectionMain = document.querySelector('main');

  // Поле загрузки изображения
  var uploadFile = document.querySelector('#upload-file');

  // Окно редактирования изображения
  var editImageForm = document.querySelector('.img-upload__overlay');

  // Кнопка закрытия окна редактирования изображения
  var uploadCancel = document.querySelector('#upload-cancel');

  // Отображает загруженное изображение
  var imgUploadPreview = document.querySelector('.img-upload__preview img');

  // Добавляет в main окно с сообщением о успешной загрузке на сервер изображения
  var createSuccessMessageElement = function () {
    var successTemplate = document.querySelector('#success');

    var successMessage = successTemplate.content.querySelector('.success');
    successMessage.classList.add('hidden');
    sectionMain.appendChild(successMessage);
  };

  // Добавляет в main окно с сообщением об ошибке при загрузке на сервер изображения
  var createErrorMessageElement = function () {
    var errorTemplate = document.querySelector('#error');

    var errorMessage = errorTemplate.content.querySelector('.error');
    errorMessage.classList.add('hidden');
    sectionMain.appendChild(errorMessage);
  };

  window.uploadImage = {
    customizeUserPhoto: function () {
      var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

      // Поле загрузки изображения
      uploadFile.addEventListener('change', function () {
        var file = uploadFile.files[0];
        var fileName = file.name.toLowerCase();

        var isImage = FILE_TYPES.some(function (imageType) {
          return fileName.endsWith(imageType);
        });

        if (isImage) {
          var reader = new FileReader();

          reader.addEventListener('load', function () {
            imgUploadPreview.src = reader.result;
            window.uploadImage.openEditImageForm();
          });

          reader.readAsDataURL(file);
        }
      });

      // Закрытие формы редактирования изображения
      uploadCancel.addEventListener('click', function () {
        window.uploadImage.closeEditImageForm();
      });

      // Изменение масштаба изображения
      window.imageEffects.changePictureScale(25);

      // Наложение эффектов на изображение
      window.imageEffects.putEffectOnPicture();

      // Валидация хэштегов
      window.form.checkHashtags();

      // Валидация описания изображения
      window.form.checkPhotoDescription(140);
    },

    // Обработчик нажатия клавиши ESC (Для закрытия формы редактирования картинки)
    onEditImageFormPressEsc: function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        window.uploadImage.closeEditImageForm();
      }
    },

    // Открывает форму редактирования картинки
    openEditImageForm: function () {
      editImageForm.classList.remove('hidden');
      window.functions.toggleBodyClass('add');
      document.addEventListener('keydown', this.onEditImageFormPressEsc);

      window.imageEffects.returnDefaultParams();
    },

    // Закрывает форму редактирования картинки
    closeEditImageForm: function () {
      editImageForm.classList.add('hidden');
      window.functions.toggleBodyClass('remove');
      document.removeEventListener('keydown', this.onEditImageFormPressEsc);

      uploadFile.value = '';
      window.imageEffects.returnDefaultParams();
      window.form.clearTextFields();
    },

    // Показывает окно с сообщением об успешной загрузке на сервер изображения
    showSuccessMessage: function () {
      if (!document.querySelector('.success')) {
        createSuccessMessageElement();
      }

      var successMessage = document.querySelector('.success');
      successMessage.classList.remove('hidden');

      var closeSuccessMessege = function () {
        successMessage.classList.add('hidden');
        document.removeEventListener('keydown', onSuccessMessagePressEsc);
        successMessage.removeEventListener('click', onSuccessMessageClick);
      };

      var onSuccessMessageClick = function (evt) {
        if (evt.target.className === 'success' || evt.target.className === 'success__button') {
          closeSuccessMessege();
        }
      };

      var onSuccessMessagePressEsc = function (evt) {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          closeSuccessMessege();
        }
      };

      successMessage.addEventListener('click', onSuccessMessageClick);
      document.addEventListener('keydown', onSuccessMessagePressEsc);
    },

    // Показывает окно с сообщением об ошибке при загрузке на сервер изображения
    showErrorMessage: function () {
      if (!document.querySelector('.error')) {
        createErrorMessageElement();
      }

      var errorMessage = document.querySelector('.error');
      errorMessage.classList.remove('hidden');

      var closeErrorMessege = function () {
        errorMessage.classList.add('hidden');
        document.removeEventListener('keydown', onErrorMessagePressEsc);
        errorMessage.removeEventListener('click', onErrorMessageClick);
      };

      var onErrorMessageClick = function (evt) {
        if (evt.target.className === 'error' || evt.target.className === 'error__button') {
          closeErrorMessege();
        }
      };

      var onErrorMessagePressEsc = function (evt) {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          closeErrorMessege();
        }
      };

      errorMessage.addEventListener('click', onErrorMessageClick);
      document.addEventListener('keydown', onErrorMessagePressEsc);
    }

  };

})();
