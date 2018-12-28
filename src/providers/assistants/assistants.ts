import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { apiMiddleUrl } from '../../app/app.constants'
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage'
//Constants
import { appToken } from '../../app/app.constants'

/*
  Generated class for the AssistantsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AssistantsProvider  extends BaseService{

  private get_asistentes_path:string = '/api/servicios/asistentes/getasistentes'
  protected apiMiddleUrl:string = apiMiddleUrl
  protected appToken:string = appToken
  private language:string = 'es'

  constructor(
    private storage: Storage,
		http: Http,
	){

    super(http)
    
    this.storage.get('default_lang').then((default_lang) => {

			if( default_lang != undefined && default_lang != null ){
			  this.language = default_lang
			}
	  
		})

  }
  
  getAsistentes(event_id){

    let body = {

      api_token: this.appToken,
      nidevento: event_id,
      lang: this.language,

    }

    return this.post( this.apiMiddleUrl + this.get_asistentes_path , body, {})

  }

  setLanguage( language ){
		this.language = language
	}

}
