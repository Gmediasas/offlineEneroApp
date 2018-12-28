
//Ionic
  import { IonicPage, NavController,ViewController, NavParams, ModalController, ActionSheetController, Platform } from 'ionic-angular'
  import { LoadingController } from 'ionic-angular'
  import { MenuController } from 'ionic-angular'
  import { Slides } from 'ionic-angular'
  import { Storage } from '@ionic/storage'
//Angula
  import { Component, ViewChild } from '@angular/core'
  import { Http } from '@angular/http'
  import 'rxjs/add/operator/map'

//pages
  import { SingleEventPage } from '../../pages/single-event/single-event'
  import { SearchModalPage } from '../../pages/search-modal/search-modal'
   import { ProfilePage } from '../profile/profile'

//services
  import { EventProvider } from '../../providers/event/event'
  import { EventAppearanceProvider } from '../../providers/event-appearance/event-appearance'
  import { AppAppearanceProvider } from '../../providers/app-appearance/app-appearance'

//Models
  import { AppInstance } from '../../models/app_instance'

//Const
  import { appId } from '../../app/app.constants'
  import { appAppearance } from '../../app/app.constants'


/**
 * Generated class for the MultiEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-multi-event',
  templateUrl: 'multi-event.html',
})

export class MultiEventPage {

  device:string
  app_instance:AppInstance
  refresher:any
  loader:any
  @ViewChild(Slides) slides_cities: Slides;
  city_current_slide:string = null
  city_current_index:any = 0
  events:any
  event_bg_dummy:string =  "assets/img/event-bg-dummy.jpg"
  logo_dummy:string =  "assets/img/logo-dummy.jpg"
  app_id:string
  data_user: any = {'firstNameUser':null, 'lastNameUser':null}
  list = []
  cities_events:Array<any>

  //Sort
    //Input component data
    direction: number //Asc or Desc
    search_key: string //Key for search in records
    sort_component: any //Component for records sort
    test_options = [{
      label: "Nombre",
      value: "name"
    },{
      label: "Categoria",
      value: "category"
    },{
      label: "Fecha",
      value: "date"
    } ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public eventProvider: EventProvider,
    public eventAppearance: EventAppearanceProvider,
    public appAppearanceProvider: AppAppearanceProvider,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public viewCtrl: ViewController,
    private storage: Storage,
    public modalCtrl: ModalController,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
  ){


    
    this.device = eventAppearance.getDevice()

    this.app_instance = appAppearance
    this.getDataUser();

    // this.storage.get('app_instance').then( app_appearance => {

    //   this.app_instance = app_appearance
    //   this.getAppAppearance()

    // })

    this.app_id = appId //evento quemado

    this.cities_events = ['Todas las ciudades']

    // let data_user = navParams.get('data_user')
    //
    // console.log(`(multi-event.ts) gevents>> Data User: `,data_user)
    //
    // if( data_user !== null || data_user !== undefined ){
    //
    //   this.data_user = data_user //Datos de usuario
    //
    // }
    //
    // this.storage.set('data_user', data_user )

    this.initSort()

  }

  ionViewDidLoad() {

    //Sidemenu
      this.menuCtrl.enable(true)
      this.menuCtrl.enable(true,"app-menu")


  }

  getDataUser(){
    let data_user = this.navParams.get('data_user');
    if (data_user && data_user != null) {
      console.log("Vienen los datos por url")
      this.storage.set('data_user', data_user )
      this.data_user = data_user;
    }else{
      console.log("No vienen los datos por url")
      this.storage.get('data_user').then((dataUserRes) => {

        console.log("data_user =---->",dataUserRes)
        //No exist item storage
        if( dataUserRes && dataUserRes !=null){
          console.log("Vienen los datos por storage")
          this.data_user = dataUserRes
        }else{
          console.log("No existen datos ni por url ni por storage")
          this.data_user = {'firstNameUser':'...', 'lastNameUser':'...'};
        }

      })
    }

  }

  getAppAppearance(){

    // console.log(`(multi-event.ts) gevents>> Render appearance: `, this.app_instance)

    // //Main background
    //   $(".main-bg-color").css("background", this.app_instance.main_color)
    //   $(".home-head").css("box-shadow", "inset 0 0 0 1000px rgba(249, 241, 3, 0.8)")
    //   $(".home-head").css("-webkit-box-shadow", "inset 0 0 0 1000px rgba(249, 241, 3, 0.8)")

    // //Secondary color
    //   $(".main-text-color").css("color", this.app_instance.secondary_color)
    //   $("span.main-text-color").css("color", this.app_instance.secondary_color)

    //   $("icon").css("color", this.app_instance.secondary_color)

  }

  getEventsStorage(){

    //Get storage
      this.storage.get('events').then((events) => {

          //No exist item storage
          if( events === null ){

            //Server request
              this.getAllEvents()

          }else{

            console.log("(multi-events.ts) gevents>> Storage request Events: ", events )
            this.events= events
            this.getCitiesEvents()

            this.loader.dismiss()

          }

      })

  }

  getAllEvents(){

      this.eventProvider.getAllEvents(this.app_id).subscribe( events => {

        console.log("(multi-events.ts) gevents>> Server request Events: ", events )

        this.events = events
        this.getCitiesEvents()

        //Save in storage
          this.storage.set('events', events )

        //Pull refresher
        if(this.refresher !== undefined){

          console.log(`(multi-events.ts) gevents>> Refresher complete...`)
          this.refresher.complete()
          this.refresher = null

        }

        this.loader.dismiss()

      })

  }

  getCitiesEvents(){

    this.events.forEach(event => {

      if(this.cities_events.indexOf( event.evntCiudadEvento ) == -1){  

        this.cities_events.push( event.evntCiudadEvento )

      } 
      
    });

  }

  initSort(){

    this.search_key = 'evntName' //Name field default sort
    this.direction = 1 //Default direcion in sort

    //Options select sort
    this.sort_component = {
      label: "Ordenar por",
      options: this.test_options,
      sort_by: this.test_options[0].value, //Option default select sort_by in component
      sort_by_direction: this.direction === 1 ? 'asc': 'desc' //Direction default select sort_by in component
    }

  }

  slideCitiesChanged() {

    this.city_current_index = this.slides_cities.getActiveIndex()
    this.city_current_slide = this.cities_events[this.city_current_index]

    if( this.city_current_slide !== undefined ){

      console.log('City is: ', this.city_current_slide)

    }else{

      this.city_current_slide = this.cities_events[ (this.cities_events.length - 1 ) ]

    }
    

  }

  sortBy(sort_by_ouput){

    switch (sort_by_ouput) {

      case 'name':
        this.search_key = 'evntName'
        break

      case 'category':
        this.search_key = 'evntCategoria'
        break

      case 'date':
        this.search_key = 'evntStartDate'
        break

    }

  }

  sortByDirection( sort_by_direction_output ){


    switch (sort_by_direction_output) {

      case 'asc':
        this.direction = 1
        break

      case 'desc':
        this.direction = -1
        break

    }

  }

  getBanner(event){

    if(this.device == 'android' || this.device == 'desktop'){

      if( event.android_setup !== undefined && event.android_setup !== null && event.android_setup.banner_id !== undefined && event.android_setup.banner_id !== '') {

        return event.android_setup.banner_id

      }else{

        return this.event_bg_dummy

      }

    }else{

      if( event.ios_setup !== undefined && event.ios_setup !== null && event.ios_setup.banner_id !== undefined && event.ios_setup.banner_id !== '') {

         return event.ios_setup.banner_id

      }else{

        return this.event_bg_dummy

      }

    }

  }

  getIcon(event){

    if(this.device == 'android' || this.device == 'desktop' ){

      if( event.android_setup !== undefined && event.android_setup !== null && event.android_setup.icono !== undefined && event.android_setup.icono !== '' ) {

        return event.android_setup.icono

      }else{

        return this.logo_dummy

      }

    }else{

      if( event.ios_setup !== undefined && event.ios_setup !== null && event.ios_setup.icono !== undefined  && event.ios_setup.icono !== '' ) {

         return event.ios_setup.icono

      }else{

        return this.logo_dummy

      }

    }

  }

  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

  }

  doRefresh(refresher) {

    this.refresher = refresher
    this.getAllEvents()

  }

  openAppMenu() {
    this.menuCtrl.toggle()
  }

  openSearchModal(){
    let menu_modal = this.modalCtrl.create(SearchModalPage, { userId: 0 })
    menu_modal.present()
  }

  ionViewWillEnter() {

    this.viewCtrl.showBackButton(false)

    this.presentLoading()
    this.getEventsStorage()

  }

  goToEventDetail(event_id, data_user){

    //Go to event detail
      this.navCtrl.push( SingleEventPage, {
        event_id: event_id,
        data_user: data_user
      })

  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Acerca del evento',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Compartir',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked')
          }
        },
        {
          text: 'Agregar al calendario',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('Play clicked')
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked')
          }
        }
      ]
    })
    actionSheet.present()
  }

    goToProfilePage(){
    this.navCtrl.push(ProfilePage )

  }

}
