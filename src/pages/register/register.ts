import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { appToken } from '../../app/app.constants'
import { nidevento } from '../../app/app.constants';
import { Storage } from '@ionic/storage'
import { FCM } from '@ionic-native/fcm'
//Models
import { AppInstance } from '../../models/app_instance'

//Providers
import { RegisterProvider } from '../../providers/register/register';
import { EventAppearanceProvider } from '../../providers/event-appearance/event-appearance'
import { EventProvider } from '../../providers/event/event'
import { FirebaseTokenProvider } from '../../providers/firebase-token/firebase-token'
//Const
import { appAppearance } from '../../app/app.constants'
import { appId } from '../../app/app.constants'

//importat interfaces
import { InscripcionAsistenteInterface } from '../../interfaces/inscripcionAsistente';

//pages
import { SingleEventPage } from '../../pages/single-event/single-event'
import { MultiEventPage } from '../../pages/multi-event/multi-event'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  loader: any;
  app_instance: AppInstance
  device: string
  terminos: any = false;

  //Form
  registerForm: FormGroup

  registerModel = {
    user_type: 'asistente',
    type_identification: '',
    identification: '',
    first_name: '',
    last_name: '',
    email: '',
    number_phone: '',
    adress: '',
    password: '',
    repeat_password: '',
    gender: 'M',
    state: 'preinscrito',
    company: '',
    position: '',
  }

  show_error: boolean

  registerCredentials = {
    email: '',
    password: ''
  }
  id_app: string
  data_user: any = { 'firstNameUser': null, 'lastNameUser': null };

  constructor(
    private fcm: FCM,
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private registerProvider: RegisterProvider,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public eventAppearance: EventAppearanceProvider,
    public eventProvider: EventProvider,
    private firebaseTokenService: FirebaseTokenProvider
  ) {
    this.device = eventAppearance.getDevice()
    this.app_instance = appAppearance
    console.log("Apariencia", appAppearance);


    this.registerForm = this.formBuilder.group({

      // area_codes: ['', Validators.compose([Validators.required])],

      tipoAsistente: [this.registerModel.user_type || '', Validators.compose([Validators.required])],

      identification: [this.registerModel.identification || '', Validators.compose([
        Validators.maxLength(30),
        Validators.required
      ])],

      first_name: [this.registerModel.first_name || '', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern("[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+")
      ])],

      last_name: [this.registerModel.last_name || '', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern("[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+")
      ])],

      email: [this.registerModel.email || '', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ])],


      type_identification: [this.registerModel.type_identification || '', Validators.compose([
        Validators.required
      ])],

      number_phone: [this.registerModel.number_phone || '', Validators.compose([

      ])],

      adress: [Validators.compose([Validators.required])],

      password: [this.registerModel.password || '', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])],

      repeat_password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])],
      company: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      position: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      terminos: ['', Validators.compose([
        Validators.requiredTrue
      ])]




    })

  }

  minus() {
    this.registerModel.email = this.registerModel.email.toLowerCase();
  }

  register() {
    console.log("Esto Guarda", this.registerModel);

   if (this.registerForm.valid) {

      if (this.registerModel.password == this.registerModel.repeat_password) {
        this.presentLoading();
        let asistenteInfo = new InscripcionAsistenteInterface(
          nidevento,
          this.registerModel.password,
          'cc',
          'asistente',
          appToken,
          this.registerModel.identification,
          this.registerModel.first_name,
          this.registerModel.last_name,
          this.registerModel.number_phone,
          this.registerModel.adress,
          this.registerModel.email,
          'M',
          'preinscrito',
          this.registerModel.company,
          this.registerModel.position
        );

        console.log("Info a enviar", asistenteInfo);


        this.registerProvider.register(asistenteInfo).subscribe(response => {

          console.log(response)
          this.goingreso(response);
          this.presentAlert("Alerta", "Registro Exitoso");
          this.loader.dismiss();


        },
          error => {
            console.log("error", error);
            this.presentAlert("Error", "Se ha producido un error ");
            this.loader.dismiss();
          })

      } else {

        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Las contraseñas ingresadas no coinciden.',
          buttons: ['Dismiss'],
          cssClass: 'alertPersonalizada'
        });

        alert.present();

      }

    } else {

      this.show_error = true

    }

  }

  goingreso(data: any) {



    console.log("`(register.ts) gevents>> Data server ===>", data);

    if (data.success !== null && data.success !== undefined) {

      console.log(`(register.ts) gevents>> user token ${data.success.token}`)

      //Remenber user token
      this.storage.set('access_token', data.success.token);

      //Remenber my account
      this.recordarCredenciales();

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
          this.presentAlert(data.title, data.message)

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

  presentAlert(title, message) {

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok'],
      cssClass: 'alertPersonalizada'
    });

    alert.present();

  }

  recordarCredenciales() {
    //Save account
    this.registerCredentials.email = this.registerModel.password;
    this.registerCredentials.password = this.registerModel.email;
    this.storage.set('remember_account', this.registerCredentials)
  }

  //Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage')
  }

}
