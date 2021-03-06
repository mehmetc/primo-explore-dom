import Helper from './explore/helper'

export default class User {
  constructor(user = _skelUser) {
    let uSms = Helper.userSessionManagerService();
    let jwtData = Helper.jwtData();
    let self = this;

    return {
        id: jwtData.user || '',
        email: user.details.email || '',
        name: jwtData.userName || 'Guest',
        display_name: uSms.getUserNameForDisplay(),
        isLoggedIn: () => uSms.getUserName().length > 0,
        isOnCampus: () => jwtData.onCampus == "true" ? true : false,
        fines: user.fines,
        loans: user.loans
      };
  }

  get _skelUser() {
    return {
      details: {},
      fines: {},
      loans: {}
    }
  }
}
