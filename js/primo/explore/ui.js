export default class Ui {
  constructor() {
    let vmUi = this;
    //vmUi.active = false;
    vmUi._injectDOMElement();
    vmUi.module = vmUi._createModule();

    angular.bootstrap(document.querySelector('#explorerUi'), ['explorerUi']);
    vmUi.scope = angular.element(document.querySelector('#explorerUi')).scope();
  }

  _createModule() {
    let vmUi = this;
    return angular.module("explorerUi", ['ngMaterial', 'angularLoad'])
      .component("explorerUi", {
        templateUrl: 'nuDashboard.html',
        controller: ['$http', '$scope', function($http, $scope) {
          let ctrl = this;
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

          ctrl.loadComponent = function(name) {
            let c = Primo.explore.components.get(name);
            if (c && c.length > 0) {
              ctrl.selectedComponent = c;
              ctrl.selectedComponentName = name;
              ctrl.loadComponentElement(0);
              ctrl.selectedComponentDetailShow = true;
            } else {
              ctrl.selectedComponent = null;
            }
          }

          ctrl.loadComponentElement = function(index) {
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
          }

          ctrl.selectedComponentElementService = null;
          ctrl.selectedComponentElementServiceName = null;
          this.selectedComponentElementServiceShow = false;
          this.selectedComponentElementServiceProperties = {}

          ctrl.loadComponentService = function(service) {
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
          }

          ctrl.refreshComponents = function() {
            ctrl.components = Primo.explore.components.keys();
          }

          ctrl.isActive = function() {
            return vmUi.active;
          }

          ctrl.toggle = function() {
            vmUi.toggle();
            ctrl.refreshComponents();
          }

          ctrl.selectedComponentElementCtrlKeys = function() {
            let sce = [];
            if (ctrl.selectedComponentElement) {
              let selectedCtrl = ctrl.selectedComponentElement.ctrl();
              if (selectedCtrl) {
                sce = parseObject(selectedCtrl);
              }
            }
            return sce;
          }

          function parseObject(selectedCtrl) {
            let sce = [];
            for (let key of Object.keys(selectedCtrl)) {
              if (selectedCtrl.hasOwnProperty(key)) {
                switch (typeof(selectedCtrl[key])) {
                  case 'string':
                    sce.push({
                      key: key,
                      value: `"${selectedCtrl[key]}"`,
                      type: 'string'
                    });
                    break;
                  case 'boolean':
                    sce.push({
                      key: key,
                      value: `${selectedCtrl[key]}`,
                      type: 'boolean'
                    });
                    break;
                  case 'number':
                    sce.push({
                      key: key,
                      value: `${selectedCtrl[key]}`,
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
                        value: `${selectedCtrl[key].constructor.name}`,
                        type: typeof(selectedCtrl[key])
                      });
                    } catch (e) {
                      sce.push({
                        key: key,
                        value: `${typeof(selectedCtrl[key])}`,
                        type: typeof(selectedCtrl[key])
                      });
                    }
                } //switch
              } //if
            } //for
            return sce;
          }


          ctrl.selectedComponentElementPrev = function() {
            if (ctrl.selectedComponentElementIdx > 0) {
              ctrl.selectedComponentElementIdx -= 1;
              ctrl.loadComponentElement(ctrl.selectedComponentElementIdx);
            }
          }

          ctrl.selectedComponentElementNext = function() {
            if (ctrl.selectedComponentElementIdx < ctrl.selectedComponentElementCount - 1) {
              ctrl.selectedComponentElementIdx += 1;
              ctrl.loadComponentElement(ctrl.selectedComponentElementIdx);
            }
          }

          ctrl.blink = function() {
            if (ctrl.selectedComponentElement) {
              console.log(`blinking ${ctrl.selectedComponentName}[${ctrl.selectedComponentElementIdx }]`);
              ctrl.selectedComponentElement.blink();
            }
          }

          ctrl.pushToConsole = function() {
            if (ctrl.selectedComponentElement) {
              let varName = ctrl.selectedComponentName.split('-').map((m, i) => {
                m = m.trim();
                return i == 0 ? m : m[0].toUpperCase() + m.substr(1)
              }).join('');

              setTimeout(`eval("var ${varName}=(Primo.explore.components.get('${ctrl.selectedComponentName}'))[${ctrl.selectedComponentElementIdx }];console.log('access variable through -> ${varName}');")`, 0);
            }
          }

          ctrl.headerMove = function(event) {
            event.stopPropagation();
            event.preventDefault();

            let header = document.querySelector('#explorerUiContainer');

            let originalTop = parseInt(window.getComputedStyle(header).top);
            let mouseDownY = event.clientY;

            let originalLeft = parseInt(window.getComputedStyle(header).left);
            let mouseDownX = event.clientX;

            let dragHeader = function(event) {
              header.style.top = originalTop + event.clientY - mouseDownY + "px";
              header.style.left = originalLeft + event.clientX - mouseDownX + "px";
              event.stopPropagation();
            }

            let dropHeader = function(event) {
              header.removeEventListener('mousemove', dragHeader, true);
              header.removeEventListener('mouseup', dropHeader, true);
              event.stopPropagation();
            }

            header.addEventListener('mouseup', dropHeader, true);
            header.addEventListener('mousemove', dragHeader, true);
          }
        }]
      }).config(function($mdIconProvider) {
        $mdIconProvider.iconSet('primo-ui', 'img/svg/svg-primo-ui.svg', 18);
      }).run(function($templateCache) {$templateCache.put('nuDashboard.html','<style>\n    .f18 {\n        min-height: 18px;\n        min-width: 18px;\n        height: 18px;\n        width: 18px;\n    }\n\n    .peNotSelectable {\n      color:#aaaaaa;\n    }\n</style>\n<!-- $mdMedia(\'gt-md\') -->\n<div id=\'explorerUiContainer\' ng-show="$ctrl.isActive()" style=\'position:absolute;top:10px;height:90vh;background-color:white;z-index:1000000;\'>\n    <md-sidenav class="md-sidenav-left" md-component-id="primo-explorer" md-is-locked-open="true" md-whiteframe="4" style="height:100%;">\n        <header id=\'explorerUiHeader\' ng-mousedown=\'$ctrl.headerMove($event)\'>\n            <md-toolbar>\n                <div class="md-toolbar-tools">\n                    <div flex layout=\'column\'>\n                      <h2 flex md-truncate>PrimoExplorer</h2>\n                      <div style="font-size:x-small">{{$ctrl.version}}</div>\n                    </div>\n                    <md-button class=\'md-icon-button\' ng-click="$ctrl.toggle()" aria-label="Close" title=\'Close\'>\n                        <md-icon md-svg-icon="primo-ui:close"></md-icon>\n                    </md-button>\n                </div>\n            </md-toolbar>\n        </header>\n\n        <section id=\'pe-components\'>\n            <div flex id=\'pe-components-list\' ng-hide=\'$ctrl.selectedComponentDetailShow || $ctrl.selectedComponentElementServiceShow\'>\n                <section style=\'background-color:#eee;\'>\n                    <div layout=\'row\'>\n                        <md-button ng-click=\'$ctrl.refreshComponents()\'>Reload</md-button>\n                        <md-input-container flex md-no-float>\n                            <label>Filter</label>\n                            <input ng-model="$ctrl.componentFilter">\n                        </md-input-container>\n                    </div>\n                </section>\n                <md-content style="height:90%;">\n                    <md-list class="md-dense">\n                        <md-list-item ng-repeat="component in $ctrl.components | filter:$ctrl.componentFilter" ng-click="$ctrl.loadComponent(component);$event.stopPropagation();">\n                            <span>{{component}}</span>\n                            <md-divider ng-if="!$last"></md-divider>\n                        </md-list-item>\n                    </md-list>\n                </md-content>\n            </div>\n\n            <div flex id=\'pe-components-detail\' ng-show=\'$ctrl.selectedComponentDetailShow\'>\n                <section style=\'height:100%\'>\n                    <md-toolbar class=\'md-hue-2\' style="font-size: 0.8em;min-height: 2.5em;height:2.5em;">\n                        <div class="md-toolbar-tools" style="font-size: 0.8em;min-height: 2.5em;height:2.5em;">\n\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.selectedComponentDetailShow = false" aria-label="Back" title="Back">\n                                <md-icon class="f18" md-svg-icon="primo-ui:chevron-left"></md-icon>\n                            </md-button>\n\n                              <h2 flex md-truncate>{{$ctrl.selectedComponentName}}</h2>\n\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.blink()" aria-label="Blink component" title="Blink component">\n                                <md-icon class="f18" md-svg-icon="primo-ui:bell"></md-icon>\n                            </md-button>\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.pushToConsole()" aria-label="Push to console" title="Push to console">\n                                <md-icon class="f18" md-svg-icon="primo-ui:open-in-new"></md-icon>\n                            </md-button>\n                        </div>\n                    </md-toolbar>\n                    <section style="background-color:#eee;">\n                        <div layout="row" layout-align="center center">\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.selectedComponentElementPrev()" aria-label="Previous element" title="Previous element">\n                                <md-icon class="f18" md-svg-icon="primo-ui:chevron-left"></md-icon>\n                            </md-button>\n                            <div layout-align="center center">\n                                <div>{{$ctrl.selectedComponentElementIdx+1}}/{{$ctrl.selectedComponentElementCount}}</div>\n                            </div>\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.selectedComponentElementNext()" aria-label="Next element" title="Next element">\n                                <md-icon class="f18" md-svg-icon="primo-ui:chevron-right"></md-icon>\n                            </md-button>\n                        </div>\n                        <div layout="row" layout-align="center center">\n                            <input flex style="font-size:10px;text-align:center;" type="text" name="" value="{{$ctrl.selectedComponentElement.cssPath}}">\n                        </div>\n                    </section>\n                    <section>\n                        <md-list>\n                          <md-list-item ng-repeat="property in $ctrl.selectedComponentElementProperties" ng-click="$ctrl.loadComponentService(property);$event.stopPropagation();">\n                            <span ng-class="{peNotSelectable: property.value!=\'e\'}">{{property.key}}:</span>\n                            <span ng-class="{peNotSelectable: property.value!=\'e\'}" class="md-secondary" style="overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{{property.value}}</span>\n                          </md-list-item>\n                        </md-list>\n                    </section>\n                </section>\n            </div>\n\n            <div flex id=\'pe-components-detail-service\' ng-show=\'$ctrl.selectedComponentElementServiceShow\'>\n              <section style=\'height:100%\'>\n                  <md-toolbar class=\'md-hue-2\' style="font-size: 0.8em;min-height: 2.5em;height:2.5em;">\n                      <div class="md-toolbar-tools" style="font-size: 0.8em;min-height: 2.5em;height:2.5em;">\n\n                          <md-button class=\'md-icon-button\' ng-click="$ctrl.selectedComponentElementServiceShow = false;$ctrl.selectedComponentDetailShow=true;" aria-label="Back" title="Back">\n                              <md-icon class="f18" md-svg-icon="primo-ui:chevron-left"></md-icon>\n                          </md-button>\n\n                            <h2 flex md-truncate>{{$ctrl.selectedComponentElementServiceName}}</h2>\n                      </div>\n                  </md-toolbar>\n                  <section>\n                      <md-list>\n                        <md-list-item ng-repeat="property in $ctrl.selectedComponentElementServiceProperties">\n                          <span ng-class="{peNotSelectable: property.value!=\'e\'}">{{property.key}}:</span>\n                          <span ng-class="{peNotSelectable: property.value!=\'e\'}" class="md-secondary" style="overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{{property.value}}</span>\n                        </md-list-item>\n                      </md-list>\n                  </section>\n              </section>\n            </div>\n        </section>\n    </md-sidenav>\n</div>\n');});
      



  }

  _injectDOMElement() {
    let div = document.createElement('div');
    div.setAttribute('id', 'explorerUi');
    div.innerHTML = "<explorer-ui></explorer-ui>";

    //document.querySelector('primo-explore').appendChild(div);
    document.body.appendChild(div);
  }

  show() {
    this.active = true;
    if(!this.scope.$$phase) {
      this.scope.$apply();
    }
  }

  hide() {
    this.active = false;
    if(!this.scope.$$phase) {
      this.scope.$apply();
    }
  }

  toggle() {
    this.active = !this.active;
    if(!this.scope.$$phase) {
      this.scope.$apply();
    }
  }
}
