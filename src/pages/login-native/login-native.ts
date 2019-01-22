
//Ionic
import { IonicPage, Platform, NavController, NavParams, AlertController } from 'ionic-angular'
import { LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { FCM } from '@ionic-native/fcm'
//angular
import { Component } from '@angular/core'
//pages
import { SingleEventPage } from '../../pages/single-event/single-event'
import { MultiEventPage } from '../../pages/multi-event/multi-event'
import { ForgotPage } from '../../pages/forgot/forgot'
//services
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { EventProvider } from '../../providers/event/event'
import { FirebaseTokenProvider } from '../../providers/firebase-token/firebase-token'
import { EventAppearanceProvider } from '../../providers/event-appearance/event-appearance'
import { DatabaseProvider } from '../../providers/database/database';

//Models
import { AppInstance } from '../../models/app_instance'

//Const
import { appAppearance } from '../../app/app.constants'
import { appId } from '../../app/app.constants'
/**
 * Generated class for the LoginNativePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-native',
  templateUrl: 'login-native.html',
})
export class LoginNativePage {

  device: string
  app_instance: AppInstance
  loader: any
  remember: boolean

  registerCredentials = {
    email: '', //ingchrist2003@gmail.com julian.sanchez@sixdegreesit.com.co
    password: '' // Abc123
  }

  id_app: string
  data_user: any = { 'firstNameUser': null, 'lastNameUser': null };

  constructor(
    public platform: Platform,
    private fcm: FCM,
    public eventAppearance: EventAppearanceProvider,
    private firebaseTokenService: FirebaseTokenProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public eventProvider: EventProvider,
    private auth: AuthServiceProvider,
    private database: DatabaseProvider, 
    public storage: Storage) {

    this.device = eventAppearance.getDevice()
    this.app_instance = appAppearance

    //console.log(`(login-native.ts) gevents>> ${this.device}`)
    console.log(
      storage.get('remember_account').then((val) => {
        console.log('Your name is', val);
      })
    );
  }

  // 1. evento
  ionViewDidLoad() {
    this.remember = false
    this.isRememberedAccount()
  }

  public login() {

    //console.log(`(login-native.ts) gevents>> Credenciales: email = ${this.registerCredentials.email} pass = ${this.registerCredentials.password}`)
    this.presentLoading()
    this.auth.login(this.registerCredentials).subscribe(data => {
      console.log("`(login-native.ts) gevents>> Data server ===>", data);
      if (data.success !== null && data.success !== undefined) {
        console.log(`(login-native.ts) gevents>> user token ${data.success.token}`)
        //si el login es correcto se registran en sqlite
        this.database.CreateUserLogin(1).then( (data) => {
          console.log(data);
        }, (error) => {
          console.log(error);
        })
        //Remenber user token
        this.storage.set('access_token', data.success.token);
        //Remenber my account
        this.remenberMe()
        //Firebase
        if (this.device == 'android' || this.device == 'ios')
          this.fcmConnect()
        this.data_user = { 'firstNameUser': data.success.nombres, 'lastNameUser': data.success.apellidos };
        this.id_app = appId
        this.eventProvider.getAllEvents(this.id_app).subscribe(data => {
          this.loader.dismiss() //hide loader
          //App: multi-event
          if (data.length > 1) {
            //Go to events
            this.navCtrl.push(MultiEventPage, {
              id_app: this.id_app,
              data_user: this.data_user
            });
          } else if (data.length == 1) {
            //App: One event
            //Go to event
            this.navCtrl.push(SingleEventPage, {
              event_id: data[0].evntUID,
              data_user: this.data_user
            });
          } else {
            this.loader.dismiss() //hide loader
            alert(`No hay eventos asociados a esta aplicacion`)
          }
        })
      } else {
        this.loader.dismiss() //hide loader
        alert("acceso denegado")
      }
    },
      error => {
        let error_text = ''
        switch (error.status) {
          case 401:
            error_text = "Usuario o contraseña incorrecta"
            break
          case 500:
            error_text = "Hubo un problema de nuestro lado Inténtelo mas tarde"
            break
          default:
            error_text = "Hubo un problema inténtelo mas tarde"
            break
        }
        this.loader.dismiss() //hide loader
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: error_text,
          buttons: ['OK'],
          cssClass: 'alertPersonalizada'
        })
        alert.present()
      })

  }

  // 2. evento
  public isRememberedAccount() {
    console.log("ssdasd");
    //Get storage
    this.storage.get('remember_account').then(remember_account => {
      console.log("Remenber", remember_account);

      var cred = JSON.parse(remember_account);
      console.log(cred);

      if (cred !== null) {
        console.log("estas son las credenciales recuperadas", cred);
        this.registerCredentials.email = cred.email
        this.registerCredentials.password = cred.password
        this.remember = true
      }
    })
    
  }

  public remenberMe() {
    if (this.remember === true) {
      //Save account
      this.storage.set('remember_account', JSON.stringify(this.registerCredentials))
    } else {
      //Delete remembered account
      this.storage.set('remember_account', null)
    }
  }

  fcmConnect() {

    console.log("(login-nativa.ts) gevents>> fcmConnect()")

    this.platform.ready().then(() => {

      //FCM ::::::::::::::::::::::::::::::::::::::::::::::::::::::

      this.fcm.subscribeToTopic('all').catch(() => {

      })

      this.fcm.getToken().then(token => {

        // backend.registerToken(token)

        console.log("(login-nativa.ts) gevents>> getToken(): " + token)

        this.storage.get('access_token').then(access_token => {

          this.firebaseTokenService.createFirebaseToken(access_token, token).subscribe(data => {

            console.log(`(login-nativa.ts) gevents>> Register token firebase in API: ${JSON.stringify(data)}`)

          },
            error => {

              console.log("(login-nativa.ts) gevents>> Error register firebase in api: ", JSON.stringify(error))

            })

        })

      })

      this.fcm.onNotification().subscribe((data) => {


        if (data.wasTapped) {

          console.log("(login-nativa.ts) gevents>> Received in background")
          console.log("(login-nativa.ts) gevents>> onNotification() wasTapped")


        } else {

          console.log("(login-nativa.ts) gevents>> Received in foreground")
          console.log("(login-nativa.ts) gevents>> getToken() ")
          this.presentAlertFirebase(data.title, data.message)

        }

      }, error => {
        //alert("Error is "+JSON.stringify(error))
        console.log("Error is " + JSON.stringify(error));
      })

      this.fcm.onTokenRefresh().subscribe(token => {

        // backend.registerToken(token)
        console.log("(login-nativa.ts) gevents>> onTokenRefresh(): " + token)

        this.storage.get('access_token').then(access_token => {

          this.firebaseTokenService.createFirebaseToken(access_token, token).subscribe(data => {

            console.log(`(login-nativa.ts) gevents>> Register firebase in API: ${JSON.stringify(data)}`)

          },
            error => {

              console.log("(login-nativa.ts) gevents>> Error register firebase in api: ", JSON.stringify(error))

            })

        })

      })

      this.fcm.unsubscribeFromTopic('all')
        .catch(e => console.log('(login-nativa.ts) gevents>> Error subscribing to topic', e))

      //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    })


  }

  presentAlertFirebase(title, message) {

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });

    alert.present();

  }

  goToForgotPage() {
    this.navCtrl.push(ForgotPage)

  }

  //Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })


    this.loader.present()

  }

  minus() {
    this.registerCredentials.email = this.registerCredentials.email.toLowerCase();
  }


}