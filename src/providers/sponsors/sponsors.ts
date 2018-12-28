import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { Observable } from 'rxjs';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage'

/*
  Generated class for the SponsorsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SponsorsProvider extends BaseService {

  private patrocinadores_path:string = '/patrocinador-module/servicio/patrocinador';
  private patrocinador_path:string = '/patrocinador-module/servicio/patrocinador-descripcion';
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
  
  public getSponsors(id_evento): Observable<Sponsor[]> {
    console.log(`getSponsors()`)
    return this.get(`${this.patrocinadores_path}/${id_evento}/${this.language}`);
  }

  public getSponsor(id_patrocinador): Observable<Sponsor> {

    console.log(`getSponsor()`)
    return this.get(`${this.patrocinador_path}/${id_patrocinador}/${this.language}`);

  }

  setLanguage( language ){
		this.language = language
	}

}

class Sponsor {

}
