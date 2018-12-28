import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { Observable } from 'rxjs';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage'

/*
  Generated class for the StaticMapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StaticMapProvider extends BaseService {

  private maps_path: string = '/eventos-module/servicio/placesByEvent'
  private map_path: string = '/eventos-module/servicio/detailPlaceEvent'
  private language: string = 'es';

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
  
  public getMap(id_map): Observable < StaticMap > {
    console.log(`getMap()`)
    return this.get(`${this.map_path}/${id_map}/${this.language}`);
  }

  public getStaticMaps(id_evento): Observable < StaticMap[] > {
    console.log(`getStaticMaps()`)
    return this.get(`${this.maps_path}/${id_evento}/${this.language}`);
  }

  setLanguage( language ){
		this.language = language
  }
  
}

class StaticMap {

}

