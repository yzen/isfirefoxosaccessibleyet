/* global bugzilla; */

'use strict';

(function(window) {

  component('system', '.system', {
    keys: ['Gaia::System', 'Gaia::System::Lockscreen',
      'Gaia::System::Input Mgmt', 'Gaia::System::Browser Chrome',
      'Gaia::System::Window Mgmt'],
    label: 'System App'
  });

  component('settings', '.settings', {
    keys: ['Gaia::Settings'],
    label: 'Settings App'
  });

  component('contacts', '.contacts', {
    keys: ['Gaia::Contacts'],
    label: 'Contacts App'
  });

})(window);
