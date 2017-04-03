import Helper from '../helper'

export default class Session {
    constructor() {
        return this._data;
    }

    get _data() {
        let data = {}
        let uSms = Helper.userSessionManagerService;
        if (uSms) {
            let jwtData = uSms.jwtUtilService.getDecodedToken();
            data = {
                id: jwtData.jti,
                view: {
                    code: jwtData.viewId,
                    institution: {
                        code: jwtData.viewInstitutionCode || window.appConfig['vid'],
                        name: window.appConfig['primo-view']['attributes-map'].institution
                    },
                    interfaceLanguage: ''
                },
                ip: {
                    address: jwtData.ip
                },
                user: {
                    id: jwtData.user || '',
                    email: '',
                    name: jwtData.userName || 'Guest',
                    isLoggedIn: function() {
                        return uSms.getUserName().length > 0
                    },
                    isOnCampus: function() {
                        return jwtData.onCampus == "true" ? true : false
                    }
                }
            }

            //$localForage.getItem('userDetails').then(function(data) {
            //    vm.view.interfaceLanguage = data ? data.interfaceLanguage : '';
            //    vm.user.email = data ? data.email : '';
            //});
            return data;
        }
    }
}
