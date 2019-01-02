//ionic
import { Nav, App, Platform, ModalController, AlertController, MenuController } from 'ionic-angular'
import { NavController } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { FCM } from '@ionic-native/fcm'
import { Storage } from '@ionic/storage'
import { Globalization } from '@ionic-native/globalization'
import { TranslateService } from '@ngx-translate/core'

//Angular
import { Component, ViewChild } from '@angular/core'

//Libs
import * as firebase from 'firebase' //Importacion de la libreria de firebase (funcionalidad Chat)
//Pages
import { HomePage } from '../pages/home/home'
import { LoginPage } from '../pages/login/login'
import { SingleEventPage } from '../pages/single-event/single-event'
import { ChatPersonalPage } from '../pages/chat-personal/chat-personal';
import { AttendantPage } from '../pages/attendant/attendant'
//Providers
import { AuthServiceProvider } from '../providers/auth-service/auth-service'
import { FirebaseTokenProvider } from '../providers/firebase-token/firebase-token'
import { EventProvider } from '../providers/event/event'
import { AppAppearanceProvider } from '../providers/app-appearance/app-appearance'
import { DatabaseProvider } from '../providers/database/database';


//Models
import { AppInstance } from '../models/app_instance'

//Const
import { appId } from '../app/app.constants'
import { defaultLanguage } from '../app/app.constants'
import { fireBaseConfig } from '../app/app.constants'

// ******************************** BEGIN - Config Auth Credentials Firebase *************************************//
const fire_base_config = fireBaseConfig
// ******************************** END - Config Auth Credentials Firebase *************************************//

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav
  @ViewChild('myNav') navCtrl: NavController

  //ionic
  rootPage: any
  loader: any
  //app
  id_app: string
  default_language: string
  app_instance: AppInstance
  pages: Array<{
    title: string,
    component: any
  }>

  constructor(
    public platform: Platform,
    public appCtrl: App,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    private fcm: FCM,
    private globalization: Globalization,
    translate: TranslateService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public storage: Storage,
    private auth: AuthServiceProvider,
    private firebaseTokenService: FirebaseTokenProvider,
    public appAppearanceProvider: AppAppearanceProvider,
    public eventProvider: EventProvider,
    private database: DatabaseProvider,
  ) {

    // this.initializeApp()
    this.id_app = appId //Id aplicacion gvevents
    this.default_language = defaultLanguage //Default language

    platform.ready().then(() => {
      this.storage.set('chat_personal_intent', false);
      this.storage.set('attendant_page_intent', false);
      this.storage.get('default_lang').then((default_lang) => {
        if (default_lang != undefined && default_lang != null) {
          // this language will be used as a fallback when a translation isn't found in the current language
          translate.setDefaultLang(default_lang)
          // the lang to use, if the lang isn't available, it will use the current loader to get them
          translate.use(default_lang)
        } else {
          //If lang deafult setup with language device
          //Get language device
          this.globalization.getPreferredLanguage()
            .then(language => {
              console.log("getPreferredLanguage(): Language Default ", JSON.stringify(language))
              // alert('language: ' + language.value + '\n')
              let iso_639_1 = this.default_language
              if (language.value.includes("es")) iso_639_1 = 'es' //Español
              if (language.value.includes("en")) iso_639_1 = 'en' //Ingles
              if (language.value.includes("pt")) iso_639_1 = 'pt' //Portuges
              if (language.value.includes("zh")) iso_639_1 = 'zh' //Chino
              // this language will be used as a fallback when a translation isn't found in the current language
              translate.setDefaultLang(iso_639_1)
              // the lang to use, if the lang isn't available, it will use the current loader to get them
              translate.use(iso_639_1)
              this.storage.set('default_lang', iso_639_1);
            })
            .catch(
              e => {
                console.log("getPreferredLanguage(): ", e)
                let iso_639_1 = this.default_language
                // this language will be used as a fallback when a translation isn't found in the current language
                translate.setDefaultLang(iso_639_1)
                // the lang to use, if the lang isn't available, it will use the current loader to get them
                translate.use(iso_639_1)
                this.storage.set('default_lang', iso_639_1);
              }
            )
        }
      })

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log("(app.component.ts) gevents>> Plataform run...")
      this.rootPage = HomePage
      this.appAppearanceProvider.getAppInstance().subscribe(app_appearance => {
        this.app_instance = app_appearance
        //Save in storage
        this.storage.set('app_instance', this.app_instance)
        console.log(`(app.component.ts) gevents>> App Instance: `, this.app_instance)
      })

      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'SingleEventPage', component: SingleEventPage }
      ]

      statusBar.styleDefault()
      //FCM ::::::::::::::::::::::::::::::::::::::::::::::::::::::
      this.fcm.subscribeToTopic('all').catch(() => {
      })

      this.fcm.getToken().then(token => {
        // backend.registerToken(token)
        console.log("(app.component.ts) gevents>> getToken(): " + token)
        this.storage.get('access_token').then(access_token => {
          this.firebaseTokenService.createFirebaseToken(access_token, token).subscribe(data => {
            console.log("api:", JSON.stringify(data))
            // console.log(`(app.component.ts) gevents>> Register token firebase in API: ${ JSON.stringify(data) }` )
          },
            error => {
              console.log("(app.component.ts) gevents>> Error register firebase in api: ", error)
            })
        })
      })

      this.fcm.onNotification().subscribe((data) => {
        console.log("(app.component.ts) fb>>  " + JSON.stringify(data))
        console.log("(app.component.ts) gevents>> data.title " + data.title)
        console.log("(app.component.ts) gevents>> data.message " + data.message)

        if (data.wasTapped) {

          console.log("(app.component.ts) gevents>> Received in background")
          console.log("(app.component.ts) gevents>> onNotification() wasTapped")
          console.log("(app.component.ts) gevents>> onNotification() redirect to FastNotesPage ")

          //Data view 
          if (data.view == "ChatPersonalPage") {

            console.log("(app.component.ts) gevents>> data.token.id_event " + data.token)
            console.log("(app.component.ts) gevents>> data.view  " + data.view + " open chat...")

            let token = JSON.parse(data.token)
            let id_event = token.id_event //JWT
            let id_emisor = token.id_emisor //JWT

            console.log(`(app.component.ts) gevents>> Push `)

            //Open chat personal page
            this.storage.set('chat_personal_intent', true);

            this.nav.setRoot(HomePage, {
              id_event: id_event,
              assistant: {
                idasistente: id_emisor
              }
            })

          } else if (data.view == 'AttendantPage') {

            //Open Attendant page
            this.storage.set('attendant_page_intent', true);
            this.nav.setRoot(HomePage)

          }

        } else {

          console.log("(app.component.ts) gevents>> Received in foreground")
          console.log("(app.component.ts) gevents>> getToken() ")

          if (data.view == "ChatPersonalPage") {
            // this.presentAlertFirebase( "xxx", this.appCtrl.getRootNavs()[0].getActive().name )
          } else {
            this.presentAlertFirebase(data.title, data.message)
          }
        }
      }, error => {
        //alert("Error is "+JSON.stringify(error))
        console.log("Error is " + JSON.stringify(error))
      })

      this.fcm.onTokenRefresh().subscribe(token => {
        // backend.registerToken(token)
        console.log("(app.component.ts) gevents>> onTokenRefresh(): " + token)
        this.storage.get('access_token').then(access_token => {
          this.firebaseTokenService.createFirebaseToken(access_token, token).subscribe(data => {
            console.log(`(app.component.ts) gevents>> Register firebase in API: ${JSON.stringify(data)}`)
          },
            error => {
              console.log("(app.component.ts) gevents>> Error register firebase in api: ", error)
            })
        })
      })

      this.fcm.unsubscribeFromTopic('all')
        .catch(e => console.log('(app.component.ts) gevents>> Error subscribing to topic', e))
      // //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
      splashScreen.hide()
    })
    firebase.initializeApp(fire_base_config)
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault()
      this.splashScreen.hide()
    })
  }

  presentAlertFirebase(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    })
    alert.present()
  }

  //Cerra sesion
  logout() {
    console.log("(app.component.ts) gevents>> App logout")
    //close side menu
    this.menuCtrl.close()
    this.auth.logout().subscribe(is_logout => {
      console.log(`(app.component.ts) gevents> Is logout: ${is_logout}`)
      if (is_logout) {
        // Go to Login page
        this.rootPage = LoginPage
      } else {
        alert(`No se pudo finalizar sesión`)
      }
    }
    )
  }


}
