import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { ProfileProvider } from '../../providers/profile/profile';

/**
 * Generated class for the CodeQrDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-code-qr-detail',
  templateUrl: 'code-qr-detail.html',
})
export class CodeQrDetailPage {
  
  profile: any
  loader: any
  refresher: any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public alertCtrl: AlertController,
    public profileProvider: ProfileProvider
    ) {
      let event_param = navParams.get('event');
      console.log(`event_param: ${this.navParams.data.event}`);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodeQrDetailPage');
  }

  ionViewDidEnter(){
    this.loader = null
    this.getUserProfile()
  }

  getUserProfile() {
    //Get storage
    this.storage.get('user_profile').then((user_profile) => {
      //No exist item storage
      if (user_profile !== null) {
        this.profile = user_profile
        console.log("Perfil log", this.profile);
      } else {
        console.log("entro a get profile");
        this.getProfile();
      }
    }, error => {
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })
  }

  getProfile() {
    this.storage.get(`access_token`).then((access_token) => {
      this.profileProvider.getProfile(access_token).subscribe(profile_data => {
        if (profile_data.status !== undefined && profile_data.status !== null) {
          if (profile_data.status == 'OK') {
            this.profile = profile_data.asistente
            this.storage.set(`user_profile`, this.profile)
            console.log(this.profile)
          }
        }

        if (this.loader != null) {
          this.loader.dismiss() //hide loader
        }
        this.pullrefresher();
      }, error => {
        this.pullrefresher();
        this.loader.dismiss();
        this.alertPresent("Error", "Se ha producido un error");
        console.log(error);
      })

    }, error => {
      this.pullrefresher();
      this.loader.dismiss();
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })
  }

    /**
    * Pull refresher
    */
  pullrefresher() {
    if (this.refresher !== undefined) {
      console.log(`Refresher complete...`);
      this.refresher.complete();
      this.refresher = null;
    }
  }


   /**
   * Mensaje alerta
   * @param title 
   * @param subTitle 
   */
  alertPresent(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK'],
      cssClass: 'alertPersonalizada'
    })
    alert.present()
  }

}
