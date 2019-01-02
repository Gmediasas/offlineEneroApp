import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular'
import { Network } from '@ionic-native/network';


//pages
  import { RegisterPage } from '../../pages/register/register'
  import { ForgotPage } from '../../pages/forgot/forgot'
  import { LoginNativePage } from '../../pages/login-native/login-native'

//services
  import { EventProvider } from '../../providers/event/event';

//Models
  import { AppInstance } from '../../models/app_instance'

//Const
  import { appAppearance } from '../../app/app.constants'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  app_instance:AppInstance
  estadoConexion:any = 'nada';
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toast :  ToastController,
    private network : Network,
    public eventProvider: EventProvider,
    ) {

    this.app_instance = appAppearance
    
  }

  ionViewDidEnter(){
    this.network.onConnect().subscribe(data => {
      console.log(data);
    }, error => console.error(error));
    
    this.network.onDisconnect().subscribe(data =>{
      console.log(data);
    }, error => console.error(error));
  }

  goToLoginNative(){
    this.navCtrl.push(LoginNativePage)
  }

  goToRegisterPage(){
    
    this.navCtrl.push(RegisterPage)

  }

  goToForgotPage(){
    
    this.navCtrl.push(ForgotPage)

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LoginPage');

  }

}
