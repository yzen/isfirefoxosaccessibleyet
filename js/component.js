/* global bugzilla; */

'use strict';

(function(window) {

  window.component = function(name, container, options) {
    var component = {
      selectors: {
        total: '.total',
        open: '.open',
        resolved: '.resolved',
        p1: '.priority-1',
        p2: '.priority-2',
        bugsList: '.p1-bugs-list',
        goodFirstBugsList: '.good-first-bugs-list',
        comment: '.comment'
      },
      name: name,
      counts: {},
      keys: options.keys,
      keywords: 'access'
    };

    component.loadComment = function loadComment() {
      var xhr =  new XMLHttpRequest();
      xhr.open('GET', '../comments/' + component.name + '.txt');
      xhr.addEventListener('load', function() {
        if (this.responseText) {
          component.elements.comment.hidden = false;
          component.elements.comment.textContent = this.responseText;
        }
      }, false);
      xhr.send(null);
    };

    component.loadCount = function loadCount(elementKey, args, callback) {
      var element = component.elements[elementKey];
      args = args || {};
      args.component = component.keys;
      args.keywords = component.keywords;
      bugzilla.getCount(args, function(count) {
        var option = element.parentNode;
        option.hidden = false;
        option.setAttribute('href', bugzilla.getExternalUrl(args));
        element.textContent = count;
        component.counts[elementKey] = count;
        if (callback) {
          callback();
        }
      });
    };

    component.loadTotal = function loadTotal() {
      component.loadCount('total', null, function() {
        component.loadComment();
        if (component.counts.total === 0) {
          return;
        }
        component.loadBugs();
      });
    };

    component.loadBugs = function loadBugs() {
      component.loadCount('open', {
        status: ['NEW', 'REOPENED']
      });
      component.loadCount('resolved', {
        status: ['RESOLVED']
      });
      component.loadCount('p1', {
        status: ['NEW', 'REOPENED'],
        whiteboard: '[b2ga11y p=1]'
      });
      component.loadCount('p2', {
        status: ['NEW', 'REOPENED'],
        whiteboard: '[b2ga11y p=2]'
      });

      component.loadBugsList(component.elements.bugsList, {
        status: ['NEW', 'REOPENED'],
        whiteboard: '[b2ga11y p=1]'
      });

      component.loadBugsList(component.elements.goodFirstBugsList, {
        status: ['NEW', 'REOPENED'],
        whiteboard: '[good first bug]'
      });
    };

    component.loadBugsList = function loadBugsList(bugsList, args) {
      args = args || {};
      args.component = component.keys;
      args.keywords = component.keywords;
      bugzilla.getList(args, function(bugs) {
        if (bugs.length === 0) {
          return;
        }
        bugs.forEach(function(bug) {
          var option = document.createElement('a');
          option.setAttribute('href', bugzilla.bugUrl + bug.id);
          option.classList.add('bugs-list-item');
          option.setAttribute('role', 'option');
          option.textContent = bug.summary;
          bugsList.appendChild(option);
        });
        bugsList.hidden = false;
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

      component.loadTotal();
    };

    component.init();

    return component;
  };

})(window);
