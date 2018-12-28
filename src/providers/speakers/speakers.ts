import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { Observable } from 'rxjs';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage'

/*
  Generated class for the SpeakersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpeakersProvider extends BaseService {

  private expositores_path:string = '/expositores-module/servicio/expositores';
  private expositor_path:string = '/expositores-module/servicio/expositor';
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
  
  public getSpeakers(id_evento): Observable<Speaker[]> {

    console.log(`getSpeakers()`)
    return this.get(`${this.expositores_path}/${id_evento}/${this.language}`);
    
  }

  public getSpeaker(id_evento): Observable<Speaker> {

    console.log(`getSpeaker()`)
    return this.get(`${this.expositor_path}/${id_evento}/${this.language}`);

  }

  setLanguage( language ){
		this.language = language
  }
  
  public getSpeakersPaged(id_evento, page:number, sort:string): Observable<Speaker[]> {
		console.log(`getSpeakersPaged()`)
		return this.get(`${this.expositores_path}Page/${id_evento}/${this.language}?page=${page}&sort=${sort}`);
	}

}

class Speaker {

}
