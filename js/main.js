/* global bugzilla; */

'use strict';

(function(window) {

  component('calendar', '#calendar', {
    keys: ['Gaia::Calendar'],
    label: 'Calendar App'
  });

  component('costcontrol', '#costcontrol', {
    keys: ['Gaia::Cost Control'],
    label: 'Cost Control App'
  });

  component('camera', '#camera', {
    keys: ['Gaia::Camera'],
    label: 'Camera App'
  });

  component('gallery', '#gallery', {
    keys: ['Gaia::Gallery'],
    label: 'Gallery App'
  });

  component('music', '#music', {
    keys: ['Gaia::Music'],
    label: 'Music App'
  });

  component('fm', '#fm', {
    keys: ['Gaia::FMRadio'],
    label: 'FM Radio App'
  });

  component('video', '#video', {
    keys: ['Gaia::Video'],
    label: 'Video App'
  });

  component('email', '#email', {
    keys: ['Gaia::E-Mail'],
    label: 'E-Mail App'
  });

  component('settings', '#settings', {
    keys: ['Gaia::Settings'],
    label: 'Settings App'
  });

  component('sms', '#sms', {
    keys: ['Gaia::SMS'],
    label: 'SMS App'
  });

  component('system', '#system', {
    keys: ['Gaia::System', 'Gaia::System::Lockscreen',
      'Gaia::System::Input Mgmt', 'Gaia::System::Browser Chrome',
      'Gaia::System::Window Mgmt'],
    label: 'System App'
  });

  component('contacts', '#contacts', {
    keys: ['Gaia::Contacts'],
    label: 'Contacts App'
  });

  component('dialer', '#dialer', {
    keys: ['Gaia::Dialer'],
    label: 'Dialer App'
  });

  component('homescreen', '#homescreen', {
    keys: ['Gaia::Homescreen'],
    label: 'Homescreen App'
  });

  component('clock', '#clock', {
    keys: ['Gaia::Clock'],
    label: 'Clock App'
  });

  component('ftu', '#ftu', {
    keys: ['Gaia::First Time Experience'],
    label: 'First Time Use App'
  });

  component('search', '#search', {
    keys: ['Gaia::Search'],
    label: 'Search App'
  });

  component('keyboard', '#keyboard', {
    keys: ['Gaia::Keyboard'],
    label: 'Keyboard App'
  });

})(window);
