/* global bugzilla; */

'use strict';

(function(window) {

  window.component = function(name, container, options) {
    var component = {
      selectors: {
        header: '.header',
        total: '.total',
        open: '.open',
        openContainer: '.open-container',
        resolved: '.resolved',
        resolvedContainer: '.resolved-container',
        newBug: '.new-bug',
        bugsList: '.p1-bugs-list',
        goodFirstBugsList: '.good-first-bugs-list',
        comment: '.comment'
      },
      name: name,
      counts: {},
      keys: options.keys,
      keywords: 'access',
      html: '<header class="header"></header>' +
        '<div class="component-section">' +
          '<p class="comment" hidden></p>' +
          '<p class="bugs-information">There were ' +
              '<a class="bug-count total-bugs"><span class="total"></span>' +
              '</a> reported bugs. <span class="resolved-container" hidden>' +
              '<a class="bug-count resolved-bugs"><span class="resolved">' +
              '</span></a> bugs are now resolved.</span> ' +
              '<span class="open-container" hidden>' +
              '<a class="bug-count open-bugs"><span class="open"></span></a> ' +
              'are currently open.</span>' +
              '<a class="bug-count new-bug large">File New Bug</a>' +
          '</p>' +
          '<ul class="p1-bugs-list bugs-list" hidden></ul>' +
          '<ul class="good-first-bugs-list bugs-list" hidden></ul>' +
        '</div>'
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
    }

    component.loadComment = function loadComment(callback) {
      bugzilla.get('comments/' + component.name + '.json', function(response) {
        component.comment = response;
        callback && callback();
      });
    };

    component.loadCount = function loadCount(elementKey, args, callback) {
      var element = component.elements[elementKey];
      args = args || {};
      args.component = component.keys;
      args.keywords = component.keywords;
      bugzilla.getCount(args, function(count) {
        var option = element.parentNode;
        var container = component.elements[elementKey + 'Container'];
        option.setAttribute('href', bugzilla.getExternalUrl(args));
        element.textContent = count;
        component.counts[elementKey] = count;
        if (container) {
          container.hidden = false;
        }
        if (callback) {
          callback();
        }
      });
    };

    component.loadTotal = function loadTotal() {
      component.loadCount('total', null, function() {
        component.totalLoaded = true;
        if (component.counts.total === 0) {
          component.element.hidden = false;
          component.element.focus();
          return;
        }
        component.loadBugs(function() {
          component.element.hidden = false;
          component.element.focus();
        });
      });
    };

    component.showCounts = function showCounts() {
      if (component.element.hidden && component.counts.open !== undefined &&
        component.counts.resolved !== undefined) {
        component.element.hidden = false;
        component.element.focus();
      }
    };

    component.loadBugs = function loadBugs(callback) {
      component.loadCount('open', {
        status: ['NEW', 'REOPENED']
      }, component.showCounts);
      component.loadCount('resolved', {
        status: ['RESOLVED']
      }, component.showCounts);

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
          tag: 'li',
          id: labelId,
          classes: ['bugs-list-item', 'bugs-list-label'],
          attrs: {
            'aria-hidden': true
          },
          text: label
        }));
        bugs.forEach(function(bug) {
          var li = makeElement({
            tag: 'li',
            classes: ['bugs-list-item']
          });
          li.appendChild(makeElement({
            tag: 'a',
            attrs: {
              href: bugzilla.bugUrl + bug.id
            },
            text: bug.summary
          }));
          bugsList.appendChild(li);
        });
        bugsList.hidden = false;
      });
    };

    component.activateSection = function activateSection() {
      Array.prototype.forEach.call(document.querySelectorAll('.component'),
        function(component) {
          component.hidden = true;
        });
      if (!component.rendered) {
        component.render();
      }
      if (!component.totalLoaded) {
        component.loadTotal();
      }
    };

    component.renderOverview = function renderOverview() {
      component.loadComment(function() {
        var li = makeElement({
          tag: 'li',
          classes: ['item'],
          id: component.name + '-overview'
        });
        var a = makeElement({
          tag: 'a',
          text: options.label,
          classes: ['link'],
          attrs: {
            href: container,
            'aria-haspopup': true,
            'aria-controls': container.substr(1),
            'aria-describedby': component.name + '-score',
          }
        });
        a.addEventListener('click', component.activateSection);
        li.appendChild(a);
        li.appendChild(makeElement({
          tag: 'span',
          classes: ['score'],
          attrs: {
            'aria-label': component.comment.score ?
              'Accessibility Score ' + component.comment.score : '',
            'aria-hidden': true
          },
          id: component.name + '-score',
          text: component.comment.score || ''
        }));
        document.querySelector('.components-overview').appendChild(li);

        // If App hash is present load the component section.
        if (window.location.hash.substr(1) === component.name) {
          component.activateSection();
        }
      });
    };

    component.render = function render() {
      component.elements.header.textContent = options.label;
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
      if (component.comment.comment) {
        component.elements.comment.hidden = false;
        component.elements.comment.textContent = component.comment.comment;
      }
      component.rendered = true;
    };

    component.init = function init() {
      component.element = document.querySelector(container);
      component.element.classList.add('component');
      component.elements = {};

      component.element.insertAdjacentHTML('beforeend', component.html);

      for (var key in component.selectors) {
        var selector = component.selectors[key];
        component.elements[key] = document.querySelector(container + ' ' +
          selector);
      }

      component.renderOverview();
    };

    component.init();

    return component;
  };

})(window);
