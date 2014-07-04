/* global bugzilla; */

'use strict';

(function(window) {

  component('system', '.system', {
    keys: ['Gaia::System', 'Gaia::System::Lockscreen',
      'Gaia::System::Input Mgmt', 'Gaia::System::Browser Chrome',
      'Gaia::System::Window Mgmt']
  });

  component('settings', '.settings', {
    keys: 'Gaia::Settings'
  });

})(window);
