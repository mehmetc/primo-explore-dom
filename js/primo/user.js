import Helper from './explore/helper'

export default class User {
  constructor(userDetails = {}) {
    let uSms = Helper.userSessionManagerService();
    let jwtData = Helper.jwtData();
    let self = this;

    return {
        id: jwtData.user || '',
        email: userDetails.email || '-',
        name: jwtData.userName || 'Guest',
        display_name: uSms.getUserNameForDisplay(),
        isLoggedIn: function() {
            return uSms.getUserName().length > 0
        },
        isOnCampus: function() {
            return jwtData.onCampus == "true" ? true : false
        }
      };
  }
}
