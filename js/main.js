'use strict';

(function () {
  var GET_DATA_URL = 'https://javascript.pages.academy/kekstagram/data';
  var SEND_DATA_URL = 'https://javascript.pages.academy/kekstagram';

  var onSuccessLoad = function (serverData) {
    // Генерируем массив объектов изображений
    var allPhotos = window.data.getAllPhotos(serverData);

    // Рендерим миниатюры из массива объектов изображений
    window.thumbnails.renderPhotos(allPhotos);

    // Увеличиваем выбранную миниатюру по клику или нажатию Enter
    window.thumbnails.enlargePicture(allPhotos);

    // Показываем фильтры фотографий на главной странице
    var imgFiltersBlock = document.querySelector('.img-filters');
    imgFiltersBlock.classList.remove('img-filters--inactive');

    var renderFilteredPhotos = window.debounce(function (evt) {
      var buttonId = evt.target.id;
      var filteredPhotos = '';

      switch (buttonId) {
        case 'filter-default':
          filteredPhotos = allPhotos;
          break;
        case 'filter-random':
          filteredPhotos = window.data.getRandomPhotos(allPhotos, 10);
          break;
        case 'filter-discussed':
          filteredPhotos = window.data.sortPhotosByComments(allPhotos);
          break;
        default:
          filteredPhotos = allPhotos;
          break;
      }

      // Рендерим миниатюры из массива объектов изображений
      window.thumbnails.renderPhotos(filteredPhotos);
    });

    var imgFilters = document.querySelector('.img-filters__form');
    imgFilters.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('img-filters__button')) {
        var filterButtons = imgFilters.querySelectorAll('.img-filters__button');
        filterButtons.forEach(function (button) {
          if (button.classList.contains('img-filters__button--active')) {
            button.classList.remove('img-filters__button--active');
          }
        });

        evt.target.classList.add('img-filters__button--active');

        renderFilteredPhotos(evt);
      }

    });
  };

  var onErrorLoad = function (errorCode, errorText) {
    throw new Error(window.serverErrors.getErrorByCode(errorCode, errorText));
  };

  var onSuccessUpload = function () {
    window.uploadImage.closeEditImageForm();
    window.uploadImage.showSuccessMessage();
  };

  var onErrorUpload = function (errorCode, errorText) {
    window.uploadImage.closeEditImageForm();
    window.uploadImage.showErrorMessage();
    throw new Error(window.serverErrors.getErrorByCode(errorCode, errorText));
  };

  window.server.getData(GET_DATA_URL, onSuccessLoad, onErrorLoad);

  window.uploadImage.customizeUserPhoto();

  var imgUploadForm = document.querySelector('.img-upload__form');
  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var formData = new FormData(imgUploadForm);
    window.server.uploadData(SEND_DATA_URL, formData, onSuccessUpload, onErrorUpload);
  });

})();
