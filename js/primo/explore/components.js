var cssSelectorGenerator = new(require('../../vendor/css-selector-generator.js')).CssSelectorGenerator;

import Helper from './helper'

class Component {
  constructor(element){
    this.element = element;
  }

  blink(){
    Helper.blink(this);
  }

  get cssPath(){
    return cssSelectorGenerator.getSelector(this.element);
  }

  get name(){
    return this.element.localName;
  }

  scope(){
    if (Helper.isDebugEnabled()){
      return angular.element(this.element).scope();
    } else {
      console.error('Please run "angular.reloadWithDebugInfo()" first');
    }
  }

  ctrl(){
    let c = angular.element(this.element).controller(this.name);
    if (c) {
      return c;
    } else {
      console.log('using alternative method to get controller');
      let scope = this.scope();
      if (scope) {
        let scopeChild = scope.$$childTail;
        if (Object.keys(scope).includes('$ctrl')) {
            return scope.$ctrl
        } else if(Object.keys(scope).includes('ctrl')) {
            return scope.ctrl
        } else if (scopeChild && Object.keys(scopeChild).includes('$ctrl')){
            return scopeChild.$ctrl;
        } else if (scopeChild && Object.keys(scopeChild).includes('ctrl')){
            return scopeChild.ctrl;
        } else {
            console.error('No $ctrl defined');
        }
      }
    }

    return null;
  }
}

export default class Components {
  constructor(){

      this._components = {};
  }

  add(selector) {
    let elements = Helper.querySelectorAll(selector);
    let elementsArray = this._components[selector] || [];

    elements.forEach((element)=>{
      elementsArray.push(new Component(element));
    });

    this._components[selector] = elementsArray;

    return elementsArray;
  }

  get(selector) {
    return this._components[selector] || null;
  }

  keys(){
    return Object.keys(this._components);
  }

}
