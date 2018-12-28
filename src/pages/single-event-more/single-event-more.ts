import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Pages
import { InteractiveMapMultiplePage } from '../interactive-map-multiple/interactive-map-multiple'
import { NewsPage } from '../news/news'
import { SocialNetworksPage } from '../social-networks/social-networks'
import { RoomPage } from '../room/room'

import { DocumentsPage } from '../documents/documents'
import { ConferencesPage } from '../conferences/conferences'
import { SpeakersPage } from '../speakers/speakers'
import { SponsorsPage } from '../sponsors/sponsors'
import { StandsPage } from '../stands/stands'
import { FastNotesPage } from '../fast-notes/fast-notes'
import { WebViewPage } from '../web-view/web-view'
import { GalleryPage } from '../gallery/gallery'
import { QuestionsPage } from '../questions/questions'
import { VideoPage } from '../video/video'
import { CityToursPage } from '../city-tours/city-tours'
/**
 * Generated class for the SingleEventMorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-single-event-more',
  templateUrl: 'single-event-more.html',
})
export class SingleEventMorePage {

  options: Array<any>
  options_available: Array<any> = []
  event: any = {}
  id_event: number = null
  data_user: any = { 'firstNameUser': null, 'lastNameUser': null }

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    let id_evento_param = navParams.get('event_id')

    if (id_evento_param !== null || id_evento_param !== undefined) {

      this.id_event = id_evento_param

    }

    let event_param = navParams.get('event')

    if (event_param !== null || event_param !== undefined) {

      this.event = event_param

    }

    let data_user_param = navParams.get('data_user')

    if (data_user_param !== null || data_user_param !== undefined) {

      this.data_user = data_user_param

    }

    this.options = [
      {
        // Menu option in dahsboard Gevents(id => 162): Agenda
        id: '162',
        class: 'colorCard1',
        img: "assets/img/card1.png",
        image_bg: "colorCard1",
        page: ConferencesPage,
        icon: {
          ios: 'demo-icon  icon-geventscalendar iconModule',
          md: 'demo-icon  icon-geventscalendar iconModule',
          code: '&#xe849;'
        },
        orden: 15,
        active: false
      },
      {
        // Menu option in dahsboard Gevents(id => 163): Stands
        id: '163',
        class: 'colorCard2',
        img: "assets/img/card2.png",
        image_bg: "colorCard2",
        page: StandsPage,
        icon: {
          ios: 'demo-icon  icon-geventscolumns iconModule',
          md: 'demo-icon  icon-geventscolumns iconModule',
          code: '&#xf0db;'
        },
        orden: 15,
        active: false
      },
      {
        // Menu option in dahsboard Gevents(id => 165): Mapa interactivo
        id: '165',
        class: 'colorCard4',
        img: "assets/img/card4.png",
        image_bg: "colorCard3",
        page: InteractiveMapMultiplePage,
        icon: {
          ios: 'demo-icon  icon-geventsstreet-view  iconModule',
          md: 'demo-icon  icon-geventsstreet-view  iconModule',
          code: '&#xf21d;'
        },
        orden: 15,
        active: false
      },
      {
        // Menu option in dahsboard Gevents(id => 167): Speakers
        id: '167',
        class: 'colorCard5',
        img: "assets/img/card5.png",
        image_bg: "colorCard4",
        page: SpeakersPage,
        icon: {
          ios: 'demo-icon  icon-geventsusers  iconModule',
          md: 'demo-icon  icon-geventsusers  iconModule',
          code: '&#xe8b7;'
        },
        orden: 15,
        active: false
      },
      {
        // Menu option in dahsboard Gevents(id => 168): Patrocinadores
        id: '168',
        class: 'colorCard6',
        img: "assets/img/card6.png",
        image_bg: "colorCard5",
        page: SponsorsPage,
        icon: {
          ios: 'demo-icon  icon-geventsflag-empty iconModule',
          md: 'demo-icon  icon-geventsflag-empty iconModule',
          code: '&#xf11d;'
        },
        orden: 15,
        active: false
      },
      {
        // Menu option(169): Noticias
        id: '169',
        class: 'colorCard7',
        img: "assets/img/card7.png",
        image_bg: "colorCard6",
        page: NewsPage,
        icon: {
          ios: 'demo-icon   icon-geventsnewspaper iconModule',
          md: 'demo-icon   icon-geventsnewspaper iconModule',
          code: '&#xf0db;'
        },
        orden: 15,
        active: false
      },
      {
        // Menu option in dahsboard Gevents(id => 170): Redes Sociales
        id: '170',
        class: 'colorCard8',
        img: "assets/img/card8.png",
        image_bg: "colorCard7",
        page: SocialNetworksPage,
        icon: {
          ios: 'demo-icon  icon-geventsfacebook-1 iconModule',
          md: 'demo-icon  icon-geventsfacebook-1 iconModule',
          code: '&#xe959;'
        },
        orden: 15,
        active: false
      },
      {
        // Menu option in dahsboard Gevents(id => 171): Web view 
        id: '171',
        class: 'colorCard9',
        img: "assets/img/card9.png",
        image_bg: "colorCard8",
        page: WebViewPage,
        icon: {
          ios: 'demo-icon  icon-geventsglobe-1  iconModule',
          md: 'demo-icon  icon-geventsglobe-1  iconModule',
          code: '&#xe888;'
        },
        orden: 15,
        active: false
      },
      {
        // Menu option in dahsboard Gevents(id => 39084): Chat
        id: '39084',
        class: 'colorCard10',
        img: "assets/img/card10.png",
        image_bg: "colorCard9",
        page: RoomPage,
        icon: {
          ios: 'demo-icon  icon-geventscomment-1  iconModule',
          md: 'demo-icon  icon-geventscomment-1  iconModule',
          code: '&#xe877;'
        },
        orden: 15,
        active: false
      },
      {
        // Menu option in dahsboard Gevents(id => 39085): Preguntas
        id: '39085',
        class: 'colorCard11',
        img: "assets/img/card11.png",
        image_bg: "colorCard10",
        page: QuestionsPage,
        icon: {
          ios: 'demo-icon  icon-geventsmegaphone-1 iconModule',
          md: 'demo-icon  icon-geventsmegaphone-1 iconModule',
          code: '&#xe8a9;'
        },
        orden: 15,
        active: false
      },
      {
        // Menu option in dahsboard Gevents(id => 39087): Galería
        id: '39087',
        class: 'colorCard12',
        img: "assets/img/card12.png",
        image_bg: "colorCard11",
        page: GalleryPage,
        icon: {
          ios: 'demo-icon  icon-geventspicture iconModule',
          md: 'demo-icon  icon-geventspicture iconModule',
          code: '&#xe810;'
        },
        orden: 15,
        active: false
      },
      {
        // Menu option in dahsboard Gevents(id => 39086): Video
        id: '39086',
        class: 'colorCard13',
        img: "assets/img/card13.png",
        image_bg: "colorCard12",
        page: VideoPage,
        icon: {
          ios: 'demo-icon  icon-geventsvideocam-1  iconModule',
          md: 'demo-icon  icon-geventsvideocam-1  iconModule',
          code: '&#xe86f;'
        },
        orden: 15,
        active: false
      },
      {
        // Menu option in dahsboard Gevents(id => 39088): Documentos
        id: '39088',
        class: 'colorCard14',
        img: "assets/img/card14.png",
        image_bg: "colorCard13",
        page: DocumentsPage,
        icon: {
          ios: 'demo-icon  icon-geventsdoc-text  iconModule',
          md: 'demo-icon  icon-geventsdoc-text  iconModule',
          code: '&#xf0f6;'
        },
        orden: 15,
        active: false
      },
      //Widgets options (Only in storage application)
      {
        class: 'colorCard14',
        img: "assets/img/card14.png",
        image_bg: "colorCard14",
        text: 'Turismo',
        page: CityToursPage,
        icon: {
          ios: 'demo-icon  icon-geventslocation-1 iconModule',
          md: 'demo-icon  icon-geventslocation-1 iconModule',
          code: '&#xe878;'
        },
        orden: 15,
        active: true
      },
      {
        class: 'colorCard14',
        img: "assets/img/card14.png",
        image_bg: "colorCard15",
        text: 'Notas rápidas',
        page: FastNotesPage,
        icon: {
          ios: 'demo-icon  icon-geventssticky-note-o iconModule',
          md: 'demo-icon  icon-geventssticky-note-o iconModule',
          code: '&#xf24a;'
        },
        orden: 15,
        active: true
      },
      // {
      // Menu optio(166): Mapa
      //   id: '166',
      //   class:'colorCard3',
      //   img:"assets/img/card3.png",
      //   text:'Mapa',
      //   page:StaticMapPage,
      //   icon:{
      //     ios:'ios-map-outline',
      //     md:'md-map'
      //   },
      //   active:false
      // },
    ]

    this.getMenuOptions()

  }

  getMenuOptions() {


    // console.log("(single-event.ts) gevents>> getMenuOptions() Menu options: ");

    this.event.opciones_menu.forEach((option_menu) => {

      // console.log(`Menu optio(${option_menu.id_opcion}): ${option_menu.title}`);

      this.options.forEach(option => {


        if (option.id === option_menu.id_opcion) {

          option.text = (option_menu.label_personalizado !== null && option_menu.label_personalizado !== "") ? option_menu.label_personalizado : option_menu.title
         // option.text = option_menu.title
          option.active = true
          option.orden = +option_menu.orden

          console.log(`${option_menu.title}(${option_menu.id_opcion}): Available`);

        }


      });

    })

    this.options.forEach(option => {


      if (option.active) {


        this.options_available.push(option)



      }


    });
    this.getOrder();
    console.log('options available: ', this.options_available)

  }

  /**
 * Metodo para ordenar por variable orden
 * Carlos garzon
 */
  getOrder() {

    this.options_available.sort(function (a, b) {
      if (a.orden > b.orden) {
        return 1;
      }
      if (a.orden < b.orden) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    console.log("Arreglo ordenado", this.options_available);


  }

  ionViewDidLoad() {



  }

  goToPage(pageData) {
    console.log("pageData =>", pageData)
    // alert('this.event ====> '+JSON.stringify(this.event));
    // alert('this.id_event ====> '+JSON.stringify(this.id_event));
    // alert('this.data_user ====> '+JSON.stringify(this.data_user));
    this.navCtrl.push(pageData, {
      event: this.event,
      event_id: this.id_event,
      data_user: this.data_user
    })

  }

  // console.log(`(single-event-more.ts) gevents>> Event(id):  ${this.id_event }`)

  // this.options = [
  //   {
  //     class:'colorCard1',
  //     img:"assets/img/card1.png",
  //     text:'Agenda',
  //     page:ConferencesPage,
  //     icon:{
  //       ios:'demo-icon icon-geventscalendar iconCircle2',
  //       md:'demo-icon icon-geventscalendar iconCircle2;',
  //       code: '&#xe849;'
  //     }
  //   },
  //   {
  //     class:'colorCard2',
  //     img:"assets/img/card2.png",
  //     text:'Stands',
  //     page:StandsPage,
  //     icon:{
  //       ios:'demo-icon icon-geventscolumns iconCircle2',
  //       md:'demo-icon icon-geventscolumns iconCircle2;',
  //       code: '&#xf0db;'
  //     }
  //   },
  // {
  //   class:'colorCard3',
  //   img:"assets/img/card3.png",
  //   text:'Mapa',
  //   page:StaticMapPage,
  //   icon:{
  //     ios:'ios-map-outline',
  //     md:'md-map'
  //   }
  // },
  //   {
  //     class:'colorCard4',
  //     img:"assets/img/card4.png",
  //     text:'Mapa interactivo',
  //     page:InteractiveMapMultiplePage,
  //     icon:{
  //       ios:'demo-icon icon-geventsstreet-view   iconCircle2',
  //       md:'demo-icon icon-geventsstreet-view   iconCircle2;',
  //       code: '&#xf21d;'
  //     }
  //   },
  //   {
  //     class:'colorCard5',
  //     img:"assets/img/card5.png",
  //     text:'Speakers',
  //     page:SpeakersPage,
  //     icon:{
  //       ios:'demo-icon icon-geventsusers   iconCircle2',
  //       md:'demo-icon icon-geventsusers   iconCircle2;',
  //       code: '&#xe8b7;'
  //     }
  //   },
  //   {
  //     class:'colorCard6',
  //     img:"assets/img/card6.png",
  //     text:'Patrocinadores',
  //     page:SponsorsPage,
  //     icon:{
  //       ios:'demo-icon icon-geventsflag-empty     iconCircle2',
  //       md:'demo-icon icon-geventsflag-empty  iconCircle2;',
  //       code: '&#xf11d;'
  //     }
  //   },
  //   {
  //     class:'colorCard7',
  //     img:"assets/img/card7.png",
  //     text:'Noticias',
  //     page:NewsPage,
  //     icon:{
  //       ios:'demo-icon icon-geventsnewspaper    iconCircle2',
  //       md:'demo-icon icon-geventsnewspaper     iconCircle2;',
  //       code: '&#xf21d;'
  //     }
  //   },
  //   {
  //     class:'colorCard8',
  //     img:"assets/img/card8.png",
  //     text:'Redes Sociales',
  //     page:SocialNetworksPage,
  //     icon:{
  //       ios:'demo-icon icon-geventsfacebook-1    iconCircle2',
  //       md:'demo-icon icon-geventsfacebook-1     iconCircle2;',
  //       code: '&#xe959;'
  //     }
  //   },
  //   {
  //     class:'colorCard9',
  //     img:"assets/img/card9.png",
  //     text:'WebView',
  //     page:WebViewPage,
  //     icon:{
  //       ios:'demo-icon icon-geventsglobe-1  iconCircle2',
  //       md:'demo-icon icon-geventsglobe-1  iconCircle2;',
  //       code: '&#xe888;'
  //     }
  //   },
  //   {
  //     class:'colorCard10',
  //     img:"assets/img/card10.png",
  //     text:'Chat',
  //     page:RoomPage,
  //     icon:{
  //       ios:'demo-icon icon-geventscomment-1    iconCircle2',
  //       md:'demo-icon icon-geventscomment-1    iconCircle2;',
  //       code: '&#xe877;'
  //     }
  //   },
  //   {
  //     class:'colorCard11',
  //     img:"assets/img/card11.png",
  //     text:'Preguntas',
  //     page:QuestionsPage,
  //     icon:{
  //       ios:'demo-icon icon-geventsmegaphone-1  iconCircle2',
  //       md:'demo-icon icon-geventsmegaphone-1   iconCircle2;',
  //       code: '&#xe8a9;'
  //     }
  //   },
  //   {
  //     class:'colorCard12',
  //     img:"assets/img/card12.png",
  //     text:'Galería',
  //     page:GalleryPage,
  //     icon:{
  //       ios:'demo-icon icon-geventspicture  iconCircle2',
  //       md:'demo-icon icon-geventspicture   iconCircle2;',
  //       code: '&#xe810;'
  //     }
  //   },
  //   {
  //     class:'colorCard13',
  //     img:"assets/img/card13.png",
  //     text:'Video',
  //     page:VideoPage,
  //     icon:{
  //       ios:'demo-icon icon-geventsvideocam-1  iconCircle2',
  //       md:'demo-icon icon-geventsvideocam-1   iconCircle2;',
  //       code: '&#xe86f;'
  //     }
  //   },
  //   {
  //     class:'colorCard14',
  //     img:"assets/img/card14.png",
  //     text:'Documentos',
  //     page:DocumentsPage,
  //     icon:{
  //       ios:'demo-icon icon-geventsdoc-text     iconCircle2',
  //       md:'demo-icon icon-geventsdoc-text      iconCircle2;',
  //       code: '&#xf0f6;'
  //     }
  //   },
  //   {
  //     class:'colorCard14',
  //     img:"assets/img/card14.png",
  //     text:'City tours',
  //     page:CityToursPage,
  //     icon:{
  //       ios:'demo-icon icon-geventslocation-1  iconCircle2',
  //       md:'demo-icon icon-geventslocation-1   iconCircle2;',
  //       code: '&#xe878;'
  //     }
  //   },
  //   {
  //     class:'colorCard14',
  //     img:"assets/img/card14.png",
  //     text:'Notas rápidas',
  //     page:FastNotesPage,
  //     icon:{
  //       ios:'demo-icon  icon-geventssticky-note-o  iconCircle2',
  //       md:'demo-icon  icon-geventssticky-note-o   iconCircle2;',
  //       code: '&#xf24a;'
  //     }
  //   },
  // ]

}
