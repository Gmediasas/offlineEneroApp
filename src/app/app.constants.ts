import { environment } from '../environment/environment'

export const baseUrl = environment.apiUrl
export const apiMiddleUrl = environment.apiMiddleUrl
export const appToken = environment.appToken
export const appId = environment.appId
export const defaultLanguage = environment.default_language
export const appAppearance = environment.appAppearance
export const nidevento = environment.nidevento

export const default_image = {
  user: "assets/img/avatar7.png",
}

export const fireBaseConfig = {
  apiKey: "AIzaSyCSfp4ilcPGumhPwm-knc_aBZuNTk9b87s",
  authDomain: "microcode-a7f2b.firebaseapp.com",
  //databaseURL: "https://geventsapp.firebaseio.com",
  projectId: "microcode-a7f2b",
  storageBucket: "microcode-a7f2b.appspot.com",
  messagingSenderId: "589048302344"
}

export const roleNames = {
  superAdmin: 'SuperAdmin',
  admin: 'Admin',
  manager: 'Manager',
  client: 'Client',
}

export const userRoleDefaultPages = {
  SuperAdmin: 'pages/admin/manage',
  Admin: 'pages/admin/dashboard',
  Manager: 'pages/manager/dashboard',
  Client: 'pages/client',
}

// function createUrl(actionName: string): string {
//   return `${environment.apiHost}${actionName}`
// }
// function createAuthUrl(actionName: string): string {
//   return `${environment.apiHost}${actionName}`
// }

// export const appApiResources = {
//   baseUrl: environment.apiHost,
//   staticUploadsPath: `${environment.apiHost}Uploads/`,
//   login: createAuthUrl('user/login'),
//   register: createUrl('user/register'),
//   verifyEmail: createUrl('verifyEmail'),
//   claim: createUrl('claim'),
//   admin: createUrl('admin'),
//   client: createUrl('client'),
//   manager: createUrl('manager'),
//   fileUpload: createUrl('fileUpload'),
//   dashBoard: createUrl('dashboard'),
// }

export const appVariables = {
  userLocalStorage: 'user',
  resourceAccessLocalStorage: 'resourceAccessRaw',
  accessTokenServer: 'X-Auth-Token',
  defaultContentTypeHeader: 'application/json',
  loginPageUrl: '/login',
  registrationPageUrl: '/register',
  errorInputClass: 'has-error',
  successInputClass: 'has-success',
  actionSearchKey: 'Entity',
  resourceActions: {
    getActionName: 'Read',
    addActionName: 'Create',
    updateActionName: 'Update',
    deleteActionName: 'Delete',
  },
  rateUnits: [
    { id: 1, name: 'Hourly' },
    { id: 2, name: 'Monthly' },
    { id: 3, name: 'Annually' },
  ],
  defaultAvatarUrl: 'default_user',
  defaultDdlOptionValue: '-1',
  defaultDdlOptionText: 'Select',
  defaultStateDdlOptionText: 'Select State',
  defaultCityDdlOptionText: 'Select City',
  defaultClientDdlOptionText: 'Select Client',
  defaultRateUnitDdlOptionText: 'Select Unit',
  ng2SlimLoadingBarColor: 'red',
  ng2SlimLoadingBarHeight: '4px',
  accessTokenLocalStorage: 'accessToken',
  resourceNameIdentifier: 'Entity',
  docViewerurl: 'http://docs.google.com/gview?url=',
  msOfficeDocViewerPath: 'https://view.officeapps.live.com/op/embed.aspx?src=',
  goodleDocViewerPath: (url) => {
    return `http://docs.google.com/gview?url=${url}&embedded=true`
  },
}

