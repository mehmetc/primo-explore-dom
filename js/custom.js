(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = "<style>.f18{min-height:18px;min-width:18px;height:18px;width:18px}</style><div id=\"explorerUiContainer\" ng-show=\"$ctrl.isActive()\" style=\"position:absolute;top:10px;height:90vh;background-color:#fff;z-index:1000000\">\n    <md-sidenav class=\"md-sidenav-left\" md-component-id=\"primo-explorer\" md-is-locked-open=\"$mdMedia('gt-md')\" md-whiteframe=\"4\" style=\"height:100%\">\n        <header id=\"explorerUiHeader\" ng-mousedown=\"$ctrl.headerMove($event)\">\n            <md-toolbar>\n                <div class=\"md-toolbar-tools\">\n                    <h2 flex md-truncate>PrimoExplorer v0.2</h2>\n                    <md-button class=\"md-icon-button\" ng-click=\"$ctrl.toggle()\" aria-label=\"Close\" title=\"Close\">\n                        <md-icon md-svg-icon=\"primo-ui:close\"></md-icon>\n                    </md-button>\n                </div>\n            </md-toolbar>\n        </header>\n\n        <section id=\"pe-components\">\n            <div flex id=\"pe-components-list\" ng-hide=\"$ctrl.selectedComponentDetailShow\">\n                <section style=\"background-color:#eee\">\n                    <div layout=\"row\">\n                        <md-button ng-click=\"$ctrl.refreshComponents()\">Reload</md-button>\n                        <md-input-container flex md-no-float>\n                            <label>Filter</label>\n                            <input ng-model=\"$ctrl.componentFilter\">\n                        </md-input-container>\n                    </div>\n                </section>\n                <md-content style=\"height:90%\">\n                    <md-list class=\"md-dense\">\n                        <md-list-item ng-repeat=\"component in $ctrl.components | filter:$ctrl.componentFilter\" ng-click=\"$ctrl.loadComponent(component)\">\n                            <span>{{component}}</span>\n                            <md-divider ng-if=\"!$last\"></md-divider>\n                        </md-list-item>\n                    </md-list>\n                </md-content>\n            </div>\n\n            <div flex id=\"pe-components-detail\" ng-show=\"$ctrl.selectedComponentDetailShow\">\n                <section style=\"height:100%\">\n                    <md-toolbar class=\"md-hue-2\" style=\"font-size:.8em;min-height:2.5em;height:2.5em\">\n                        <div class=\"md-toolbar-tools\" style=\"font-size:.8em;min-height:2.5em;height:2.5em\">\n\n                            <md-button class=\"md-icon-button\" ng-click=\"$ctrl.selectedComponentDetailShow = false\" aria-label=\"Back\" title=\"Back\">\n                                <md-icon class=\"f18\" md-svg-icon=\"primo-ui:chevron-left\"></md-icon>\n                            </md-button>\n\n                              <h2 flex md-truncate>{{$ctrl.selectedComponentName}}</h2>\n\n                            <md-button class=\"md-icon-button\" ng-click=\"$ctrl.blink()\" aria-label=\"Blink component\" title=\"Blink component\">\n                                <md-icon class=\"f18\" md-svg-icon=\"primo-ui:bell\"></md-icon>\n                            </md-button>\n                            <md-button class=\"md-icon-button\" ng-click=\"$ctrl.pushToConsole()\" aria-label=\"Push to console\" title=\"Push to console\">\n                                <md-icon class=\"f18\" md-svg-icon=\"primo-ui:open-in-new\"></md-icon>\n                            </md-button>\n                        </div>\n                    </md-toolbar>\n                    <section style=\"background-color:#eee\">\n                        <div layout=\"row\" layout-align=\"center center\">\n                            <md-button class=\"md-icon-button\" ng-click=\"$ctrl.selectedComponentElementPrev()\" aria-label=\"Previous element\" title=\"Previous element\">\n                                <md-icon class=\"f18\" md-svg-icon=\"primo-ui:chevron-left\"></md-icon>\n                            </md-button>\n                            <div layout-align=\"center center\">\n                                <div>{{$ctrl.selectedComponentElementIdx+1}}/{{$ctrl.selectedComponentElementCount}}</div>\n                            </div>\n                            <md-button class=\"md-icon-button\" ng-click=\"$ctrl.selectedComponentElementNext()\" aria-label=\"Next element\" title=\"Next element\">\n                                <md-icon class=\"f18\" md-svg-icon=\"primo-ui:chevron-right\"></md-icon>\n                            </md-button>\n                        </div>\n                        <div layout=\"row\" layout-align=\"center center\">\n                          <div flex md-truncate style=\"font-size:10px\">css({{$ctrl.selectedComponentElement.cssPath}})</div>\n                        </div>                        \n                    </section>\n                    <section>\n                        <md-list>\n                          <md-list-item ng-repeat=\"key in $ctrl.selectedComponentElementCtrlKeys()\">\n                              {{key}}\n                          </md-list-item>\n                        </md-list>\n                    </section>\n                </section>\n            </div>\n        </section>\n    </md-sidenav>\n</div>";

},{}],2:[function(require,module,exports){
'use strict';

var _primo = require('./primo');

var _primo2 = _interopRequireDefault(_primo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Primo = _primo2.default;

},{"./primo":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _explore = require('./primo/explore');

var _explore2 = _interopRequireDefault(_explore);

var _helper = require('./primo/helper');

var _helper2 = _interopRequireDefault(_helper);

var _ui = require('./primo/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Primo = function () {
  function Primo() {
    _classCallCheck(this, Primo);
  }

  _createClass(Primo, null, [{
    key: 'isDebugEnabled',
    value: function isDebugEnabled() {
      return _helper2.default.isDebugEnabled();
    }
  }, {
    key: 'isPrimoAvailable',
    value: function isPrimoAvailable() {
      return _helper2.default.isPrimoAvailable();
    }
  }, {
    key: 'explore',
    get: function get() {
      return _explore2.default;
    }
  }, {
    key: 'ui',
    get: function get() {
      if (this._ui === undefined) {
        console.log('Creation UI');
        this._ui = new _ui2.default();
      }
      return this._ui;
    }
  }]);

  return Primo;
}();

exports.default = Primo;

},{"./primo/explore":4,"./primo/helper":9,"./primo/ui":10}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _components = require('./explore/components');

var _components2 = _interopRequireDefault(_components);

var _records = require('./explore/records');

var _records2 = _interopRequireDefault(_records);

var _facets = require('./explore/facets');

var _facets2 = _interopRequireDefault(_facets);

var _session = require('./explore/session');

var _session2 = _interopRequireDefault(_session);

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//this is proxy class
var Explore = function () {
  function Explore() {
    _classCallCheck(this, Explore);
  }

  _createClass(Explore, null, [{
    key: 'components',
    get: function get() {
      var c = new _components2.default();
      _helper2.default.componentNames.forEach(function (selector) {
        c.add(selector);
      });

      return c;
    }
  }, {
    key: 'records',
    get: function get() {
      return new _records2.default(this.components);
    }
  }, {
    key: 'facets',
    get: function get() {
      return new _facets2.default(this.components);
    }
  }, {
    key: 'session',
    get: function get() {
      return new _session2.default();
    }
  }]);

  return Explore;
}();

exports.default = Explore;

},{"./explore/components":5,"./explore/facets":6,"./explore/records":7,"./explore/session":8,"./helper":9}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = require('../helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cssSelectorGenerator = new (require('../../vendor/css-selector-generator.js').CssSelectorGenerator)();

var Component = function () {
  function Component(element) {
    _classCallCheck(this, Component);

    this.element = element;
  }

  _createClass(Component, [{
    key: 'blink',
    value: function blink() {
      _helper2.default.blink(this);
    }
  }, {
    key: 'scope',
    value: function scope() {
      if (_helper2.default.isDebugEnabled()) {
        return angular.element(this.element).scope();
      } else {
        console.error('Please run "angular.reloadWithDebugInfo()" first');
      }
    }
  }, {
    key: 'ctrl',
    value: function ctrl() {
      var scope = this.scope();
      if (scope) {
        if (Object.keys(scope).includes('$ctrl')) {
          return scope.$ctrl;
        } else if (scope.$$childTail && Object.keys(scope.$$childTail).includes('$ctrl')) {
          return scope.$$childTail.$ctrl;
        } else {
          console.error('No $ctrl defined');
        }
      }

      return null;
    }
  }, {
    key: 'cssPath',
    get: function get() {
      return cssSelectorGenerator.getSelector(this.element);
    }
  }, {
    key: 'name',
    get: function get() {
      return this.element.localName;
    }
  }]);

  return Component;
}();

var Components = function () {
  function Components() {
    _classCallCheck(this, Components);

    this._components = {};
  }

  _createClass(Components, [{
    key: 'add',
    value: function add(selector) {
      var elements = _helper2.default.querySelectorAll(selector);
      var elementsArray = this._components[selector] || [];

      elements.forEach(function (element) {
        elementsArray.push(new Component(element));
      });

      this._components[selector] = elementsArray;

      return elementsArray;
    }
  }, {
    key: 'get',
    value: function get(selector) {
      return this._components[selector] || null;
    }
  }, {
    key: 'keys',
    value: function keys() {
      return Object.keys(this._components);
    }
  }]);

  return Components;
}();

exports.default = Components;

},{"../../vendor/css-selector-generator.js":11,"../helper":9}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

var _helper = require('../helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Facets = function () {
    function Facets(components) {
        _classCallCheck(this, Facets);

        return this._facets(components);
    }

    _createClass(Facets, [{
        key: '_facets',
        value: function _facets(components) {
            try {
                if (components) {
                    var c = components.get('prm-facet-after');
                    if (c && c.length > 0) {
                        var ctrl = c[0].ctrl;
                        return ctrl.facetService.results;
                    }
                }
            } catch (e) {
                console.log('trying to get facets through the rootScope');
                try {
                    return _helper2.default.userSessionManagerService.searchStateService.resultObject.facets;
                } catch (e) {
                    console.error('unable to retrieve facets');
                }
            }

            return [];
        }
    }]);

    return Facets;
}();

exports.default = Facets;

},{"../helper":9,"./components":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

var _helper = require('../helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Records = function () {
    function Records(components) {
        _classCallCheck(this, Records);

        return this._items(components);
    }

    _createClass(Records, [{
        key: '_items',
        value: function _items(components) {
            try {
                if (components) {
                    var c = components.get('prm-search-result-list-after');
                    if (c && c.length > 0) {
                        var ctrl = c[0].ctrl();
                        if (ctrl) {
                            return ctrl.itemlist;
                        }
                        throw "try again";
                    }
                }
            } catch (e) {
                console.log('trying to get records through the rootScope');
                try {
                    return _helper2.default.userSessionManagerService.searchStateService.resultObject.data;
                } catch (e) {
                    console.error('unable to retrieve items');
                }
            }

            return [];
        }
    }]);

    return Records;
}();

exports.default = Records;

},{"../helper":9,"./components":5}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = require('../helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Session = function () {
    function Session() {
        _classCallCheck(this, Session);

        return this._data;
    }

    _createClass(Session, [{
        key: '_data',
        get: function get() {
            var data = {};
            var uSms = _helper2.default.userSessionManagerService;
            if (uSms) {
                var jwtData = uSms.jwtUtilService.getDecodedToken();
                data = {
                    id: jwtData.jti,
                    view: {
                        code: jwtData.viewId,
                        institution: {
                            code: jwtData.viewInstitutionCode || window.appConfig['vid'],
                            name: window.appConfig['primo-view']['attributes-map'].institution
                        },
                        interfaceLanguage: ''
                    },
                    ip: {
                        address: jwtData.ip
                    },
                    user: {
                        id: jwtData.user || '',
                        email: '',
                        name: jwtData.userName || 'Guest',
                        isLoggedIn: function isLoggedIn() {
                            return uSms.getUserName().length > 0;
                        },
                        isOnCampus: function isOnCampus() {
                            return jwtData.onCampus == "true" ? true : false;
                        }
                    }
                };

                //$localForage.getItem('userDetails').then(function(data) {
                //    vm.view.interfaceLanguage = data ? data.interfaceLanguage : '';
                //    vm.user.email = data ? data.email : '';
                //});
                return data;
            }
        }
    }]);

    return Session;
}();

exports.default = Session;

},{"../helper":9}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Helper = function () {
    function Helper() {
        _classCallCheck(this, Helper);
    }

    _createClass(Helper, null, [{
        key: 'isDebugEnabled',
        value: function isDebugEnabled() {
            return typeof angular.element(document.querySelector('prm-logo')).scope() == 'undefined' ? false : true;
        }
    }, {
        key: 'isPrimoAvailable',
        value: function isPrimoAvailable() {
            if ('undefined' !== typeof window.angular) {
                if (document.querySelector('primo-explore') !== null) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: 'querySelectorAll',
        value: function querySelectorAll(selector) {
            return Array.from(document.querySelectorAll(selector));
        }
    }, {
        key: 'injector',
        value: function injector() {
            var c = Primo.explore.components.get('primo-explore');
            if (c && c.length > 0) {
                var primoExplore = angular.element(c[0].element);
                var injector = primoExplore.injector();
                if (injector) {
                    return injector;
                }
            }

            return null;
        }
    }, {
        key: 'rootScope',
        value: function rootScope() {
            var injector = this.injector();
            if (injector) {
                var rootScope = injector.get('$rootScope');
                if (rootScope) {
                    return rootScope;
                }
            }

            return null;
        }
    }, {
        key: 'blink',
        value: function blink(component) {
            var numberOfBlinks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

            var intervalId = null;
            var borderElement = null;
            var index = Math.floor(Math.random() * (1000 - 1)) + 1;
            var borderSelector = component.element.cssPath + index + 'Rect';

            var createBorderElement = function createBorderElement() {
                if (component && component.element) {
                    var elementRect = component.element.getBoundingClientRect();
                    var _borderElement = document.createElement('div');
                    var _index = Math.floor(Math.random() * (1000 - 1)) + 1;
                    _borderElement.setAttribute('id', borderSelector);
                    _borderElement.style.border = '3px solid red';
                    _borderElement.style.position = 'absolute';
                    _borderElement.style.top = elementRect.top + 'px';
                    _borderElement.style.height = elementRect.height + 'px';
                    _borderElement.style.width = elementRect.width + 'px';
                    _borderElement.style.left = elementRect.left + 'px';
                    document.body.appendChild(_borderElement);

                    return document.querySelector('#' + borderSelector);
                }

                return null;
            };

            var removeBorderElement = function removeBorderElement() {
                if (borderElement) {
                    borderElement.remove();
                }
            };

            var blinkBorderElement = function blinkBorderElement() {
                var numberOfBlinks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;

                window.clearInterval(intervalId);

                if (numberOfBlinks < 0) {
                    removeBorderElement();
                } else {
                    borderElement.style.display = numberOfBlinks % 2 == 0 ? 'none' : 'block';
                    numberOfBlinks--;
                    intervalId = window.setInterval(blinkBorderElement, 1000, numberOfBlinks);
                }
            };

            borderElement = createBorderElement();
            blinkBorderElement(numberOfBlinks);
        }
    }, {
        key: 'componentNames',
        get: function get() {
            var tags = document.getElementsByTagName('*');
            var componentNames = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var tag = _step.value;

                    var tagName = tag.localName;
                    if (/^prm-/.test(tagName) || /^primo-/.test(tagName)) {
                        if (!componentNames.includes(tagName)) {
                            componentNames.push(tagName);
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            componentNames = componentNames.sort().filter(function (e, i, a) {
                return i === a.findIndex(function (e2) {
                    return e === e2;
                });
            });
            return componentNames;
        }
    }, {
        key: 'userSessionManagerService',
        get: function get() {
            var rootScope = this.rootScope();
            if (rootScope) {
                return rootScope.$$childHead.$ctrl.userSessionManagerService;
            }

            return null;
        }
    }]);

    return Helper;
}();

exports.default = Helper;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ui = function () {
  function Ui() {
    _classCallCheck(this, Ui);

    var vmUi = this;
    //vmUi.active = false;
    vmUi._injectDOMElement();
    vmUi.module = vmUi._createModule();
    angular.bootstrap(document.querySelector('#explorerUi'), ['explorerUi']);
    vmUi.scope = angular.element(document.querySelector('#explorerUi')).scope();
  }

  _createClass(Ui, [{
    key: '_createModule',
    value: function _createModule() {
      var vmUi = this;
      return angular.module("explorerUi", ['ngMaterial']).component("explorerUi", {
        templateUrl: 'primoExploreDOM',
        controller: ['$http', '$scope', function ($http, $scope) {
          var ctrl = this;
          ctrl.selectedTab = 0;
          ctrl.selectedComponent = null;
          ctrl.componentFilter = '';
          ctrl.selectedComponentName = '';
          ctrl.selectedComponentDetailShow = false;
          ctrl.selectedComponentElementIdx = 0;
          ctrl.selectedComponentElementCount = 0;
          ctrl.selectedComponentElement = null;

          ctrl.components = '';

          ctrl.loadComponent = function (name) {
            var c = Primo.explore.components.get(name);
            if (c && c.length > 0) {
              ctrl.selectedComponent = c;
              ctrl.selectedComponentName = name;
              ctrl.loadComponentElement(0);
              ctrl.selectedComponentDetailShow = true;
            } else {
              ctrl.selectedComponent = null;
            }
          };

          ctrl.loadComponentElement = function (index) {
            if (ctrl.selectedComponent) {
              ctrl.selectedComponentElementIdx = index;
              ctrl.selectedComponentElementCount = ctrl.selectedComponent.length;
              ctrl.selectedComponentElement = ctrl.selectedComponent[index];
            } else {
              ctrl.selectedComponentElementIdx = 0;
              ctrl.selectedComponentElementCount = 0;
              ctrl.selectedComponentElement = null;
            }
          };

          ctrl.refreshComponents = function () {
            ctrl.components = Primo.explore.components.keys();
          };

          ctrl.isActive = function () {
            return vmUi.active;
          };

          ctrl.toggle = function () {
            vmUi.toggle();
            ctrl.refreshComponents();
          };

          ctrl.selectedComponentElementCtrlKeys = function () {
            if (ctrl.selectedComponentElement) {
              var keys = ctrl.selectedComponentElement.ctrl();
              if (keys) {
                return Object.keys(keys);
              }
            }
            return [];
          };

          ctrl.selectedComponentElementPrev = function () {
            if (ctrl.selectedComponentElementIdx > 0) {
              ctrl.selectedComponentElementIdx -= 1;
              ctrl.loadComponentElement(ctrl.selectedComponentElementIdx);
            }
          };

          ctrl.selectedComponentElementNext = function () {
            if (ctrl.selectedComponentElementIdx < ctrl.selectedComponentElementCount - 1) {
              ctrl.selectedComponentElementIdx += 1;
              ctrl.loadComponentElement(ctrl.selectedComponentElementIdx);
            }
          };

          ctrl.blink = function () {
            if (ctrl.selectedComponentElement) {
              console.log('blinking ' + ctrl.selectedComponentName + '[' + ctrl.selectedComponentElementIdx + ']');
              ctrl.selectedComponentElement.blink();
            }
          };

          ctrl.pushToConsole = function () {
            if (ctrl.selectedComponentElement) {
              var varName = ctrl.selectedComponentName.split('-').map(function (m, i) {
                m = m.trim();
                return i == 0 ? m : m[0].toUpperCase() + m.substr(1);
              }).join('');

              setTimeout('eval("var ' + varName + '=(Primo.explore.components.get(\'' + ctrl.selectedComponentName + '\'))[' + ctrl.selectedComponentElementIdx + '];console.log(\'access variable through -> ' + varName + '\');")', 0);
            }
          };

          ctrl.headerMove = function (event) {
            event.stopPropagation();
            event.preventDefault();

            var header = document.querySelector('#explorerUiContainer');

            var originalTop = parseInt(window.getComputedStyle(header).top);
            var mouseDownY = event.clientY;

            var originalLeft = parseInt(window.getComputedStyle(header).left);
            var mouseDownX = event.clientX;

            var dragHeader = function dragHeader(event) {
              header.style.top = originalTop + event.clientY - mouseDownY + "px";
              header.style.left = originalLeft + event.clientX - mouseDownX + "px";
              event.stopPropagation();
            };

            var dropHeader = function dropHeader(event) {
              header.removeEventListener('mousemove', dragHeader, true);
              header.removeEventListener('mouseup', dropHeader, true);
              event.stopPropagation();
            };

            header.addEventListener('mouseup', dropHeader, true);
            header.addEventListener('mousemove', dragHeader, true);
          };
        }]
      }).config(function ($mdIconProvider) {
        $mdIconProvider.iconSet('primo-ui', 'img/svg/svg-primo-ui.svg', 18);
      }).run(function ($templateCache) {
        $templateCache.put('primoExploreDOM', require('../../html/nuDashboard.html'));
      });
    }
  }, {
    key: '_injectDOMElement',
    value: function _injectDOMElement() {
      var div = document.createElement('div');
      div.setAttribute('id', 'explorerUi');
      div.innerHTML = "<explorer-ui></explorer-ui>";

      //document.querySelector('primo-explore').appendChild(div);
      document.body.appendChild(div);
    }
  }, {
    key: 'show',
    value: function show() {
      this.active = true;
      //this.scope.$apply();
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.active = false;
      //this.scope.$apply();
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.active = !this.active;
      //this.scope.$apply();
    }
  }]);

  return Ui;
}();

exports.default = Ui;

},{"../../html/nuDashboard.html":1}],11:[function(require,module,exports){
'use strict';

(function () {
  var CssSelectorGenerator,
      root,
      indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }return -1;
  };

  CssSelectorGenerator = function () {
    CssSelectorGenerator.prototype.default_options = {
      selectors: ['id', 'class', 'tag', 'nthchild']
    };

    function CssSelectorGenerator(options) {
      if (options == null) {
        options = {};
      }
      this.options = {};
      this.setOptions(this.default_options);
      this.setOptions(options);
    }

    CssSelectorGenerator.prototype.setOptions = function (options) {
      var key, results, val;
      if (options == null) {
        options = {};
      }
      results = [];
      for (key in options) {
        val = options[key];
        if (this.default_options.hasOwnProperty(key)) {
          results.push(this.options[key] = val);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    CssSelectorGenerator.prototype.isElement = function (element) {
      return !!((element != null ? element.nodeType : void 0) === 1);
    };

    CssSelectorGenerator.prototype.getParents = function (element) {
      var current_element, result;
      result = [];
      if (this.isElement(element)) {
        current_element = element;
        while (this.isElement(current_element)) {
          result.push(current_element);
          current_element = current_element.parentNode;
        }
      }
      return result;
    };

    CssSelectorGenerator.prototype.getTagSelector = function (element) {
      return this.sanitizeItem(element.tagName.toLowerCase());
    };

    CssSelectorGenerator.prototype.sanitizeItem = function (item) {
      var characters;
      characters = item.split('').map(function (character) {
        if (character === ':') {
          return "\\" + ':'.charCodeAt(0).toString(16).toUpperCase() + " ";
        } else if (/[ !"#$%&'()*+,.\/;<=>?@\[\\\]^`{|}~]/.test(character)) {
          return "\\" + character;
        } else {
          return escape(character).replace(/\%/g, '\\');
        }
      });
      return characters.join('');
    };

    CssSelectorGenerator.prototype.getIdSelector = function (element) {
      var id, sanitized_id;
      id = element.getAttribute('id');
      if (id != null && id !== '' && !/\s/.exec(id) && !/^\d/.exec(id)) {
        sanitized_id = "#" + this.sanitizeItem(id);
        if (element.ownerDocument.querySelectorAll(sanitized_id).length === 1) {
          return sanitized_id;
        }
      }
      return null;
    };

    CssSelectorGenerator.prototype.getClassSelectors = function (element) {
      var class_string, item, result;
      result = [];
      class_string = element.getAttribute('class');
      if (class_string != null) {
        class_string = class_string.replace(/\s+/g, ' ');
        class_string = class_string.replace(/^\s|\s$/g, '');
        if (class_string !== '') {
          result = function () {
            var k, len, ref, results;
            ref = class_string.split(/\s+/);
            results = [];
            for (k = 0, len = ref.length; k < len; k++) {
              item = ref[k];
              results.push("." + this.sanitizeItem(item));
            }
            return results;
          }.call(this);
        }
      }
      return result;
    };

    CssSelectorGenerator.prototype.getAttributeSelectors = function (element) {
      var attribute, blacklist, k, len, ref, ref1, result;
      result = [];
      blacklist = ['id', 'class'];
      ref = element.attributes;
      for (k = 0, len = ref.length; k < len; k++) {
        attribute = ref[k];
        if (ref1 = attribute.nodeName, indexOf.call(blacklist, ref1) < 0) {
          result.push("[" + attribute.nodeName + "=" + attribute.nodeValue + "]");
        }
      }
      return result;
    };

    CssSelectorGenerator.prototype.getNthChildSelector = function (element) {
      var counter, k, len, parent_element, sibling, siblings;
      parent_element = element.parentNode;
      if (parent_element != null) {
        counter = 0;
        siblings = parent_element.childNodes;
        for (k = 0, len = siblings.length; k < len; k++) {
          sibling = siblings[k];
          if (this.isElement(sibling)) {
            counter++;
            if (sibling === element) {
              return ":nth-child(" + counter + ")";
            }
          }
        }
      }
      return null;
    };

    CssSelectorGenerator.prototype.testSelector = function (element, selector) {
      var is_unique, result;
      is_unique = false;
      if (selector != null && selector !== '') {
        result = element.ownerDocument.querySelectorAll(selector);
        if (result.length === 1 && result[0] === element) {
          is_unique = true;
        }
      }
      return is_unique;
    };

    CssSelectorGenerator.prototype.getAllSelectors = function (element) {
      var result;
      result = {
        t: null,
        i: null,
        c: null,
        a: null,
        n: null
      };
      if (indexOf.call(this.options.selectors, 'tag') >= 0) {
        result.t = this.getTagSelector(element);
      }
      if (indexOf.call(this.options.selectors, 'id') >= 0) {
        result.i = this.getIdSelector(element);
      }
      if (indexOf.call(this.options.selectors, 'class') >= 0) {
        result.c = this.getClassSelectors(element);
      }
      if (indexOf.call(this.options.selectors, 'attribute') >= 0) {
        result.a = this.getAttributeSelectors(element);
      }
      if (indexOf.call(this.options.selectors, 'nthchild') >= 0) {
        result.n = this.getNthChildSelector(element);
      }
      return result;
    };

    CssSelectorGenerator.prototype.testUniqueness = function (element, selector) {
      var found_elements, parent;
      parent = element.parentNode;
      found_elements = parent.querySelectorAll(selector);
      return found_elements.length === 1 && found_elements[0] === element;
    };

    CssSelectorGenerator.prototype.testCombinations = function (element, items, tag) {
      var item, k, l, len, len1, ref, ref1;
      ref = this.getCombinations(items);
      for (k = 0, len = ref.length; k < len; k++) {
        item = ref[k];
        if (this.testUniqueness(element, item)) {
          return item;
        }
      }
      if (tag != null) {
        ref1 = items.map(function (item) {
          return tag + item;
        });
        for (l = 0, len1 = ref1.length; l < len1; l++) {
          item = ref1[l];
          if (this.testUniqueness(element, item)) {
            return item;
          }
        }
      }
      return null;
    };

    CssSelectorGenerator.prototype.getUniqueSelector = function (element) {
      var found_selector, k, len, ref, selector_type, selectors;
      selectors = this.getAllSelectors(element);
      ref = this.options.selectors;
      for (k = 0, len = ref.length; k < len; k++) {
        selector_type = ref[k];
        switch (selector_type) {
          case 'id':
            if (selectors.i != null) {
              return selectors.i;
            }
            break;
          case 'tag':
            if (selectors.t != null) {
              if (this.testUniqueness(element, selectors.t)) {
                return selectors.t;
              }
            }
            break;
          case 'class':
            if (selectors.c != null && selectors.c.length !== 0) {
              found_selector = this.testCombinations(element, selectors.c, selectors.t);
              if (found_selector) {
                return found_selector;
              }
            }
            break;
          case 'attribute':
            if (selectors.a != null && selectors.a.length !== 0) {
              found_selector = this.testCombinations(element, selectors.a, selectors.t);
              if (found_selector) {
                return found_selector;
              }
            }
            break;
          case 'nthchild':
            if (selectors.n != null) {
              return selectors.n;
            }
        }
      }
      return '*';
    };

    CssSelectorGenerator.prototype.getSelector = function (element) {
      var all_selectors, item, k, l, len, len1, parents, result, selector, selectors;
      all_selectors = [];
      parents = this.getParents(element);
      for (k = 0, len = parents.length; k < len; k++) {
        item = parents[k];
        selector = this.getUniqueSelector(item);
        if (selector != null) {
          all_selectors.push(selector);
        }
      }
      selectors = [];
      for (l = 0, len1 = all_selectors.length; l < len1; l++) {
        item = all_selectors[l];
        selectors.unshift(item);
        result = selectors.join(' > ');
        if (this.testSelector(element, result)) {
          return result;
        }
      }
      return null;
    };

    CssSelectorGenerator.prototype.getCombinations = function (items) {
      var i, j, k, l, ref, ref1, result;
      if (items == null) {
        items = [];
      }
      result = [[]];
      for (i = k = 0, ref = items.length - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
        for (j = l = 0, ref1 = result.length - 1; 0 <= ref1 ? l <= ref1 : l >= ref1; j = 0 <= ref1 ? ++l : --l) {
          result.push(result[j].concat(items[i]));
        }
      }
      result.shift();
      result = result.sort(function (a, b) {
        return a.length - b.length;
      });
      result = result.map(function (item) {
        return item.join('');
      });
      return result;
    };

    return CssSelectorGenerator;
  }();

  if (typeof define !== "undefined" && define !== null ? define.amd : void 0) {
    define([], function () {
      return CssSelectorGenerator;
    });
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.CssSelectorGenerator = CssSelectorGenerator;
  }
}).call(undefined);

},{}]},{},[2]);
