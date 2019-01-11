import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { apiMiddleUrl } from '../../app/app.constants'
import { Storage } from '@ionic/storage'
//Constants
  import { appToken } from '../../app/app.constants'
  import { Http } from '@angular/http'


/*
  Generated class for the MyFriendsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyFriendsProvider  extends BaseService{

  protected apiMiddleUrl:string = apiMiddleUrl
  protected appToken:string = appToken
  private my_attendants:string = '/api/servicios/mis_amistades/getasistentes'
  private my_friends_path:string = '/api/servicios/mis_amistades/get_amistades'
  private my_followers_path:string = '/api/servicios/mis_amistades/get_seguidores'
  private my_friends_create_path:string = '/api/servicios/mis_amistades'
  private my_friends_update_path:string = '/api/servicios/mis_amistades/edit'
  private language:string = 'es'

  constructor(
    private storage: Storage,
    http: Http
  ){

    super(http)

    this.storage.get('default_lang').then((default_lang) => {

			if( default_lang != undefined && default_lang != null ){
			  this.language = default_lang
			}
	  
		})

  }

  getMyAttendants( access_token, page? ){

    let body = {

      api_token: this.appToken,
      token_app: access_token

    }

    if( page == undefined){

      return this.post( this.apiMiddleUrl + this.my_attendants , body, {})

    }else{

      return this.post( this.apiMiddleUrl + this.my_attendants+`?page=${page}` , body, {})

    }
     
  }

  getMyFriends( access_token, event_id ){

    let body = {

      api_token: this.appToken,
      token_app: access_token,
      idEvento:event_id, 
      lang: this.language,

    }
    
    return this.post( this.apiMiddleUrl + this.my_friends_path , body, {})

  }

  getMyFollowers( access_token, event_id ){

    let body = {

      api_token: this.appToken,
      token_app: access_token,
      idEvento:event_id, 
      lang: this.language,

    }
    
    return this.post( this.apiMiddleUrl + this.my_followers_path , body, {})

  }

  createFriendRequest(access_token, id_assistant_receptor, event_id){

    let body = {

      api_token: this.appToken,
      token_app: access_token,
      idAsistenteReceptor: id_assistant_receptor,
      idEvento:event_id, 
      lang: this.language,

    }
    console.log(body);
    return this.post( this.apiMiddleUrl + this.my_friends_create_path , body, {})

  }

  updateFriendRequest( access_token, id_assistant_emisor, event_id, friendship_state ){

    let body = {

      api_token: this.appToken,
      token_app: access_token,
      asistente_anonimo: id_assistant_emisor,
      idEvento:event_id, 
      estado:friendship_state, // 'pendiente'|'aceptado'|'declinado'|'bloqueado'
      lang: this.language,

    }
    
    return this.post( this.apiMiddleUrl + this.my_friends_update_path , body, {})

  }

}