import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { Observable } from 'rxjs';
import { Http } from '@angular/http'	
import { Storage } from '@ionic/storage'

/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider extends BaseService{

  private news_path:string = '/eventos-module/servicio/newsEventByEvent';
  private news_detail_path:string = '/eventos-module/servicio/detailEventNew';
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
  
  public getNews(id_evento): Observable<News[]> {
    console.log(`getNews()`);
    return this.get(`${this.news_path}/${id_evento}/${this.language}`);
  }

  public getNewsDetail(id_news): Observable<News> {
    console.log(`getNewsDetail()`);
    return this.get(`${this.news_detail_path}/${id_news}/${this.language}`);
  }

  setLanguage( language ){
		this.language = language
  }
  
  public getNewsPaged(id_evento, page:number, sort:string): Observable<News[]> {
		console.log(`getNewsPaged()`)
		return this.get(`${this.news_path}Page/${id_evento}/${this.language}?page=${page}&sort=${sort}`);
	}

}

class News{

}