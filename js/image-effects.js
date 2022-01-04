'use strict';

(function () {
  var EFFECT_LINE_WIDTH = 453;

  var HUNDRED_PERCENT = 100;

  var INVERT_MIN_VALUE = 0;

  var BLUR_MAX_VALUE = 3;

  var BRIGHTNESS_MIN_VALUE = 1;
  var BRIGHTNESS_MAX_VALUE = 3;

  // Отображает загруженное изображение
  var imgUploadPreview = document.querySelector('.img-upload__preview img');

  // Поле сохраняет масштаб изображения
  var scaleControlValue = document.querySelector('.scale__control--value');

  // Кнопки увеличения / уменьшения загруженного изображения
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');

  // Список эффектов для изображения
  var effectsList = document.querySelector('.effects__list');

  // Список эффектов для изображения
  var effectNoneRadio = document.querySelector('#effect-none');

  // Блок с ползунком для изменения уровень эффекта
  var effectLevel = document.querySelector('.effect-level');

  // Индикатор глубины уровня эффекта
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  // Ползунок изменяющий уровень эффекта
  var effectLevelPin = document.querySelector('.effect-level__pin');

  // Поле сохраняет уровень эффекта установленный ползунком
  var effectLevelValue = document.querySelector('.effect-level__value');

  var startX;

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = startX - moveEvt.clientX;
    startX = moveEvt.clientX;

    var newPinPosition = effectLevelPin.offsetLeft - shift;
    if (newPinPosition >= 0 && newPinPosition <= EFFECT_LINE_WIDTH) {
      effectLevelPin.style.left = newPinPosition + 'px';
      effectLevelDepth.style.width = newPinPosition + 'px';

      var saturation = Math.round((newPinPosition) / EFFECT_LINE_WIDTH * HUNDRED_PERCENT);
      effectLevelValue.value = saturation;

      imgUploadPreview.style.filter = window.imageEffects.convertPercentsToCssEffect(saturation, window.imageEffects.selectedEffect);
    }
  };

  window.imageEffects = {
    selectedEffect: 'none',

    // Управление масштабом картинки при помощи кнопок + / -
    changePictureScale: function (scaleStep) {
      scaleControlSmaller.addEventListener('click', function () {
        var integerValue = parseInt(scaleControlValue.value, 10);
        if (integerValue > scaleStep) {
          integerValue -= scaleStep;
          scaleControlValue.value = integerValue + '%';
          imgUploadPreview.style.transform = window.functions.convertIntToScale(integerValue);
        }
      });

      scaleControlBigger.addEventListener('click', function () {
        var integerValue = parseInt(scaleControlValue.value, 10);
        if (integerValue <= HUNDRED_PERCENT - scaleStep) {
          integerValue += scaleStep;
          scaleControlValue.value = integerValue + '%';
          imgUploadPreview.style.transform = window.functions.convertIntToScale(integerValue);
        }
      });
    },

    // Снимает все эффекты с imgUploadPreview
    removeAllEffects: function () {
      var effects = ['chrome', 'sepia', 'marvin', 'phobos', 'heat'];
      for (var i = 0; i < effects.length; i++) {
        var effectClass = 'effects__preview--' + effects[i];
        if (imgUploadPreview.classList.contains(effectClass)) {
          imgUploadPreview.classList.remove(effectClass);
          break;
        }
      }

      imgUploadPreview.style.filter = null;
      effectLevelPin.style.left = EFFECT_LINE_WIDTH + 'px';
      effectLevelDepth.style.width = EFFECT_LINE_WIDTH + 'px';
      effectLevelValue.value = HUNDRED_PERCENT;
    },

    returnDefaultParams: function () {
      window.imageEffects.removeAllEffects();
      window.imageEffects.selectedEffect = 'none';
      window.functions.hideElement(effectLevel);
      effectNoneRadio.checked = true;

      scaleControlValue.value = '100%';
      imgUploadPreview.style.transform = window.functions.convertIntToScale(HUNDRED_PERCENT);
    },

    // Конвертирует проценты в css свойство выбранного эффекта
    convertPercentsToCssEffect: function (percentValue, effectName) {
      var effectValue = 0;

      switch (effectName) {
        case 'chrome':
          effectValue = percentValue / HUNDRED_PERCENT;
          return 'grayscale(' + effectValue + ')';

        case 'sepia':
          effectValue = percentValue / HUNDRED_PERCENT;
          return 'sepia(' + effectValue + ')';

        case 'marvin':
          if (percentValue > INVERT_MIN_VALUE) {
            effectValue = percentValue + '%';
          } else {
            effectValue = percentValue;
          }

          return 'invert(' + effectValue + ')';

        case 'phobos':
          effectValue = percentValue * BLUR_MAX_VALUE / HUNDRED_PERCENT;
          effectValue += 'px';

          return 'blur(' + effectValue + ')';

        case 'heat':
          effectValue = percentValue * (BRIGHTNESS_MAX_VALUE - BRIGHTNESS_MIN_VALUE) / HUNDRED_PERCENT + BRIGHTNESS_MIN_VALUE;
          return 'brightness(' + effectValue + ')';

        default:
          return 'none';
      }
    },

    // Управление эффектами картинки imgUploadPreview
    putEffectOnPicture: function () {

      effectsList.addEventListener('click', function (evt) {
        if (evt.target.matches('input[type="radio"]')) {
          window.imageEffects.removeAllEffects();
          window.imageEffects.selectedEffect = evt.target.value;

          if (window.imageEffects.selectedEffect !== 'none') {
            window.functions.showElement(effectLevel);
            effectLevelPin.style.left = EFFECT_LINE_WIDTH + 'px';
            effectLevelDepth.style.width = EFFECT_LINE_WIDTH + 'px';

            imgUploadPreview.classList.add('effects__preview--' + window.imageEffects.selectedEffect);
          } else {
            window.functions.hideElement(effectLevel);
          }
        }
      });

      effectLevelPin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        startX = evt.clientX;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    }

  };

})();


