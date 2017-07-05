import Components from './explore/components'
import Helper from './explore/helper'

//this is proxy class
export default class Explore {
  static get components() {
    let c = new Components();
    Helper.componentNames.forEach((selector) => {
      c.add(selector);
    })

    return c;
  }

  static get ui() {
    if (this._ui === undefined) {
      console.error('This is a stub function call "angular.reloadWithDebugInfo()" to activate UI');
    }
    return this._ui;
  }

  static get helper() {
    return Helper;
  }
}
