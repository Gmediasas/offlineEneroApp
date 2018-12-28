import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { Observable } from 'rxjs'
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage'

/*
  Generated class for the InteractiveMapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InteractiveMapProvider extends BaseService{

  private maps_path: string = '/eventos-module/servicio/mapaInteractivo'
  private map_detail_path: string = '/eventos-module/servicio/servicioDetalleMapaInteractivo'
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

  public getInteractiveMap(id_evento): Observable<InteractiveMap[]> {
    console.log(`getInteractiveMap()`)
    return this.get(`${this.maps_path}/${id_evento}/${this.language}`);
  }

  public getInteractiveMapDetail(id_evento): Observable<InteractiveMap> {
    console.log(`getInteractiveMap()`)
    return this.get(`${this.map_detail_path}/${id_evento}/${this.language}`);
  }

  setLanguage( language ){
    this.language = language
  }


}

class InteractiveMap{

}
