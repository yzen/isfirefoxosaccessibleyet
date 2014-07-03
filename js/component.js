/* global bugzilla; */

'use strict';

(function(window) {

  window.component = function(container, options) {
    var component = {
      selectors: {
        total: '.total',
        open: '.open',
        resolved: '.resolved',
        p1: '.priority-1',
        p2: '.priority-2'
      },
      keys: options.keys,
      keywords: 'access'
    };

    component.loadCount = function loadCount(element, args) {
      args = args || {};
      args.component = component.keys;
      args.keywords = component.keywords;
      bugzilla.getCount(args, function(count) {
        element.textContent = count;
      });
    };

    component.init = function init() {
      component.element = document.querySelector(container);
      component.elements = {};

      for (var key in component.selectors) {
        var selector = component.selectors[key];
        component.elements[key] = document.querySelector(container + ' ' +
          selector);
      }

      component.loadCount(component.elements.total);
      component.loadCount(component.elements.open, {
        status: ['NEW', 'REOPENED']
      });
      component.loadCount(component.elements.resolved, {
        status: ['RESOLVED']
      });
      component.loadCount(component.elements.p1, {
        status: ['NEW', 'REOPENED'],
        whiteboard: '[b2ga11y p=1]'
      });
      component.loadCount(component.elements.p2, {
        status: ['NEW', 'REOPENED'],
        whiteboard: '[b2ga11y p=2]'
      });
    };

    component.init();

    return component;
  };

  // bugzilla.getCount({
  //   whiteboard: '[b2ga11y p=1]',
  //   status: ['NEW', 'REOPENED'],
  //   component: ['Gaia::System', 'Gaia::System::Lockscreen',
  //     'Gaia::System::Input Mgmt', 'Gaia::System::Browser Chrome',
  //     'Gaia::System::Window Mgmt']
  // }, function(count) {
  //   console.log(count);
  // });

  // bugzilla.getList({
  //   whiteboard: '[b2ga11y p=1]',
  //   status: ['NEW', 'REOPENED'],
  //   component: ['Gaia::System', 'Gaia::System::Lockscreen',
  //     'Gaia::System::Input Mgmt', 'Gaia::System::Browser Chrome',
  //     'Gaia::System::Window Mgmt']
  // }, function(bugs) {
  //   console.log(bugs);
  // });

  // var systemAppUrl = 'https://api-dev.bugzilla.mozilla.org/latest/bug?' +
  //   'whiteboard=[b2ga11y p=1]&' +
  //   'status=NEW&' +
  //   'status=REOPENED&' +
  //   'component=Gaia::System&' +
  //   'component=Gaia::System::Lockscreen&' +
  //   'component=Gaia::System::Input Mgmt&' +
  //   'component=Gaia::System::Browser Chrome&' +
  //   'component=Gaia::System::Window Mgmt';

})(window);
