// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    ApiURL:'http://localhost:50652/api',
    getImageByName:'http://localhost:50652/',
    employees: 'http://localhost:50652/api/Employees/',
    uploadImage: 'http://localhost:50652/api/EmployeeDocuments/uploadfile/',
    GetEmployeeDocumentsByEmployeeId:"http://localhost:50652/api/EmployeeDocuments/GetEmployeeDocumentsByEmployeeId/",
    getDocname:'http://localhost:50652/api/EmployeeDocuments/getImage'



 // ApiURL:'http://10.10.0.129/HRWeb/api'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
