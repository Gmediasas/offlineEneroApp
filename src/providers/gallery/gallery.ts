import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { Observable } from 'rxjs'
import { Http } from '@angular/http'

import { Storage } from '@ionic/storage'

/*
  Generated class for the GalleryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GalleryProvider extends BaseService{

  private gallery_path:string = '/galerias-module/servicio/imagenes';
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

  public getGallery( id_event ): Observable<any[]> {
    console.log(`getGallery()`);
    return this.get(`${this.gallery_path}/${id_event}/${this.language}`);
	}
	
	setLanguage( language ){
		this.language = language
	}

}