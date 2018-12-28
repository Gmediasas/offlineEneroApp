import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular'
import { Storage } from '@ionic/storage'

//Constants
import { default_image } from '../../app/app.constants'
//Pages
import { NotificationPage } from '../notification/notification'
import { SurveyPage } from '../survey/survey'
import { CodeQrPage } from '../code-qr/code-qr'
import { ProfileDetailPage } from '../profile-detail/profile-detail'
import { SettingsPage } from '../settings/settings'
import { TermsPage } from '../terms/terms'
import { TermsPrivacyPage } from '../terms-privacy/terms-privacy'
import { TermsHelpPage } from '../terms-help/terms-help'
import { TicketsPage } from '../tickets/tickets'
import { LoginPage } from '../login/login'
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { ChatBotPage } from '../../pages/chat-bot/chat-bot';


//providers
import { ProfileProvider } from '../../providers/profile/profile'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile: any
  access_token: string
  loader: any
  refresher: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private auth: AuthServiceProvider,
    public profileProvider: ProfileProvider,
    private storage: Storage,
    public alertCtrl: AlertController
  ) {

  }

  ionViewDidEnter() {
    this.access_token = ''
    this.storage.get(`access_token`).then((access_token) => {

      this.access_token = access_token
      this.getUserProfile();
    }, error => {
      console.log(" sin Local store");
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })
  }

  getUserProfile() {

    //Get storage
    this.storage.get('user_profile').then((user_profile) => {

      //No exist item storage
      if (user_profile != null) {

        this.profile = user_profile

      } else {

        this.getProfile()
      }

    }, error => {
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })


  }

  getProfile() {

    this.profileProvider.getProfile(this.access_token).subscribe(profile_data => {

      if (profile_data.status !== undefined && profile_data.status !== null) {

        if (profile_data.status == 'OK') {

          this.profile = profile_data.asistente
          this.storage.set(`user_profile`, this.profile)
          console.log(this.profile)

          if (this.loader !== undefined) {
            this.loader.dismiss() //hide loader
          }

          this.pullrefresher();
        }

      }

    }, error => {
      this.pullrefresher();
      this.loader.dismiss();
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })

  }

  //Pull refresher
  doRefresh(refresher) {

    this.presentLoading() //Show loader
    this.refresher = refresher
    this.getProfile()

  }

  //Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

  }

  errorProfilePhoto(event) {

    event.target.src = default_image.user

  }

  goToProfileDetail() {

    this.navCtrl.push(ProfileDetailPage)

  }
  goToNotification() {

    this.navCtrl.push(NotificationPage)

  }
  goToSurvey() {

    this.navCtrl.push(SurveyPage)

  }
  goToCodeQr() {

    this.navCtrl.push(CodeQrPage)

  }
  goToSettings() {

    this.navCtrl.push(SettingsPage)

  }

  goToTerms() {

    this.navCtrl.push(TermsPage)
  }

  goToTermsPrivacy() {

    this.navCtrl.push(TermsPrivacyPage)
  }
  goToTermsHelp() {

    this.navCtrl.push(TermsHelpPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage')
  }
  goToTickets() {
    this.navCtrl.push(TicketsPage, {
    })
  }

  /**
   * Redirecciona a la pagina chat Bot
   */
  goChatBot() {
    this.navCtrl.push(ChatBotPage);
  }

  //Cerra sesion
  logout() {

    console.log("(app.component.ts) gevents>> App logout")

    //close side menu

    this.auth.logout().subscribe(is_logout => {

      console.log(`(app.component.ts) gevents> Is logout: ${is_logout}`)

      if (is_logout) {


        // Go to Login page
        //this.storage.clear();
        this.navCtrl.push(LoginPage);



      } else {

        alert(`No se pudo finalizar sesión`)

      }

    }

    )

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



}
