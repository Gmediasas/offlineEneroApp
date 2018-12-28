import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//importar servicios
import { TouristappProvider } from '../../providers/touristapp/touristapp';

@IonicPage()
@Component({
  selector: 'page-city-tours-detail',
  templateUrl: 'city-tours-detail.html',
})
export class CityToursDetailPage {

  public touristCiudadesDetalle: any = [];
  public detalle: any = [];
  public galeria: any = [];
  public name: string;

  constructor(public touristappServices: TouristappProvider, public navCtrl: NavController, public navParams: NavParams) {
  }


  /**
   * Metodo inicial Se captura id de ciudad
   */
  ionViewDidLoad() {
    let idCiudad = this.navParams.get('idCiudad')
    this.cargarDetalleCiudades(idCiudad);
  }

  /**
   * Carga detalle de Ciudades 
   * @param ciudad 
   */
  cargarDetalleCiudades(ciudad: number) {
    this.touristappServices.getTouristDetalle(ciudad).subscribe(data => {
      console.log(data);
      this.touristCiudadesDetalle = data;
      this.cargarDatos();

    }, error => {
      console.log(error);
    })
  }

  /**
   * Detalle de los datos
   */
  cargarDatos() {
    this.detalle = this.touristCiudadesDetalle[0];
    this.name = this.detalle.name;
    this.galeria = this.detalle.galeria;
  }



}
