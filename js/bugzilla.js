'use strict';

(function(window) {

  var bugzillaUrl = 'https://api-dev.bugzilla.mozilla.org/latest/';

  function get(path, callback) {
    var xhr =  new XMLHttpRequest();
    xhr.open('GET', path);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', function() {
      callback(JSON.parse(this.responseText));
    }, false);
    xhr.send(null);
  }

  function buildUrl(prefix, args) {
    var url = bugzillaUrl + prefix + '?';

    Object.keys(args).forEach(function(key, index) {
      var val = args[key];
      if (Object.prototype.toString.call(val) === "[object Array]") {
        val.forEach(function(val) {
          url += '&' + key + '=' + val;
        });
      } else {
        url += '&' + key + '=' + val;
      }
    });

    return url;
  }

  function countUrl(args) {
    return buildUrl('count', args);
  }

  function listUrl(args) {
    return buildUrl('bug', args)
  }

  function getCount(args, callback) {
    get(countUrl(args), function(response) {
      callback(response.data);
    });
  }

  function getList(args, callback) {
    get(listUrl(args), function(response) {
      callback(response.bugs);
    });
  }

  window.bugzilla = {
    getList: getList,
    getCount: getCount
  };

})(window);
