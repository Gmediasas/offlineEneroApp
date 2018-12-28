import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { baseUrl } from '../../app/app.constants';
import { apiMiddleUrl } from '../../app/app.constants';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage'

/*
  Generated class for the ConferencesProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestionsProvider extends BaseService{

	private get_questions_path:string = '/api/servicios/mis_preguntas/get';
	private add_questions_path:string = '/api/servicios/mis_preguntas';
	private getPoll_path:string = '/api/servicios/mis_conferencias';
	private language:string = 'es';

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

	public getPollByConference(idEvent: String, idConference:String, body) {
		console.log(`body(${body}): `,body)
		return this.post( baseUrl + this.getPoll_path + "/" + idEvent + "/" + idConference +"/" + this.language, body, {})
	}

	// public getQuestions(idEvent, idConference, body): Observable<Question> {
	// 	console.log(`getQuestions()`)
	// 	console.log(`body(${body}): `,body)
	// 	console.log('URL =>',apiMiddleUrl + this.get_questions_path);
	// 	//return this.get(`${this.get_questions_path}/${id_evento}/${this.language}`);
	// 	//return this.post( apiMiddleUrl + this.get_questions_path + "/" + idEvent + "/" + idConference +"/" + this.language, {'idEvent': idEvent, 'idConference': idConference}, {})
	// 	return this.post( apiMiddleUrl + this.get_questions_path, body, {})
	// }

	public getQuestions(body) {
		console.log(`body(${body}): `,body)
		console.log('URL =---->',apiMiddleUrl + this.get_questions_path);
		return this.post( apiMiddleUrl + this.get_questions_path , body, {})
	}

	public addQuestion(body) {
		console.log(`body(${body}): `,body)
		console.log('URL =---->',apiMiddleUrl + this.get_questions_path);
		return this.post( apiMiddleUrl + this.add_questions_path , body, {})
	}

	setLanguage( language ){
		this.language = language
	}
	
}
