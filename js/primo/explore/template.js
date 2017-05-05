import Helper from './helper'

export default class Template {

  constructor(){
    this.injector = Helper.injector();
    this.templateCache = this.injector.get('$templateCache');
  }

  get(key){
    this.templateCache.get(key);
  }

  replace(elementName, key, value) {
    this.templateCache.put(key,value);
    this._render(elementName);
  }

  _render(elementName) {
    this.injector.invoke(function($compile){
      let element = angular.element(document.querySelector(elementName));
      if (element) {
        let elementScope = element.scope();
        $compile(element)(elementScope);
        elementScope.$apply()
      } else {
        console.error(`${elementName} not found. Render failed`);
      }
    });
  }
}
