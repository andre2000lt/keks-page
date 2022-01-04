'use strict';

(function () {
  var COMMENTS_LIMIT = 5;

  // Модальное окно с изображением увеличенной миниатюры
  var bigPicture = document.querySelector('.big-picture');

  // Кнопка закрытия окна с изображением увеличенной миниатюры
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureComments = bigPicture.querySelector('.social__comments');

  var bigPictureCommentsCounter = bigPicture.querySelector('.social__comment-count');
  var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

  window.fullPicture = {
    // Создает фрагмент с комментариями, аватарками и именами к увеличенной фотографии
    renderCommentsFragment: function (photo, startIndex) {
      var commentsFragment = document.createDocumentFragment();

      var commentTemplate = document.querySelector('#comment')
      .content
      .querySelector('.social__comment');

      var commentsCount = photo.comments.length - startIndex <= COMMENTS_LIMIT ? photo.comments.length - startIndex : COMMENTS_LIMIT;
      for (var i = startIndex; i < commentsCount + startIndex; i++) {
        var comment = commentTemplate.cloneNode(true);
        var commentAvatar = comment.querySelector('img');
        var commentMessage = comment.querySelector('.social__text');

        commentAvatar.src = photo.comments[i].avatar;
        commentAvatar.alt = photo.comments[i].name;
        commentMessage.textContent = photo.comments[i].message;

        commentsFragment.appendChild(comment);
      }

      return commentsFragment;
    },

    // Отображает увеличенную фотографию со всей связанной информацией
    renderBigPhoto: function (photo) {
      bigPicture.classList.remove('hidden');

      bigPictureImg.src = photo.url;
      bigPictureLikes.textContent = photo.likes;
      bigPictureDescription.textContent = photo.description;

      bigPictureCommentsCount.textContent = photo.comments.length;
      bigPictureComments.textContent = '';
      bigPictureComments.appendChild(window.fullPicture.renderCommentsFragment(photo, 0));
      bigPictureCommentsCounter.childNodes[0].nodeValue = bigPictureComments.children.length + ' из ';

      if (photo.comments.length === bigPictureComments.children.length) {
        if (!bigPictureCommentsLoader.classList.contains('hidden')) {
          bigPictureCommentsLoader.classList.add('hidden');
        }
      } else {
        bigPictureCommentsLoader.classList.remove('hidden');
      }

      window.functions.toggleBodyClass('add');

      var closeBigPicture = function () {
        bigPicture.classList.add('hidden');
        window.functions.toggleBodyClass('remove');
        bigPictureCommentsLoader.removeEventListener('click', onCommentsLoaderClick);
        document.removeEventListener('keydown', onBigPicturePressEsc);
      };

      // Обработчик нажатия клавиши ESC - закрывает окно увеличенной миниатюры
      var onBigPicturePressEsc = function (evt) {
        if (evt.key === 'Escape') {
          closeBigPicture();
        }
      };

      document.addEventListener('keydown', onBigPicturePressEsc);

      bigPictureCancel.addEventListener('click', function () {
        closeBigPicture();
      });

      var onCommentsLoaderClick = function () {
        var startIndex = bigPictureComments.children.length;

        if (photo.comments.length > startIndex) {
          bigPictureComments.appendChild(window.fullPicture.renderCommentsFragment(photo, startIndex));
        }

        if (photo.comments.length === bigPictureComments.children.length) {
          bigPictureCommentsLoader.classList.add('hidden');
        }

        bigPictureCommentsCounter.childNodes[0].nodeValue = bigPictureComments.children.length + ' из ';
      };

      bigPictureCommentsLoader.addEventListener('click', onCommentsLoaderClick);
    }
  };

})();
