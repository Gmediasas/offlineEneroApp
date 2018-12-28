import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { Observable } from 'rxjs';
import { appId } from '../../app/app.constants';
import { AppInstance } from '../../models/app_instance'
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage'

/*
  Generated class for the AppAppearanceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppAppearanceProvider  extends BaseService{

  private app_instance_path:string = '/aplicacion_instancia_module/service';
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
  
  public getAppInstance(): Observable<AppInstance> {
		return this.get(`${this.app_instance_path}/${appId}/${this.language}`);
  }
  
  setLanguage( language ){
    this.language = language
  }


}
