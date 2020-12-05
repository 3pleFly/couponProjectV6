// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const authorization = 'Authorization';
export const baseUrl = 'http://localhost:8080';
export const emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
export const notChooseCategoryRegEx = '^((?!Choose Category).)*$';
export const notChooseCouponRegEx = '^((?!Choose Coupon).)*$';
export const notChooseCustomerRegEx = '^((?!Choose Customer).)*$';
export const notChooseCompanyRegEx = '^((?!Choose Company).)*$';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
