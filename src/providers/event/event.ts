import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage'

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider  extends BaseService{

  private path_events_suscriptor:string = '/eventos-module/servicio/eventos-app'; //Eventos de suscriptor
  private path_event:string = '/eventos-module/servicio/evento'; 
  private language:string = 'es';
  // private events:Event[]
 
	constructor(
		http: Http,
		public storage: Storage,
	){
		super(http)

    console.log(`(event.ts) gevents>> EventProvider`)
    
		this.storage.get('default_lang').then((default_lang) => {

			if( default_lang != undefined && default_lang != null ){
			  this.language = default_lang
			}
	  
		})

	}
  // public getAllUsers(): Observable<User[]> {
  //   return this.get(this.relativeUrl);
  // }
  
  // public getUserById(id: number): Observable<User> {
  //   return this.get(`${this.relativeUrl}${id.toString()}`);
  // }

  public getEvent( id_evento ): Observable<GEvent> {
    return this.get(`${this.path_event}/${id_evento}/${this.language}`);
  }

  public getAllEvents(id_sucriptor): Observable <GEvent[]> {
    return this.get(`${this.path_events_suscriptor}/${id_sucriptor}/${this.language}`)
  }
  // public getAllEventsXXX(id_sucriptor) {
  //   console.log(`getAllEvents()`)
  //   return  Observable<GEvent[]>{ return this.get(`${this.path_events_suscriptor}/${id_sucriptor}/${this.language}`)}
  // }

  setLanguage( language ){
		this.language = language
	}

}

class GEvent{

  evntUID:string
  evntSuscriptor:string
  evntSuscriptorUID:string
  evntName:string
  evntDescription:string
  evntStartDate:string
  evntEndDate:string
  evntLogo:string
  evntFlat:string
  evntDomain:string
  evntState:object
  evntContac:string
  evntNumPhone:string
  evntEmail:string
  evntPlace:object
  evntImages:object
  evntVideos:object

  constructor(){

  }

}