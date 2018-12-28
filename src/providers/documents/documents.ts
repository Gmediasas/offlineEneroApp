import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { Observable } from 'rxjs';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage'

/*
  Generated class for the DocumentsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DocumentsProvider extends BaseService{

	private getDocuments_path:string = '/eventos-module/servicio/eventDocumentsByEvent';
	private getDocument_path:string = '/eventos-module/servicio/detailEventDocument';
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

	public getDocuments(id_evento): Observable<Document[]> {
		console.log(`getDocuments()`)
		return this.get(`${this.getDocuments_path}/${id_evento}/${this.language}`);
	}

	public getDocument(idDoc): Observable<Document> {
		console.log(`getDocument()`)
		return this.get(`${this.getDocument_path}/${idDoc}/${this.language}`);
	}

	setLanguage( language ){
		this.language = language
	}
}

class Document{

}