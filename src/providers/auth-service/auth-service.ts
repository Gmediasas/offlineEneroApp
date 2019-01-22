import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { Storage } from '@ionic/storage'
import { BaseService } from '../base.service'
import { apiMiddleUrl } from '../../app/app.constants'
import { appToken } from '../../app/app.constants'
import { User } from '../../models/user.class'

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider extends BaseService {

  credenciales: string;

  protected apiMiddleUrl: string = apiMiddleUrl
  private login_path: string = '/api/servicios/asistentes/login'
  public changePassword_path: string = '/api/servicios/asistentes/change_password';
  public restorePasswo_path: any = "/api/servicios/asistentes/change_random_password";

  currentUser: User

  constructor(http: Http, private storage: Storage) {
    super(http)
  }

  public login(credentials) {

    //console.log("Login..")

    let body = {
      api_token: appToken,
      email: credentials.email,
      password: credentials.password
    }

    return this.post(this.apiMiddleUrl + this.login_path, body, {})

  }

  /**
   * Recorre las variables del localstore y las elimina
   */
  public logout() {


    this.storage.forEach((value, key, index) => {

      if (key != "remember_account") {
        this.storage.remove(key);
      }


    })


    return Observable.create(observer => {

      this.currentUser = null
      //delete access_token
      this.storage.set('access_token', null)
      observer.next(true)
      observer.complete()

    })

  }


  public isAuthenticated() {

    return this.storage.get('access_token')

  }

  changePassword(access_token, new_password) {

    let body = {
      api_token: appToken,
      token_app: access_token,
      new_password: new_password
    }

    return this.post(apiMiddleUrl + this.changePassword_path, body, {})

  }


  restorePass(restoreModel: any) {

    return this.post(apiMiddleUrl + this.restorePasswo_path, restoreModel, {})
  }








}