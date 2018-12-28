import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { Observable } from 'rxjs';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage'

/*
  Generated class for the SocialNetworksProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocialNetworksProvider extends BaseService{

	private getsocialnetworks_path:string = '/eventos-module/servicio/socialNetworksEventByEvent';
	private getsocialnetwork_path:string = '/eventos-module/servicio/detailEventSocialNetwork';
	private language:string = 'es';

	//private path:string = 'assets/mock/events.json';
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

	public getSocialNetworks(id_evento): Observable<SocialNetwork[]> {
		console.log(`getSocialNetworks()`)
		return this.get(`${this.getsocialnetworks_path}/${id_evento}/${this.language}`);
	}

	public getSocialNetwork(id_social_network): Observable<SocialNetwork[]> {
		console.log(`getSocialNetwork()`)
		return this.get(`${this.getsocialnetwork_path}/${id_social_network}/${this.language}`);
	}

	setLanguage( language ){
		this.language = language
	}

}

class SocialNetwork{

}
