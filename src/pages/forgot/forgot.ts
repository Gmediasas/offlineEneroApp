import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular'
import { appToken } from '../../app/app.constants'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'

//Models
import { AppInstance } from '../../models/app_instance'

//Const
import { appAppearance } from '../../app/app.constants'

//importar interface
import { RestorePasswordInterface } from '../../interfaces/restorePassword';

//importar provider 
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {
  //Form
  form: FormGroup
  app_instance: AppInstance
  email: string
  loader: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public authServiceProvider: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {

    this.app_instance = appAppearance
    this.form = this.formBuilder.group({
      email: [this.email || '', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ])]
    })
  }


  goBack() {
    this.navCtrl.pop()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage')
  }

  goToLoginNative() {

    let infoRestorePasw = new RestorePasswordInterface(
      appToken,
      this.email
    );

    this.presentLoading();
    this.authServiceProvider.restorePass(infoRestorePasw).subscribe(response => {

      this.presentAlert("Confirmación", "Se enviará un código a tu correo electrónico");
      this.loader.dismiss();

      this.navCtrl.pop();
    },
      error => {
        console.log("error", error);
        this.presentAlert("Error", "vuelva a intentarlo más tarde");
        this.loader.dismiss();
      })
  }


  //Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

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

  minus() {
    this.email = this.email.toLowerCase();
  }

}
