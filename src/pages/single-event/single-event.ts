import { Component, ViewChild, ElementRef } from '@angular/core'
import { IonicPage, NavController, ViewController, NavParams, ModalController } from 'ionic-angular'
import { Platform, ActionSheetController } from 'ionic-angular'
import { MenuController } from 'ionic-angular'
import { LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { UtilitiesComponent } from '../../components/utilities/utilities';

//Constants
import { default_image } from '../../app/app.constants'

//Providers
import { EventProvider } from '../../providers/event/event'
import { EventAppearanceProvider } from '../../providers/event-appearance/event-appearance'
import { AssistantsProvider } from '../../providers/assistants/assistants'
import { ProfileProvider } from '../../providers/profile/profile'

//Pages
import { NotificationPage } from '../notification/notification'
import { InteractiveMapMultiplePage } from '../interactive-map-multiple/interactive-map-multiple'
import { NewsPage } from '../news/news'
import { SocialNetworksPage } from '../social-networks/social-networks'
import { RoomPage } from '../room/room'
import { TicketsPage } from '../tickets/tickets'
import { DocumentsPage } from '../documents/documents'
import { ConferencesPage } from '../conferences/conferences'
import { SpeakersPage } from '../speakers/speakers'
import { SponsorsPage } from '../sponsors/sponsors'
import { StandsPage } from '../stands/stands'
import { MultiEventPage } from '../multi-event/multi-event'
import { FastNotesPage } from '../fast-notes/fast-notes'
import { WebViewPage } from '../web-view/web-view'
import { GalleryPage } from '../gallery/gallery'
import { SearchModalPage } from '../../pages/search-modal/search-modal'
import { QuestionsPage } from '../questions/questions'
import { VideoPage } from '../video/video'
import { CityToursPage } from '../city-tours/city-tours'
import { ProfilePage } from '../profile/profile'
import { SurveyPage } from '../survey/survey'
import { CodeQrPage } from '../code-qr/code-qr'
import { ConferencePersonalPage } from '../conference-personal/conference-personal'
import { SingleEventMorePage } from '../single-event-more/single-event-more'
import { AttendantPage } from '../attendant/attendant'
import { CodeQrCardPage } from '../code-qr-card/code-qr-card';
// import { MapPage} from '../Map/Map'
import { ModalAdsPage } from '../modal-ads/modal-ads'

import { GoogleMapPage } from '../google-map/google-map';


/**
 * Generated class for the SingleEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-single-event',
  templateUrl: 'single-event.html',
})
export class SingleEventPage {

  access_token: string
  profile: any;
  device: string
  refresher: any
  loader: any
  event: any = {}
  id_event: number = null
  optionsOrdenado: Array<any>
  options: Array<any>
  assistants = []
  data: any = { nickname: "" }
  data_user: any = { 'firstNameUser': null, 'lastNameUser': null }
  event_bg_dummy: string = "assets/img/event-bg-dummy.jpg"
  logo_dummy: string = "assets/img/logo-dummy.jpg"
  direction: number
  search_key: string
  @ViewChild("banner", { read: ElementRef }) banner: ElementRef

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private iab: InAppBrowser,
    public eventProvider: EventProvider,
    public eventAppearance: EventAppearanceProvider,
    public assistantsProvider: AssistantsProvider,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    //  public menuCtrl: MenuController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private storage: Storage,
    public utilitiesComponent: UtilitiesComponent,
    public profileProvider: ProfileProvider
  ) {
    this.device = eventAppearance.getDevice()
    this.getDataUser();
    let id_evento_param = navParams.get('event_id')
    if (id_evento_param !== null || id_evento_param !== undefined) {
      this.id_event = id_evento_param
      //Save event like current
      this.storage.set('current_event', this.id_event)
    } else {
      //Get storage
      this.storage.get('current_event').then((current_event) => {
        //No exist item storage
        if (current_event !== null || current_event !== undefined) {
          //Server request
          this.id_event = current_event
        }
      })
    }

    console.log(`(single-event.ts) gevents>> Event(id):  ${this.id_event}`)
    this.options = [
      {
        id: '162',
        class: 'colorCard1',
        img: "assets/img/card1.png",
        image_bg: "colorCard1Doc",
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
        image_bg: "colorCard2Doc",
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
        image_bg: "colorCard3Doc",
        text: 'Mapa interactivo',
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
        image_bg: "colorCard4Doc",
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
        image_bg: "colorCard5Doc",
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
        image_bg: "colorCard6Doc",
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
        image_bg: "colorCard7Doc",
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
        image_bg: "colorCard8Doc",
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
        image_bg: "colorCard9Doc",
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
        image_bg: "colorCard10Doc",
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
        image_bg: "colorCard11Doc",
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
        image_bg: "colorCard12Doc",
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
        image_bg: "colorCard13Doc",
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
        image_bg: "colorCard14Doc",
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
        image_bg: "colorCard15Doc",
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
      //   class:'colorCard3',
      //   img:"assets/img/card3.png",
      //   text:'Mapa',
      //   page:StaticMapPage,
      //   icon:{
      //     ios:'ios-map-outline',
      //     md:'md-map'
      //   }
      // },
    ]

  }

  ionViewDidEnter() {
    this.presentLoading()
    this.getEventStorage()
    this.getAssistants()
    this.getUserProfile();
  }


  /**
   * Metodo para validar la informacion del usuario en storage
   */
  getUserProfile() {

    console.log('Hello ThumbnailPhotoProfileComponent Component')

    this.access_token = ''

    this.storage.get(`access_token`).then((access_token) => {

      this.access_token = access_token

      this.storage.get(`user_profile`).then((user_profile) => {

        if (user_profile !== null && user_profile !== undefined) {

          this.profile = user_profile

        } else {

          this.getProfile()

        }

      })

    })

  }

  /**
   * Si la informacion del usuario no existe en storage realiza peticion para capturar la informacion
   */
  getProfile() {

    this.profileProvider.getProfile(this.access_token).subscribe(profile_data => {

      if (profile_data.status !== undefined && profile_data.status !== null) {

        if (profile_data.status == 'OK') {

          this.profile = profile_data.asistente
          this.storage.set(`user_profile`, this.profile)
          console.log(this.profile)

        }

      }

    })

  }


  getDataUser() {
    let data_user = this.navParams.get('data_user');
    if (data_user && data_user != null) {
      console.log("Vienen los datos por url")
      this.storage.set('data_user', data_user)
      this.data_user = data_user;
    } else {
      console.log("No vienen los datos por url")
      this.storage.get('data_user').then((dataUserRes) => {

        console.log("data_user =---->", dataUserRes)
        //No exist item storage
        if (dataUserRes && dataUserRes != null) {
          console.log("Vienen los datos por storage")
          this.data_user = dataUserRes
        } else {
          console.log("No existen datos ni por url ni por storage")
          this.data_user = { 'firstNameUser': '...', 'lastNameUser': '...' };
        }

      })
    }

  }

  getEventStorage() {

    //Get storage
    this.storage.get('event_detail_' + this.id_event).then((event) => {

      //No exist item storage
      if (event === null) {

        //Server request
        this.getEvent()

      } else {

        this.event = event
        this.getBanner()
        this.getMenuOptions()

        this.loader.dismiss()

        console.log(`Storage request...`)
        console.log(`Event(${this.id_event}): `, this.event)

      }

    })

  }

  getEvent() {

    console.log(`Server request...`)

    this.eventProvider.getEvent(this.id_event).subscribe(event => {

      this.event = event
      this.getBanner()
      this.getMenuOptions()
      // console.log(this.event)

      //Save in storage
      this.storage.set('event_detail_' + this.id_event, event)

      //Pull refresher
      if (this.refresher !== undefined) {

        console.log(`Refresher complete...`)
        this.refresher.complete()
        this.refresher = null

      }

      this.loader.dismiss()

    })

  }

  //Get all assistants for an event
  getAssistants() {

    //Get storage
    this.storage.get('assistants_event_' + this.id_event).then((assistants) => {

      //No exist item storage
      if (assistants === null) {

        //Server request
        this.assistantsProvider.getAsistentes(this.id_event).subscribe(response => {

          if (response.success !== undefined && response.success !== null && response.success.status == "Success") {

            this.assistants = response.success.listadoasistentes

            console.log(`(single-event.ts) gevents>> Assistants event ${this.id_event} `, this.assistants)
            this.storage.set('assistants_event_' + this.id_event, this.assistants)

          }

        })

      } else {

        this.assistants = assistants

      }

    })

  }

  getMenuOptions() {

    console.log("(single-event.ts) gevents>> getMenuOptions() Menu options: ");

    if (this.event.opciones_menu !== undefined && this.event.opciones_menu !== null) {

      this.event.opciones_menu.forEach(option_menu => {

        console.log(`Menu optio(${option_menu.id_opcion}): ${option_menu.title}`);

        this.options.forEach(option => {


          if (option.id === option_menu.id_opcion) {

            console.log("personalizado", option_menu.label_personalizado);
            console.log("option_menu.title", option_menu.title);


            option.text = (option_menu.label_personalizado !== null && option_menu.label_personalizado !== "") ? option_menu.label_personalizado : option_menu.title
            //option.text = option_menu.title
            option.active = true
            option.orden = +option_menu.orden
            console.log(option.text);

          }

        });

      })

    }

    this.getOrder();

  }

  /**
 * Metodo para ordenar por variable orden
 * Carlos garzon
 */
  getOrder() {

    this.options.sort(function (a, b) {
      if (a.orden > b.orden) {
        return 1;
      }
      if (a.orden < b.orden) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  getBanner() {

    if (this.device == 'android' || this.device == 'desktop') {

      let banner_android = `url('${this.event_bg_dummy}')`

      if (this.event.android_setup !== undefined && this.event.android_setup !== null && this.event.android_setup.banner_id !== undefined && this.event.android_setup.banner_id !== '') {

        banner_android = `url('${this.event.android_setup.banner_id}')`

      }

      console.log(`single-event.ts) gevents>> getBanner() Device: ${this.device} Banner: ${banner_android} `)

      this.banner.nativeElement.style.background = `${banner_android} no-repeat `
      this.banner.nativeElement.style.backgroundSize = 'contain'

    } else {

      let banner_ios = `url('${this.event_bg_dummy}')`

      if (this.event.ios_setup !== undefined && this.event.ios_setup !== null && this.event.ios_setup.banner_id !== undefined && this.event.ios_setup.banner_id !== '') {

        banner_ios = `url('${this.event.ios_setup.banner_id}')`

      }

      this.banner.nativeElement.style.background = `${banner_ios} no-repeat `
      this.banner.nativeElement.style.backgroundSize = 'contain'

    }

  }

  getIcon(event) {

    if (this.device == 'android' || this.device == 'desktop') {

      if (event.android_setup !== undefined && event.android_setup !== null && event.android_setup.icono !== undefined && event.android_setup.icono !== '') {

        return event.android_setup.icono

      } else {

        return this.logo_dummy

      }

    } else {

      if (event.ios_setup !== undefined && event.ios_setup !== null && event.ios_setup.icono !== undefined && event.ios_setup.icono !== '') {

        return event.ios_setup.icono

      } else {

        return this.logo_dummy

      }


    }

  }

  openSearchModal() {
    let menu_modal = this.modalCtrl.create(SearchModalPage, { userId: 0 })
    menu_modal.present()
  }

  openLink(url) {

    console.log(`gevents>> Open in browser ${url}`)
    this.iab.create(url)

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
    this.getEvent()
    this.getAssistants()

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

  errorProfilePhoto(event) {
    event.target.src = default_image.user
  }

  returnMultiEvent() {
    this.navCtrl.push(MultiEventPage, {})
  }

  goToProfilePage() {
    this.navCtrl.push(ProfilePage)

  }

  goToNotification() {
    this.navCtrl.push(NotificationPage)
  }

  goToSurvey() {

    this.navCtrl.push(SurveyPage)

  }

  goToCodeQr() {

    this.navCtrl.push(CodeQrPage)

  }

  goToConferencePersonal() {
    this.navCtrl.push(ConferencePersonalPage, {
    })
  }

  goCardQr() {
    this.navCtrl.push(CodeQrCardPage);
  }

  goToTickets() {
    this.navCtrl.push(TicketsPage, {
    })

  }

  // modulos HORIZONTAL 

  goToSingleEventMorePage() {

    this.navCtrl.push(SingleEventMorePage, {
      event: this.event,
      event_id: this.id_event,
      data_user: this.data_user
    })

  }

  goToAttendantPage() {

    this.navCtrl.push(AttendantPage)

  }

  goToMapPage() {

    this.navCtrl.push(GoogleMapPage, {
      event: this.event
    })


  }

  goToModalAdsPage() {

    this.navCtrl.push(ModalAdsPage)

  }

  goToFastNotesPage() {

    this.navCtrl.push(FastNotesPage)

  }

  goToChatGeneral() {

    this.navCtrl.push(RoomPage)

  }

}
