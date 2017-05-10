import Helper from './explore/helper'

export default class View {
    constructor() {
      let uSms = Helper.userSessionManagerService();
      let jwtData = Helper.jwtData();

      return {
        code: jwtData.viewId || window.appConfig['vid'],
        institution: {
            code: jwtData.viewInstitutionCode,
            name: window.appConfig['primo-view']['attributes-map'].institution
        },
        interfaceLanguage: uSms.getUserLanguage() || window.appConfig['primo-view']['attributes-map'].interfaceLanguage,
        ip: {
          address: jwtData.ip
        }
      }
    }
}
