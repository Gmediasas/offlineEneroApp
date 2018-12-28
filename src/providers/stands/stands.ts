import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { Observable } from 'rxjs';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage'

/*
  Generated class for the StandsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StandsProvider extends BaseService {

	private stands_path:string = '/eventos-module/servicio/standsByEvent';
	private stand_path:string = '/eventos-module/servicio/detailStand';
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
  
	//private path:string = 'assets/mock/events.json';

	public getStands(id_evento): Observable<Stand[]> {
		console.log(`getStands()`)
		return this.get(`${this.stands_path}/${id_evento}/${this.language}`);
	}

	public getStand(id_evento): Observable<Stand[]> {
		console.log(`getStand()`)
		return this.get(`${this.stand_path}/${id_evento}/${this.language}`);
	}

	setLanguage( language ){
		this.language = language
	}

	public getStandsPaged(id_evento, page:number, sort:string): Observable<Stand[]> {
		console.log(`getStandsPaged()`)
		return this.get(`${this.stands_path}Page/${id_evento}/${this.language}?page=${page}&sort=${sort}`);
	}

}

class Stand {

}
