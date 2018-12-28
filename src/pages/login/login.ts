import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
//pages
  import { RegisterPage } from '../../pages/register/register'
  import { ForgotPage } from '../../pages/forgot/forgot'
  import { LoginNativePage } from '../../pages/login-native/login-native'

//services
  import { EventProvider } from '../../providers/event/event';
  import { DatabaseProvider } from '../../providers/database/database';


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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public eventProvider: EventProvider,
    private database: DatabaseProvider) {

    this.app_instance = appAppearance
    
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

    console.log('ionViewDidLoad LoginPage')

  }

}
