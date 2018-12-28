import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { Observable } from 'rxjs';
import { apiMiddleUrl } from '../../app/app.constants';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage'


/*
  Generated class for the ConferencesProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConferencesProvider extends BaseService{

	//private schedules_path:string = '/conferencias/serviceSchedule';
	private list_conference_path:string = '/conferencias/serviceSchedule';
	private schdls_list_app_path:string = '/conferencias/serviceListScheduleApp';
	private schedule_path:string = '/conferencias/SrvScheduleByUID';
	private addConference_path:string = '/api/servicios/mis_conferencias';
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
	
	//private path:string = '/assets/mock/events.json';

	public getConferences(id_evento): Observable<any> {
		console.log(`getConferences()`)
		//return this.get(`${this.schedules_path}/${id_evento}/${this.language}`);
		return this.get(`${this.schdls_list_app_path}/${id_evento}/${this.language}`);
	}

	public getListConferences(id_evento): Observable<Conference> {
		console.log(`getConferences()`)
		return this.get(`${this.list_conference_path}/${id_evento}/${this.language}`);
	}

	public getConference(id_evento): Observable<Conference> {
		console.log(`getConference()`)
		return this.get(`${this.schedule_path}/${id_evento}/${this.language}`);
	}

	public userAddConference(body) {
		console.log(`body(${body}): `,body)
		console.log('URL =>',apiMiddleUrl + this.addConference_path);
		return this.post( apiMiddleUrl + this.addConference_path , body, {})
	}

	public userGetConference(body) {
		console.log(`body(${body}): `,body)
		return this.post( apiMiddleUrl + this.addConference_path+"/get" , body, {})
	}

	public userDeleteConference(body) {
		console.log(`body(${body}): `,body)
		console.log(apiMiddleUrl + this.addConference_path+"/delete/"+ body.id)
		return this.post( apiMiddleUrl + this.addConference_path+"/delete/"+ body.id , body, {})
	}

	setLanguage( language ){
		this.language = language
	}
	

}

class Conference{

}
