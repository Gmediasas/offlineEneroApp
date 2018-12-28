import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { Observable } from 'rxjs';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage'


@Injectable()
export class TouristappProvider extends BaseService {

  private language:string = 'es';
  public tourist_path:string="https://touristapp.co/ciudades/servicios/listados";
  public tourist_pathDetalle:string="https://touristapp.co/ciudades/servicios/detalle";


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
  

  public getTourist( id_pais ): Observable<any[]> {
    return this.getNoBase(`${this.tourist_path}/${id_pais}/${this.language}`);
  }

  public getTouristDetalle( id_ciudad ): Observable<any[]> {
    return this.getNoBase(`${this.tourist_pathDetalle}/${id_ciudad}/${this.language}`);
  }



}


