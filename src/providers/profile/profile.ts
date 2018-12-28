import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'
import { apiMiddleUrl } from '../../app/app.constants'
//Constants
  import { appToken } from '../../app/app.constants'

  import { Http } from '@angular/http'

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider extends BaseService{

  protected apiMiddleUrl:string = apiMiddleUrl
  protected appToken:string = appToken
  private profile_path:string = '/api/servicios/my_profile/get';
  private profile_update_path:string = '/api/servicios/my_profile/edit';

  constructor(http: Http){
    super(http)
  }

  public getProfile( access_token ){

    let body = {

      api_token: this.appToken,
      token_app: access_token,

    }
    
    return this.post( this.apiMiddleUrl + this.profile_path , body, {})
    
  }

  public updatetProfile( access_token, ProfileModel ){

    let body = {

      api_token: this.appToken,
      token_app: access_token,
      //User data
        nombres: ProfileModel.name,
        apellidos: ProfileModel.last_name,
        my_profile: ProfileModel.my_profile,
        birth_date: ProfileModel.birth_date,
        country: ProfileModel.country,
        city: ProfileModel.city,
        telefono: ProfileModel.cell_phone,
        genero: ProfileModel.gender,
        // email: ProfileModel.email,
        company: ProfileModel.company,
        position: ProfileModel.position,
        direccion: ProfileModel.address,

    }
    
    return this.post( 
      this.apiMiddleUrl + this.profile_update_path , body, {}
    )
    
  }


}

/*
class Profile{

  photo:string //Foto de perfil
  name:string //Nombre del usuario
  member_since:string //Mienbro desde
  city:string //Ciudad
  country:string //Pais
  my_profile:string //Mi perfil (texarea)
  birth_date:string //Fecha de nacimiento
  cell_phone:string //Numero de celular
  gender:string //Genero
  email:string //Email
  company:string //Company
  position:string //Cargo
  address:string //Direccion

    "idasistente": 3,
    "tipoAsistente": "asistente",
    "idasociado": 0,
    "tipoDocumento": "cc",
    "genero": "M",
    "documento": "1024481004",
    "nombres": "German",
    "apellidos": "Pinilla",
    "direccion": "Calle 123 N 20 -22",
    "telefono": "7328061",
    "estado": "preinscrito",
    "observaciones": "",
    "created_at": "2018-04-20 16:33:17",
    "updated_at": "2018-06-12 21:15:17",

}
*/
