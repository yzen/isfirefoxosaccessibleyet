'use strict';

(function() {

  function get(path, callback) {
    var req =  new XMLHttpRequest();
    req.onload = callback;
    req.open('GET', path, true);
    req.send();
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
