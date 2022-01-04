'use strict';

(function () {
  var ResponseType = {
    JSON: 'json'
  };

  var Code = {
    SUCCESS: 200
  };

  var Method = {
    SEND_DATA: 'POST',
    GET_DATA: 'GET'
  };

  var connectToServer = function (url, connectMethod, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status !== Code.SUCCESS) {
        onError(xhr.status, xhr.statusText);
      }

      onSuccess(xhr.response);
    });

    xhr.responseType = ResponseType.JSON;
    xhr.open(connectMethod, url);

    if (connectMethod === Method.SEND_DATA) {
      xhr.send(data);
    } else if (connectMethod === Method.GET_DATA) {
      xhr.send();
    }
  };

  window.server = {

    getData: function (url, onSuccess, onError) {
      var connectMethod = Method.GET_DATA;
      connectToServer(url, connectMethod, onSuccess, onError);
    },

    uploadData: function (url, data, onSuccess, onError) {
      var connectMethod = Method.SEND_DATA;
      connectToServer(url, connectMethod, onSuccess, onError, data);
    }
  };

})();
