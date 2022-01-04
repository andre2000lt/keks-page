'use strict';

(function () {
  var serverErrorMap = {
    '400': 'Сервер обнаружил в запросе клиента синтаксическую ошибку',
    '401': 'Требуется авторизация',
    '403': 'Запрос отклонен по причине, что сервер не хочет (или не имеет возможности) ответить клиенту',
    '404': 'Документ по указанному адресу не существует.',
    '406': 'Ресурс, указанный клиентом по данному URI, существует, но не в том формате, который нужен клиенту',
    '407': 'Прокси-сервер затребовал авторизацию'
  };

  window.serverErrors = {
    getErrorByCode: function (errorCode, errorText) {
      var message = serverErrorMap[errorCode] ? serverErrorMap[errorCode] : errorText;

      return 'Ошибка запрса (' + errorCode + '): ' + message;
    }

  };
})();
