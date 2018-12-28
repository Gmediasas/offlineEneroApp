import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import 'rxjs/add/operator/map'
import { Storage } from '@ionic/storage'
import { BaseService } from '../base.service'
import { apiMiddleUrl } from '../../app/app.constants'
import { appToken } from '../../app/app.constants'
import { nidevento } from '../../app/app.constants';
import { User } from '../../models/user.class'


/*
  Generated class for the RegisterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegisterProvider extends BaseService {

  protected apiMiddleUrl: string = apiMiddleUrl
  private register_path: string = '/api/servicios/asistentes/suscribe'

  currentUser: User

  constructor(http: Http, private storage: Storage) {
    super(http)
  }

  register(registerModel: any) {


   /* let body = {
      nidevento: nidevento,
      api_token: appToken,
      tipoAsistente: registerModel.user_type,
      tipoDocumento: registerModel.type_identification,
      documento: registerModel.identification,
      nombres: registerModel.first_name,
      apellidos: registerModel.last_name,
      email: registerModel.email,
      password: registerModel.password,
      direccion: registerModel.adress,
      telefono: registerModel.number_phone,
      genero: registerModel.gender,
      estado: registerModel.state,

    }*/

    console.log(registerModel);



    return this.post(apiMiddleUrl + this.register_path, registerModel, {})

  }

}
