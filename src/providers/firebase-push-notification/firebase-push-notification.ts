import { Http} from '@angular/http'
import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { apiMiddleUrl } from '../../app/app.constants'
import { appToken } from '../../app/app.constants'


/*
  Generated class for the FirebasePushNotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebasePushNotificationProvider extends BaseService {

  protected apiMiddleUrl:string = apiMiddleUrl
  private firebase_token_path:string = '/api/servicios/notificaciones/push'

  constructor(
    public http: Http,
  ){
    super(http)
  }

  sendMessageToContact( access_token, id_assistant_receptor,  message, idevento){
    
    let body =  {
      api_token: appToken, //Token conf app
      token_app: access_token, //User token in storage
      body:message,
      idevento:idevento,
      idAsistenteReceptor: id_assistant_receptor,
    }

    return this.post( this.apiMiddleUrl + this.firebase_token_path , body, {})

  }

}
