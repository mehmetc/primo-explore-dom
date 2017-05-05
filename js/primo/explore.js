import Components from './explore/components'
import Helper from './explore/helper'
import Ui from './explore/ui'

//this is proxy class
export default class Explore {
  static get components(){
    let c = new Components();
    Helper.componentNames.forEach((selector) => {
      c.add(selector);
    })

    return c;
  }

  //TODO: extract
  static get ui() {
    if (this._ui === undefined) {
      console.log('Creation UI');
      this._ui = new Ui();
    }
    return this._ui;
  }
}
