import Components from './explore/components'
import Helper from './explore/helper'

export default class Records {
    constructor(components) {
      return this._items(components);
    }
    _items(components) {
        try {
            if (components) {
                let c = components.get('prm-search-result-list-after');
                if (c && c.length > 0) {
                    let ctrl = c[0].ctrl();
                    if (ctrl) {
                        return ctrl.itemlist;
                    }
                    throw "try again";
                }
            }
        } catch (e) {
          console.log('trying to get records through the rootScope');
          try {
              return Helper.userSessionManagerService().searchStateService.resultObject.data;
          } catch(e) {
              console.error('unable to retrieve items');
          }
        }

        return [];
    }
}
