import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//importar servicios 
import { TouristappProvider } from '../../providers/touristapp/touristapp';

//importar paginas
import { CityToursDetailPage } from '../../pages/city-tours-detail/city-tours-detail';

@IonicPage()
@Component({
  selector: 'page-city-tours',
  templateUrl: 'city-tours.html',
})
export class CityToursPage {

  public id_pais: number = 10;
  public TouristCiudades: any = [];

  constructor(public touristappServices: TouristappProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.cargarCiudades();
  }


  cargarCiudades() {
    this.touristappServices.getTourist(this.id_pais).subscribe(data => {
      console.log(data);
      this.TouristCiudades = data;
    }, error => {

      console.log(error);

    })

  }


  goToDeatil(idCiudad) {

    this.navCtrl.push(CityToursDetailPage, {
      idCiudad: idCiudad
    })

  }



}
