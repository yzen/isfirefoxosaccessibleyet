'use strict';

(function() {

  function get(path, callback) {
    var xhr =  new XMLHttpRequest();
    xhr.open('GET', path);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', callback, false);
    xhr.send(null);
  }

  get('https://api-dev.bugzilla.mozilla.org/latest/bug?' +
    'whiteboard=[b2ga11y p=1]&' +
    'status=NEW&' +
    'status=REOPENED&' +
    'component=Gaia::System&' +
    'component=Gaia::System::Lockscreen&' +
    'component=Gaia::System::Input Mgmt&' +
    'component=Gaia::System::Browser Chrome&' +
    'component=Gaia::System::Window Mgmt', function() {
      console.log(this.responseText);
    });

})();
