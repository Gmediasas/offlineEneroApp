import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfileContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-contact',
  templateUrl: 'profile-contact.html',
})
export class ProfileContactPage {


  profile:any 

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	let assistant_param = navParams.get('assistant')

    if (assistant_param !== null || assistant_param !== undefined) {

      this.profile = assistant_param
      
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileContactPage');
  }

  errorProfilePhoto(event){

    event.target.src = "assets/img/avatar-default.jpg";

  }


}
