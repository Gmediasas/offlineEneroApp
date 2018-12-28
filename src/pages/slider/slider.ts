//Ionic
  import { Component } from '@angular/core';
  import { IonicPage, NavController, NavParams } from 'ionic-angular';
  import { LoginPage } from '../login/login'

//Models
  import { AppInstance } from '../../models/app_instance'

//Const
  import { appAppearance } from '../../app/app.constants'

/**
 * Generated class for the SliderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {

  app_instance:AppInstance

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.app_instance = appAppearance
    
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderPage');
  }

}
