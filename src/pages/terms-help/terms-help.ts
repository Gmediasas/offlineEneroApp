import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
/**
 * Generated class for the TermsHelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terms-help',
  templateUrl: 'terms-help.html',
})
export class TermsHelpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private app: AppVersion) {
    this.getVersionCode();
  }

  versionCode: any;

  async getVersionCode() {
    try {
      this.versionCode = await this.app.getVersionCode();
      console.log(this.versionCode);
    } catch (error) {
      console.log(error);
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsHelpPage');
  }

}
