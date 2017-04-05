import Explore from './primo/explore'
import Helper from './primo/helper'
import Ui from './primo/ui'

export default class Primo {
  static isDebugEnabled() {
    return Helper.isDebugEnabled();
  }

  static isPrimoAvailable() {
    return Helper.isPrimoAvailable();
  }

  static get explore() {
    return Explore;
  }

  static get ui(){
    if (this._ui === undefined) {
      console.log('Creation UI');
      this._ui = new Ui();
    }
    return this._ui;
  }

}
