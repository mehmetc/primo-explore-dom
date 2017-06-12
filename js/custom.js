(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _primo = require('./primo');

var _primo2 = _interopRequireDefault(_primo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Primo = _primo2.default;

window.setTimeout(function () {
  if (_primo2.default.isDebugEnabled()) {
    _primo2.default.explore.ui.toggle();
  }
}, 2000);

},{"./primo":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _explore = require('./primo/explore');

var _explore2 = _interopRequireDefault(_explore);

var _records = require('./primo/records');

var _records2 = _interopRequireDefault(_records);

var _facets = require('./primo/facets');

var _facets2 = _interopRequireDefault(_facets);

var _view = require('./primo/view');

var _view2 = _interopRequireDefault(_view);

var _user = require('./primo/user');

var _user2 = _interopRequireDefault(_user);

var _helper = require('./primo/explore/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Primo main entry class
 */
var Primo = function () {
  function Primo() {
    _classCallCheck(this, Primo);
  }

  _createClass(Primo, null, [{
    key: 'isDebugEnabled',


    /**
     * Check if angular.reloadWithDebugInfo() has ran
     * @return {boolean}
     */
    value: function isDebugEnabled() {
      return _helper2.default.isDebugEnabled();
    }

    /**
     * Did the script ran on a Primo site
     * @return {boolean}
     */

  }, {
    key: 'isPrimoAvailable',
    value: function isPrimoAvailable() {
      return _helper2.default.isPrimoAvailable();
    }

    /**
     * This is a proxy class
     * @return {Explore}
     */

  }, {
    key: 'version',

    /**
     * Return version information
     * @return {string}
     */
    get: function get() {
      var _version = "0.0.9";
      return 'Library:' + _version + ' - Primo:' + window.appConfig['system-configuration'].Primo_Version_Number + ':' + window.appConfig['system-configuration'].Primo_HotFix_Number;
    }
  }, {
    key: 'explore',
    get: function get() {
      return _explore2.default;
    }

    /**
     * Get a pointer to available records
     * @return {Records}
     */

  }, {
    key: 'records',
    get: function get() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        resolve(new _records2.default(_this.explore.components));
      });
      //return new Records(this.explore.components);
    }

    /**
     * Get a pointer to available facets
     * @return {Facets}
     */

  }, {
    key: 'facets',
    get: function get() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        resolve(new _facets2.default(_this2.explore.components));
      });
      //return new Facets(this.explore.components);
    }

    /**
     * Get a pointer to view related metadata
     * @return {View}
     */

  }, {
    key: 'view',
    get: function get() {
      return new Promise(function (resolve, reject) {
        resolve(new _view2.default());
      });
      //return new View();
    }

    /**
     * Get a pointer to user related metadata
     * @return {User}
     */

  }, {
    key: 'user',
    get: function get() {
      return new Promise(function (resolve, reject) {
        _helper2.default.userDetailsHTTP().then(function (userDetails) {
          _helper2.default.userFinesHTTP().then(function (userFines) {
            resolve(new _user2.default({ details: userDetails, fines: userFines }));
          });
        });
      });
    }
  }]);

  return Primo;
}();

exports.default = Primo;

},{"./primo/explore":3,"./primo/explore/helper":5,"./primo/facets":7,"./primo/records":8,"./primo/user":9,"./primo/view":10}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _components = require('./explore/components');

var _components2 = _interopRequireDefault(_components);

var _helper = require('./explore/helper');

var _helper2 = _interopRequireDefault(_helper);

var _ui = require('./explore/ui');

var _ui2 = _interopRequireDefault(_ui);

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

    //TODO: extract

  }, {
    key: 'ui',
    get: function get() {
      if (this._ui === undefined) {
        console.log('Creation UI');
        this._ui = new _ui2.default();
      }
      return this._ui;
    }
  }, {
    key: 'helper',
    get: function get() {
      return _helper2.default;
    }
  }]);

  return Explore;
}();

exports.default = Explore;

},{"./explore/components":4,"./explore/helper":5,"./explore/ui":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = require('./helper');

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
        var scopeChild = scope.$$childTail;
        if (Object.keys(scope).includes('$ctrl')) {
          return scope.$ctrl;
        } else if (Object.keys(scope).includes('ctrl')) {
          return scope.ctrl;
        } else if (scopeChild && Object.keys(scopeChild).includes('$ctrl')) {
          return scopeChild.$ctrl;
        } else if (scopeChild && Object.keys(scopeChild).includes('ctrl')) {
          return scopeChild.ctrl;
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

},{"../../vendor/css-selector-generator.js":11,"./helper":5}],5:[function(require,module,exports){
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
      return window.name === 'NG_ENABLE_DEBUG_INFO!' || typeof angular.element(document.querySelector('prm-logo')).scope() != 'undefined' ? true : false;
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
    key: 'userSessionManagerService',
    value: function userSessionManagerService() {
      var rootScope = this.rootScope();
      if (rootScope) {
        return rootScope.$$childHead.$ctrl.userSessionManagerService;
      }

      return null;
    }
  }, {
    key: 'jwtData',
    value: function jwtData() {
      var uSMS = this.userSessionManagerService();
      if (uSMS) {
        var jwtData = uSMS.jwtUtilService.getDecodedToken() || {};
        return jwtData;
      }
    }
  }, {
    key: 'userDetails',
    value: function userDetails() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.userSessionManagerService().$localForage.getItem('userDetails').then(function (userDetails) {
          return resolve(userDetails);
        });
      });
    }
  }, {
    key: 'userDetailsHTTP',
    value: function userDetailsHTTP() {
      var _this2 = this;

      var viewCode = this.jwtData().viewId || window.appConfig['vid'];
      return new Promise(function (resolve, reject) {
        _this2.http.get('/primo_library/libweb/webservices/rest/v1/usersettings?vid=' + viewCode).then(function (userDetails) {
          return resolve(userDetails.data);
        });
      });
    }
  }, {
    key: 'userFinesHTTP',
    value: function userFinesHTTP() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.http.get('/primo_library/libweb/webservices/rest/v1/myaccount/fines').then(function (userFines) {
          try {
            var data = userFines.data;
            if (data.status == 'ok') {
              var fines = data.data.fines;
              resolve(fines.fine);
            } else {
              console.log('No fines');
              resolve([]);
            }
          } catch (error) {
            resolve([]);
          }
        });
      });
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
    key: 'http',
    get: function get() {
      var injector = this.injector();
      if (injector) {
        var h = injector.get('$http');
        if (h) {
          return h;
        }
      }

      return null;
    }
  }]);

  return Helper;
}();

exports.default = Helper;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
      return angular.module("explorerUi", ['ngMaterial', 'angularLoad']).component("explorerUi", {
        templateUrl: 'nuDashboard.html',
        controller: ['$http', '$scope', function ($http, $scope) {
          var ctrl = this;
          ctrl.version = Primo.version || '';
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
              ctrl.selectedComponentElementProperties = ctrl.selectedComponentElementCtrlKeys();
            } else {
              ctrl.selectedComponentElementIdx = 0;
              ctrl.selectedComponentElementCount = 0;
              ctrl.selectedComponentElement = null;
              ctrl.selectedComponentElementProperties = [];
            }
          };

          ctrl.selectedComponentElementService = null;
          ctrl.selectedComponentElementServiceName = null;
          this.selectedComponentElementServiceShow = false;
          this.selectedComponentElementServiceProperties = {};

          ctrl.loadComponentService = function (service) {
            if (this.selectedComponentElement && service.value == 'e') {
              this.selectedComponentElementServiceName = service.key;
              this.selectedComponentElementService = this.selectedComponentElement.ctrl()[service.key];
              this.selectedComponentElementServiceShow = true;
              this.selectedComponentDetailShow = false;
              this.selectedComponentElementServiceProperties = parseObject(this.selectedComponentElementService);
            } else {
              this.selectedComponentElementServiceName = null;
              this.selectedComponentElementService = null;
              this.selectedComponentElementServiceShow = false;
              this.selectedComponentElementServiceProperties = {};
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
            var sce = [];
            if (ctrl.selectedComponentElement) {
              var selectedCtrl = ctrl.selectedComponentElement.ctrl();
              if (selectedCtrl) {
                sce = parseObject(selectedCtrl);
              }
            }
            return sce;
          };

          function parseObject(selectedCtrl) {
            var sce = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = Object.keys(selectedCtrl)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                if (selectedCtrl.hasOwnProperty(key)) {
                  switch (_typeof(selectedCtrl[key])) {
                    case 'string':
                      sce.push({
                        key: key,
                        value: '"' + selectedCtrl[key] + '"',
                        type: 'string'
                      });
                      break;
                    case 'boolean':
                      sce.push({
                        key: key,
                        value: '' + selectedCtrl[key],
                        type: 'boolean'
                      });
                      break;
                    case 'number':
                      sce.push({
                        key: key,
                        value: '' + selectedCtrl[key],
                        type: 'number'
                      });
                      break;
                    case 'undefined':
                      sce.push({
                        key: key,
                        value: "Undefined",
                        type: 'undefined'
                      });
                      break;
                    case 'null':
                      sce.push({
                        key: key,
                        value: "Null",
                        type: 'null'
                      });
                      break;
                    default:
                      try {
                        sce.push({
                          key: key,
                          value: '' + selectedCtrl[key].constructor.name,
                          type: _typeof(selectedCtrl[key])
                        });
                      } catch (e) {
                        sce.push({
                          key: key,
                          value: '' + _typeof(selectedCtrl[key]),
                          type: _typeof(selectedCtrl[key])
                        });
                      }
                  } //switch
                } //if
              } //for
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

            return sce;
          }

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
        $templateCache.put('nuDashboard.html', '<style>\n    .f18 {\n        min-height: 18px;\n        min-width: 18px;\n        height: 18px;\n        width: 18px;\n    }\n\n    .peNotSelectable {\n      color:#aaaaaa;\n    }\n</style>\n<!-- $mdMedia(\'gt-md\') -->\n<div id=\'explorerUiContainer\' ng-show="$ctrl.isActive()" style=\'position:absolute;top:10px;height:90vh;background-color:white;z-index:1000000;\'>\n    <md-sidenav class="md-sidenav-left" md-component-id="primo-explorer" md-is-locked-open="true" md-whiteframe="4" style="height:100%;">\n        <header id=\'explorerUiHeader\' ng-mousedown=\'$ctrl.headerMove($event)\'>\n            <md-toolbar>\n                <div class="md-toolbar-tools">\n                    <div flex layout=\'column\'>\n                      <h2 flex md-truncate>PrimoExplorer</h2>\n                      <div style="font-size:x-small">{{$ctrl.version}}</div>\n                    </div>\n                    <md-button class=\'md-icon-button\' ng-click="$ctrl.toggle()" aria-label="Close" title=\'Close\'>\n                        <md-icon md-svg-icon="primo-ui:close"></md-icon>\n                    </md-button>\n                </div>\n            </md-toolbar>\n        </header>\n\n        <section id=\'pe-components\'>\n            <div flex id=\'pe-components-list\' ng-hide=\'$ctrl.selectedComponentDetailShow || $ctrl.selectedComponentElementServiceShow\'>\n                <section style=\'background-color:#eee;\'>\n                    <div layout=\'row\'>\n                        <md-button ng-click=\'$ctrl.refreshComponents()\'>Reload</md-button>\n                        <md-input-container flex md-no-float>\n                            <label>Filter</label>\n                            <input ng-model="$ctrl.componentFilter">\n                        </md-input-container>\n                    </div>\n                </section>\n                <md-content style="height:90%;">\n                    <md-list class="md-dense">\n                        <md-list-item ng-repeat="component in $ctrl.components | filter:$ctrl.componentFilter" ng-click="$ctrl.loadComponent(component);$event.stopPropagation();">\n                            <span>{{component}}</span>\n                            <md-divider ng-if="!$last"></md-divider>\n                        </md-list-item>\n                    </md-list>\n                </md-content>\n            </div>\n\n            <div flex id=\'pe-components-detail\' ng-show=\'$ctrl.selectedComponentDetailShow\'>\n                <section style=\'height:100%\'>\n                    <md-toolbar class=\'md-hue-2\' style="font-size: 0.8em;min-height: 2.5em;height:2.5em;">\n                        <div class="md-toolbar-tools" style="font-size: 0.8em;min-height: 2.5em;height:2.5em;">\n\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.selectedComponentDetailShow = false" aria-label="Back" title="Back">\n                                <md-icon class="f18" md-svg-icon="primo-ui:chevron-left"></md-icon>\n                            </md-button>\n\n                              <h2 flex md-truncate>{{$ctrl.selectedComponentName}}</h2>\n\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.blink()" aria-label="Blink component" title="Blink component">\n                                <md-icon class="f18" md-svg-icon="primo-ui:bell"></md-icon>\n                            </md-button>\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.pushToConsole()" aria-label="Push to console" title="Push to console">\n                                <md-icon class="f18" md-svg-icon="primo-ui:open-in-new"></md-icon>\n                            </md-button>\n                        </div>\n                    </md-toolbar>\n                    <section style="background-color:#eee;">\n                        <div layout="row" layout-align="center center">\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.selectedComponentElementPrev()" aria-label="Previous element" title="Previous element">\n                                <md-icon class="f18" md-svg-icon="primo-ui:chevron-left"></md-icon>\n                            </md-button>\n                            <div layout-align="center center">\n                                <div>{{$ctrl.selectedComponentElementIdx+1}}/{{$ctrl.selectedComponentElementCount}}</div>\n                            </div>\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.selectedComponentElementNext()" aria-label="Next element" title="Next element">\n                                <md-icon class="f18" md-svg-icon="primo-ui:chevron-right"></md-icon>\n                            </md-button>\n                        </div>\n                        <div layout="row" layout-align="center center">\n                            <input flex style="font-size:10px;text-align:center;" type="text" name="" value="{{$ctrl.selectedComponentElement.cssPath}}">\n                        </div>\n                    </section>\n                    <section>\n                        <md-list>\n                          <md-list-item ng-repeat="property in $ctrl.selectedComponentElementProperties" ng-click="$ctrl.loadComponentService(property);$event.stopPropagation();">\n                            <span ng-class="{peNotSelectable: property.value!=\'e\'}">{{property.key}}:</span>\n                            <span ng-class="{peNotSelectable: property.value!=\'e\'}" class="md-secondary" style="overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{{property.value}}</span>\n                          </md-list-item>\n                        </md-list>\n                    </section>\n                </section>\n            </div>\n\n            <div flex id=\'pe-components-detail-service\' ng-show=\'$ctrl.selectedComponentElementServiceShow\'>\n              <section style=\'height:100%\'>\n                  <md-toolbar class=\'md-hue-2\' style="font-size: 0.8em;min-height: 2.5em;height:2.5em;">\n                      <div class="md-toolbar-tools" style="font-size: 0.8em;min-height: 2.5em;height:2.5em;">\n\n                          <md-button class=\'md-icon-button\' ng-click="$ctrl.selectedComponentElementServiceShow = false;$ctrl.selectedComponentDetailShow=true;" aria-label="Back" title="Back">\n                              <md-icon class="f18" md-svg-icon="primo-ui:chevron-left"></md-icon>\n                          </md-button>\n\n                            <h2 flex md-truncate>{{$ctrl.selectedComponentElementServiceName}}</h2>\n                      </div>\n                  </md-toolbar>\n                  <section>\n                      <md-list>\n                        <md-list-item ng-repeat="property in $ctrl.selectedComponentElementServiceProperties">\n                          <span ng-class="{peNotSelectable: property.value!=\'e\'}">{{property.key}}:</span>\n                          <span ng-class="{peNotSelectable: property.value!=\'e\'}" class="md-secondary" style="overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{{property.value}}</span>\n                        </md-list-item>\n                      </md-list>\n                  </section>\n              </section>\n            </div>\n        </section>\n    </md-sidenav>\n</div>\n');
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
      if (!this.scope.$$phase) {
        this.scope.$apply();
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.active = false;
      if (!this.scope.$$phase) {
        this.scope.$apply();
      }
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.active = !this.active;
      if (!this.scope.$$phase) {
        this.scope.$apply();
      }
    }
  }]);

  return Ui;
}();

exports.default = Ui;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _components = require('./explore/components');

var _components2 = _interopRequireDefault(_components);

var _helper = require('./explore/helper');

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
                    return _helper2.default.userSessionManagerService().searchStateService.resultObject.facets;
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

},{"./explore/components":4,"./explore/helper":5}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _components = require('./explore/components');

var _components2 = _interopRequireDefault(_components);

var _helper = require('./explore/helper');

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
                    return _helper2.default.userSessionManagerService().searchStateService.resultObject.data;
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

},{"./explore/components":4,"./explore/helper":5}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helper = require('./explore/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User() {
  var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { details: {}, fines: {} };

  _classCallCheck(this, User);

  var uSms = _helper2.default.userSessionManagerService();
  var jwtData = _helper2.default.jwtData();
  var self = this;

  return {
    id: jwtData.user || '',
    email: user.details.email || '-',
    name: jwtData.userName || 'Guest',
    display_name: uSms.getUserNameForDisplay(),
    isLoggedIn: function isLoggedIn() {
      return uSms.getUserName().length > 0;
    },
    isOnCampus: function isOnCampus() {
      return jwtData.onCampus == "true" ? true : false;
    },
    fines: user.fines
  };
};

exports.default = User;

},{"./explore/helper":5}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helper = require('./explore/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function View() {
  _classCallCheck(this, View);

  var uSms = _helper2.default.userSessionManagerService();
  var jwtData = _helper2.default.jwtData();

  return {
    code: jwtData.viewId || window.appConfig['vid'],
    institution: {
      code: jwtData.viewInstitutionCode,
      name: window.appConfig['primo-view']['attributes-map'].institution
    },
    interfaceLanguage: uSms.getUserLanguage() || window.appConfig['primo-view']['attributes-map'].interfaceLanguage,
    ip: {
      address: jwtData.ip
    }
  };
};

exports.default = View;

},{"./explore/helper":5}],11:[function(require,module,exports){
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

},{}]},{},[1]);
