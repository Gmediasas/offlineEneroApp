import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'
import { LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'

//Pages
import { ProfileEditPage } from '../profile-edit/profile-edit'

//providers
import { ProfileProvider } from '../../providers/profile/profile'

/**
 * Generated class for the ProfileDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-detail',
  templateUrl: 'profile-detail.html',
})
export class ProfileDetailPage {

  loader: any
  refresher: any
  profile: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public profileProvider: ProfileProvider,
    private storage: Storage,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidEnter() {

    this.loader = null
    this.getUserProfile()

  }

  /*ionViewWillEnter() {
  }*/

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

  goToProfileEdit() {

    this.navCtrl.push(ProfileEditPage)

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileDetailPage')
  }

  errorProfilePhoto(event) {

    event.target.src = "assets/img/avatar-default.jpg";

  }

  //Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

  }

  //Pull refresher
  doRefresh(refresher) {

    this.presentLoading() //Show loader
    this.refresher = refresher
    this.getProfile()

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
