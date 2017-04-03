import Components from './explore/components'
import Records from './explore/records'
import Facets from './explore/facets'
import Session from './explore/session'
import Helper from './helper'

//this is proxy class
export default class Explore {
  static get components(){
    let c = new Components();
    Helper.componentNames.forEach((selector) => {
      c.add(selector);
    })

    return c;
  }

  static get records(){
    return new Records(this.components);
  }

  static get facets(){
    return new Facets(this.components);
  }

  static get session(){
    return new Session();
  }
}
