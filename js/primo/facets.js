import Components from './explore/components'
import Helper from './explore/helper'

export default class Facets {
    constructor(components) {
      return this._facets(components);
    }
    _facets(components) {
        try {
            if (components) {
                let c = components.get('prm-facet-after');
                if (c && c.length > 0) {
                    let ctrl = c[0].ctrl;
                    return ctrl.facetService.results;
                }
            }
        } catch (e) {
          console.log('trying to get facets through the rootScope');
          try {
              return Helper.userSessionManagerService().searchStateService.resultObject.facets;
          } catch(e) {
              console.error('unable to retrieve facets');
          }
        }

        return [];
    }
}
