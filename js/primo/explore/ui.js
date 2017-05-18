export default class Ui{
  constructor(){
    let vmUi = this;
    //vmUi.active = false;
    vmUi._injectDOMElement();
    vmUi.module = vmUi._createModule();
    angular.bootstrap(document.querySelector('#explorerUi'), ['explorerUi']);
    vmUi.scope = angular.element(document.querySelector('#explorerUi')).scope();
  }

  _createModule(){
    let vmUi = this;
    return angular.module("explorerUi", ['ngMaterial'])
           .component("explorerUi",{
             templateUrl: 'nuDashboard.html',
             controller:['$http', '$scope', function($http, $scope){
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

               ctrl.loadComponent = function(name){
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

               ctrl.loadComponentElement = function(index){
                 if (ctrl.selectedComponent) {
                   ctrl.selectedComponentElementIdx = index;
                   ctrl.selectedComponentElementCount = ctrl.selectedComponent.length;
                   ctrl.selectedComponentElement = ctrl.selectedComponent[index];
                 } else {
                   ctrl.selectedComponentElementIdx = 0;
                   ctrl.selectedComponentElementCount = 0;
                   ctrl.selectedComponentElement = null;
                 }

               }

               ctrl.refreshComponents = function(){
                 ctrl.components = Primo.explore.components.keys();
               }

               ctrl.isActive = function(){
                 return vmUi.active;
               }

               ctrl.toggle = function() {
                 vmUi.toggle();
                 ctrl.refreshComponents();
               }

               ctrl.selectedComponentElementCtrlKeys = function(){
                 if (ctrl.selectedComponentElement) {
                   let keys = ctrl.selectedComponentElement.ctrl();
                   if (keys) {
                      return Object.keys(keys);
                   }
                 }
                 return [];
               }

               ctrl.selectedComponentElementPrev = function(){
                 if (ctrl.selectedComponentElementIdx > 0){
                   ctrl.selectedComponentElementIdx -= 1;
                   ctrl.loadComponentElement(ctrl.selectedComponentElementIdx);
                 }
               }

               ctrl.selectedComponentElementNext = function(){
                 if (ctrl.selectedComponentElementIdx < ctrl.selectedComponentElementCount-1){
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
           }).config(function($mdIconProvider){
             $mdIconProvider.iconSet('primo-ui', 'img/svg/svg-primo-ui.svg', 18);
           }).run(function($templateCache) {$templateCache.put('nuDashboard.html','<style>\n    .f18 {\n        min-height: 18px;\n        min-width: 18px;\n        height: 18px;\n        width: 18px;\n    }\n</style>\n\n<div id=\'explorerUiContainer\' ng-show="$ctrl.isActive()" style=\'position:absolute;top:10px;height:90vh;background-color:white;z-index:1000000;\'>\n    <md-sidenav class="md-sidenav-left" md-component-id="primo-explorer" md-is-locked-open="$mdMedia(\'gt-md\')" md-whiteframe="4" style="height:100%;">\n        <header id=\'explorerUiHeader\' ng-mousedown=\'$ctrl.headerMove($event)\'>\n            <md-toolbar>\n                <div class="md-toolbar-tools">\n                    <h2 flex md-truncate>PrimoExplorer {{$ctrl.version}}</h2>\n                    <md-button class=\'md-icon-button\' ng-click="$ctrl.toggle()" aria-label="Close" title=\'Close\'>\n                        <md-icon md-svg-icon="primo-ui:close"></md-icon>\n                    </md-button>\n                </div>\n            </md-toolbar>\n        </header>\n\n        <section id=\'pe-components\'>\n            <div flex id=\'pe-components-list\' ng-hide=\'$ctrl.selectedComponentDetailShow\'>\n                <section style=\'background-color:#eee;\'>\n                    <div layout=\'row\'>\n                        <md-button ng-click=\'$ctrl.refreshComponents()\'>Reload</md-button>\n                        <md-input-container flex md-no-float>\n                            <label>Filter</label>\n                            <input ng-model="$ctrl.componentFilter">\n                        </md-input-container>\n                    </div>\n                </section>\n                <md-content style="height:90%;">\n                    <md-list class="md-dense">\n                        <md-list-item ng-repeat="component in $ctrl.components | filter:$ctrl.componentFilter" ng-click="$ctrl.loadComponent(component)">\n                            <span>{{component}}</span>\n                            <md-divider ng-if="!$last"></md-divider>\n                        </md-list-item>\n                    </md-list>\n                </md-content>\n            </div>\n\n            <div flex id=\'pe-components-detail\' ng-show=\'$ctrl.selectedComponentDetailShow\'>\n                <section style=\'height:100%\'>\n                    <md-toolbar class=\'md-hue-2\' style="font-size: 0.8em;min-height: 2.5em;height:2.5em;">\n                        <div class="md-toolbar-tools" style="font-size: 0.8em;min-height: 2.5em;height:2.5em;">\n\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.selectedComponentDetailShow = false" aria-label="Back" title="Back">\n                                <md-icon class="f18" md-svg-icon="primo-ui:chevron-left"></md-icon>\n                            </md-button>\n\n                              <h2 flex md-truncate>{{$ctrl.selectedComponentName}}</h2>\n\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.blink()" aria-label="Blink component" title="Blink component">\n                                <md-icon class="f18" md-svg-icon="primo-ui:bell"></md-icon>\n                            </md-button>\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.pushToConsole()" aria-label="Push to console" title="Push to console">\n                                <md-icon class="f18" md-svg-icon="primo-ui:open-in-new"></md-icon>\n                            </md-button>\n                        </div>\n                    </md-toolbar>\n                    <section style="background-color:#eee;">\n                        <div layout="row" layout-align="center center">\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.selectedComponentElementPrev()" aria-label="Previous element" title="Previous element">\n                                <md-icon class="f18" md-svg-icon="primo-ui:chevron-left"></md-icon>\n                            </md-button>\n                            <div layout-align="center center">\n                                <div>{{$ctrl.selectedComponentElementIdx+1}}/{{$ctrl.selectedComponentElementCount}}</div>\n                            </div>\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.selectedComponentElementNext()" aria-label="Next element" title="Next element">\n                                <md-icon class="f18" md-svg-icon="primo-ui:chevron-right"></md-icon>\n                            </md-button>\n                        </div>\n                        <div layout="row" layout-align="center center">\n                          <div flex md-truncate style="font-size:10px;">css({{$ctrl.selectedComponentElement.cssPath}})</div>\n                        </div>\n                    </section>\n                    <section>\n                        <md-list>\n                          <md-list-item ng-repeat="key in $ctrl.selectedComponentElementCtrlKeys()">\n                              {{key}}\n                          </md-list-item>\n                        </md-list>\n                    </section>\n                </section>\n            </div>\n        </section>\n    </md-sidenav>\n</div>\n');});
  }

  _injectDOMElement() {
    let div = document.createElement('div');
    div.setAttribute('id','explorerUi');
    div.innerHTML = "<explorer-ui></explorer-ui>";

    //document.querySelector('primo-explore').appendChild(div);
    document.body.appendChild(div);
  }

  show(){
    this.active = true;
    //this.scope.$apply();
  }

  hide(){
    this.active = false;
    //this.scope.$apply();
  }

  toggle(){
    this.active = !this.active;
    //this.scope.$apply();
  }
}
