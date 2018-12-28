import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Location and Maps

//GPS
import { Geolocation } from '@ionic-native/geolocation'


declare var google;


@IonicPage()
@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapPage {


  pageSlider: any
  LoginPage: any
  loginNativePage: any
  pageMultiEvent: any
  latitude: any;
  longitude: any;
  event: any = {}
  mapEle: HTMLElement;
  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
  ) {

    let event_param = navParams.get('event')

    if (event_param !== null || event_param !== undefined) {

      this.event = event_param

    }

    //Previous pages
    this.pageSlider = document.querySelector('page-slider')
    this.LoginPage = document.querySelector('page-login')
    this.loginNativePage = document.querySelector('page-login-native')
    this.pageMultiEvent = document.querySelector('page-multi-event')

  }

  ionViewDidLoad() {

    // if( this.pageSlider!= null){
    //   this.pageSlider.style.display = 'none'
    // }

    // if( this.LoginPage!= null){
    //   this.LoginPage.style.display = 'none'
    // }

    // if( this.loginNativePage!= null){
    //   this.loginNativePage.style.display = 'none'
    // }

    if (this.pageMultiEvent != null) {
      this.pageMultiEvent.style.display = 'none'
    }

    console.log("map")

    //Render google map
    this.loadMap()

  }

  ionViewWillLeave() {

    // if( this.pageMultiEvent!= null){
    this.pageMultiEvent.style.display = 'block'
    // }

  }


  /**
  * Carga mapa 
  * 
  */
  loadMap() {

    console.log(this.event);


    this.latitude = this.event.evntPlace.placeLat;
    this.longitude = this.event.evntPlace.placeLon;
    console.log(this.latitude, this.longitude);

    // create a new map by passing HTMLElement
    this.mapEle = document.getElementById('map');

    // create LatLng object
    let myLatLng = { lat: +this.latitude, lng: +this.longitude };

    // create map
    this.map = new google.maps.Map(this.mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {



      let marker = new google.maps.Marker({
        title: this.event.evntName,
        animation: 'DROP',
        position: myLatLng,
        map: this.map,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }

      });
      this.mapEle.classList.add('show-map');
    });
  }




}
