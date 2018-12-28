import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
// import { RequestOptions } from '@angular/http'
import { Observable } from 'rxjs'
import { Headers } from '@angular/http'
import { Response } from '@angular/http'
// import { ResponseOptions } from '@angular/http'
import 'rxjs/add/operator/map'
import { baseUrl } from '../app/app.constants'

@Injectable()
export abstract class BaseService {

  protected baseUrl:string = baseUrl
  protected http

  // constructor(private http: Http, private cookieService: CookieService){

  // }
  constructor( http: Http){
    this.http = http
  }


  protected get headers(): Headers {
    /*
    * for example, add an authorization token to each request,
    * take it from some CookieService, for example
    * */
    // const token: string = this.cookieService.get('token')
    const token: string = ''
    return new Headers({token: token})
  }

  protected getNoBase(relativeUrl: string): Observable<any> {

  
   console.log(relativeUrl )
   return this.http.get(relativeUrl)
     .map((res: Response) => {
       return this.handleResponse(res)
     })
     .catch((error: Response) => {

         if (error.status === 404  ) {
             console.log("Not Found")
         }
         console.log("Error: Finish request...")
         try {
           return Observable.throw(error.json().error)
         } catch (ex) {
           try {
             return Observable.throw(error)
           } catch (ex) {
             return Observable.throw(error.toString())
           }
         }

   })

 }

  protected get(relativeUrl: string): Observable<any> {

     // Helper service to start ng2-slim-loading-bar progress bar
    //   this.helperService.startLoader()
    //   return this.http.get(url).map((res: Response) => {
    //     return this.handleResponse(res)
    //   }).catch((error: Response) => Observable.throw(this.errorHandler.tryParseError(error)))
    //     .finally(() => {
    //       // stop ng2-slim-loading-bar progress bar
    //       this.helperService.stopLoader()
    //     })
    // }
   
    console.log( this.baseUrl + relativeUrl )
    return this.http.get( this.baseUrl + relativeUrl)
      .map((res: Response) => {
        return this.handleResponse(res)
      })
      .catch((error: Response) => {

          if (error.status === 404  ) {
              console.log("Not Found")
          }
          console.log("Error: Finish request...")
          try {
            return Observable.throw(error.json().error)
          } catch (ex) {
            try {
              return Observable.throw(error)
            } catch (ex) {
              return Observable.throw(error.toString())
            }
          }

    })



    // return this.http.get( this.baseUrl + relativeUrl, new RequestOptions({headers: this.headers}))
    //   .map(res => res.json())
    // as you see, the simple toJson mapping logic also delegates here
  }

  protected post(relativeUrl: string, data: any, options: any) {

    // and so on for every http method that your API supports

    // this.helperService.startLoader()
    if (options) {
      return this.http.post(relativeUrl, data, options)
        .map((res: Response) => {
          return this.handleResponse(res)
        })
        .catch((error: Response) => Observable.throw(error))
        .finally(() => {
          // this.helperService.stopLoader()
        })
    } else {
      return this.http.post(relativeUrl, data)
        .map((res: Response) => {
          return this.handleResponse(res)
        })
        .catch((error: Response) => Observable.throw(error))
        .finally(() => {
          // this.helperService.stopLoader()
        })
    }

  }

  handleResponse(res: Response) {

    // this.refreshToken(res)
    const data = res.json()

    if (data.error) {
      const error: Error = { name: data.error, message: data.message }
      // throw new Error(this.errorHandler.parseCustomServerErrorToString(error))

      try {
        return Observable.throw(error)
      } catch (ex) {
        try {
          return Observable.throw(error)
        } catch (ex) {
          return Observable.throw(error.toString())
        }
      }

    } else {
      return data
    }
  }

}


// import { Injectable } from '@angular/core'
// import { RequestOptions, Response } from '@angular/http'
// import { Observable } from 'rxjs/Rx'


// import { HttpService } from '../../theme/services/http.service'
// import { Error } from '../interfaces/error.interface'
// import { ServerResponse } from '../interfaces/server-response.interface'
// import { appVariables } from './../../app.constants'
// import { CustomErrorHandlerService } from './custom-error-handler.service'
// import { HelperService } from './helper.service'
// @Injectable()
// export class BaseService {
//   constructor(public http: HttpService, public errorHandler: CustomErrorHandlerService,
//     public helperService: HelperService) {
//   }
//   get(url) {
//     // Helper service to start ng2-slim-loading-bar progress bar
//     this.helperService.startLoader()
//     return this.http.get(url).map((res: Response) => {
//       return this.handleResponse(res)
//     }).catch((error: Response) => Observable.throw(this.errorHandler.tryParseError(error)))
//       .finally(() => {
//         // stop ng2-slim-loading-bar progress bar
//         this.helperService.stopLoader()
//       })
//   }


//   post(url, postBody: any, options?: RequestOptions) {
//     this.helperService.startLoader()
//     if (options) {
//       return this.http.post(url, postBody, options)
//         .map((res: Response) => {
//           return this.handleResponse(res)
//         })
//         .catch((error: Response) => Observable.throw(error))
//         .finally(() => {
//           this.helperService.stopLoader()
//         })
//     } else {
//       return this.http.post(url, postBody)
//         .map((res: Response) => {
//           return this.handleResponse(res)
//         })
//         .catch((error: Response) => Observable.throw(error))
//         .finally(() => {
//           this.helperService.stopLoader()
//         })
//     }


//   }
//   delete(url, postBody: any) {
//     this.helperService.startLoader()
//     return this.http.delete(url).map((res: Response) => {
//       return this.handleResponse(res)
//     }).catch((error: Response) => Observable.throw(error))
//       .finally(() => {
//         this.helperService.stopLoader()
//       })
//   }
//   put(url, putData) {
//     this.helperService.startLoader()
//     return this.http.put(url, putData).map((res: Response) => {
//       return this.handleResponse(res)
//     }).catch((error: Response) => Observable.throw(error))
//       .finally(() => {
//         this.helperService.stopLoader()
//       })
//   }


//   upload(url: string, file: File) {
//     const formData: FormData = new FormData()
//     if (file) {
//       formData.append('files', file, file.name)
//     }
//     this.helperService.addContentTypeHeader = false
//     return this.post(url, formData)
//   }


//   formUrlParam(url, data) {
//     let queryString: string = ''
//     for (const key in data) {
//       if (data.hasOwnProperty(key)) {
//         if (!queryString) {
//           queryString = `?${key}=${data[key]}`
//         } else {
//           queryString += `&${key}=${data[key]}`
//         }
//       }
//     }
//     return url + queryString
//   }


//   handleResponse(res: Response): ServerResponse {
//     // My API sends a new jwt access token with each request,
//     // so store it in the local storage, replacing the old one.
//     this.refreshToken(res)
//     const data = res.json()
//     if (data.error) {
//       const error: Error = { error: data.error, message: data.message }
//       throw new Error(this.errorHandler.parseCustomServerErrorToString(error))
//     } else {
//       return data
//     }
//   }


//   refreshToken(res: Response) {
//     const token = res.headers.get(appVariables.accessTokenServer)
//     if (token) {
//       localStorage.setItem(appVariables.accessTokenLocalStorage, `${token}`)
//     }
//   }
// }
