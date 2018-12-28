import { Http} from '@angular/http'
import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { apiMiddleUrl } from '../../app/app.constants'
import { appToken } from '../../app/app.constants'


/*
  Generated class for the FirebaseTokenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseTokenProvider extends BaseService {

  protected apiMiddleUrl:string = apiMiddleUrl
  private firebase_token_path:string = '/api/servicios/asistentes/tokenfire/set'

  constructor(
    public http: Http,
  ){
    super(http)
  }

  createFirebaseToken( access_token, firebase_token){

    console.log(`gevents>> createFirebaseToken( ${access_token}, ${firebase_token} ) `)
    
    let body =  {
      api_token: appToken, //Token conf app
      token_app: access_token, //User token in storage
      token_fire : firebase_token //Token firebase
    }

    return this.post( this.apiMiddleUrl + this.firebase_token_path , body, {})

  }

}
