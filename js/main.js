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

  component('dialer', '.dialer', {
    keys: ['Gaia::Dialer'],
    label: 'Dialer App'
  });

  component('sms', '.sms', {
    keys: ['Gaia::SMS'],
    label: 'SMS App'
  });

  component('homescreen', '.homescreen', {
    keys: ['Gaia::Homescreen'],
    label: 'Homescreen App'
  });

  component('keyboard', '.keyboard', {
    keys: ['Gaia::Keyboard'],
    label: 'Keyboard App'
  });

  component('music', '.music', {
    keys: ['Gaia::Music'],
    label: 'Music App'
  });

  component('video', '.video', {
    keys: ['Gaia::Video'],
    label: 'Video App'
  });

})(window);
