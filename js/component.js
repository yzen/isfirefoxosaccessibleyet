/* global bugzilla; */

'use strict';

(function(window) {

  window.component = function(name, container, options) {
    var component = {
      selectors: {
        header: '.header',
        bugCounts: '.bugs-counts',
        bugCountLabel: '.bug-count-label',
        total: '.total',
        open: '.open',
        resolved: '.resolved',
        p1: '.priority-1',
        p2: '.priority-2',
        newBug: '.new-bug',
        bugsList: '.p1-bugs-list',
        goodFirstBugsList: '.good-first-bugs-list',
        comment: '.comment'
      },
      name: name,
      counts: {},
      keys: options.keys,
      keywords: 'access'
    };

    function setElement(element, opts) {
      opts.attrs = opts.attrs || {};
      opts.classes = opts.classes || [];
      opts.id && (element.id = opts.id);
      opts.text && (element.textContent = opts.text);
      (typeof opts.hidden === 'boolean') && (element.hidden = opts.hidden);
      element.classList.add.apply(element.classList, opts.classes);
      for (var key in opts.attrs) {
        element.setAttribute(key, opts.attrs[key]);
      }
      return element;
    }

    function makeElement(opts) {
      var element = document.createElement(opts.tag);
      return setElement(element, opts);
    };

    component.loadComment = function loadComment() {
      var xhr =  new XMLHttpRequest();
      xhr.open('GET', 'comments/' + component.name + '.txt');
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
      }, 'High Priority Bugs', component.name + '-bugs-list-label');

      component.loadBugsList(component.elements.goodFirstBugsList, {
        status: ['NEW', 'REOPENED'],
        whiteboard: '[good first bug]'
      }, 'Good First Bugs', component.name + '-good-first-bugs-list-label');
    };

    component.loadBugsList = function loadBugsList(bugsList, args, label, labelId) {
      args = args || {};
      args.component = component.keys;
      args.keywords = component.keywords;
      bugzilla.getList(args, function(bugs) {
        if (bugs.length === 0) {
          return;
        }
        bugsList.setAttribute('aria-labelledby', labelId);
        bugsList.appendChild(makeElement({
          tag: 'div',
          id: labelId,
          classes: ['bugs-list-item', 'bugs-list-label'],
          attrs: {
            'aria-hidden': true
          },
          text: label
        }));
        bugs.forEach(function(bug) {
          bugsList.appendChild(makeElement({
            tag: 'a',
            attrs: {
              href: bugzilla.bugUrl + bug.id,
              role: 'option'
            },
            classes: ['bugs-list-item'],
            text: bug.summary
          }));
        });
        bugsList.hidden = false;
      });
    };

    component.render = function render() {
      component.elements.header.textContent = options.label;
      component.elements.bugCounts.setAttribute('aria-labelledby',
        component.name + '-bug-count');
      component.elements.bugCountLabel.id = component.name + '-bug-count';
      component.elements.newBug.setAttribute('href', bugzilla.getExternalUrl({
        blocked: 'gaiaa11y',
        cc: ['yzenevich@mozilla.com', 'marco.zehe@googlemail.com',
          'eitan@monotonous.org'],
        component: component.keys,
        keywords: 'access',
        op_sys: 'Gonk (Firefox OS)',
        product: 'Firefox OS',
        rep_platform: 'All'
      }, 'enter_bug.cgi'));
    };

    component.init = function init() {
      component.element = document.querySelector(container);
      component.elements = {};

      for (var key in component.selectors) {
        var selector = component.selectors[key];
        component.elements[key] = document.querySelector(container + ' ' +
          selector);
      }

      component.render();
      component.loadTotal();
    };

    component.init();

    return component;
  };

})(window);
