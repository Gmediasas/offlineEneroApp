import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs'
import { Storage } from '@ionic/storage'

//Base provider
  import { BaseService } from '../base.service'
  import { apiMiddleUrl } from '../../app/app.constants'
//Constants
  import { appToken } from '../../app/app.constants'
//Models
  import { Survey } from '../../models/survey'

/*
  Generated class for the SurveyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SurveyProvider extends BaseService {

  protected apiMiddleUrl:string = apiMiddleUrl
  private surveys_path:string = '/encuestas/servicios'
  private surveys_response_path:string = '/api/servicios/mis_encuestas/get'
  private response_question_path:string = '/api/servicios/mis_encuestas'
  private language:string = 'es'

	constructor(
		http: Http,
		public storage: Storage,
	){
		super(http)

		this.storage.get('default_lang').then((default_lang) => {

			if( default_lang != undefined && default_lang != null ){
			  this.language = default_lang
			}
	  
		})

	}

  
  public getSurveys(id_evento): Observable<Survey[]> {

    return this.get(`${this.surveys_path}/${id_evento}/lists/${this.language}`);
    
  }

  public getSurvey(id_evento,id_survey): Observable<Survey> {

    return this.get(`${this.surveys_path}/${id_evento}/${id_survey}/${this.language}`);
    
  }

  public getSurveyResponse( survey_id, access_token ){

    let body = {
      api_token: appToken,
      token_app: access_token,
      idEncuesta: survey_id 
    }
    
    return this.post( this.apiMiddleUrl + this.surveys_response_path , body, {})
    
  }

  public createResponseQuestion( survey_id, question_id, respuesta, current_event, access_token  ){

    let body = {
      api_token: appToken,
      token_app: access_token,
      idEvento: current_event,
      idPregunta: question_id,
      respuesta: respuesta, 
      idEncuesta: survey_id 
    }
    
    return this.post( this.apiMiddleUrl + this.response_question_path , body, {})

  }

  setLanguage( language ){
		this.language = language
	}

}
