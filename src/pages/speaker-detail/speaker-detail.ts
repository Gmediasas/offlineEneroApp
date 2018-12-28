import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'
import { LoadingController } from 'ionic-angular'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { Storage } from '@ionic/storage'

//services
import { SpeakersProvider } from '../../providers/speakers/speakers'
import { UtilitiesComponent } from '../../components/utilities/utilities'


/**
 * Generated class for the SpeakerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html',
})
export class SpeakerDetailPage {

  refresher: any
  loader: any
  speaker_id = null
  speaker: any = {}
  banDocument: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private iab: InAppBrowser,
    private storage: Storage,
    public speakersProvider: SpeakersProvider,
    public utilitiesComponent: UtilitiesComponent,
    public alertCtrl: AlertController,
  ) {


  }

  ionViewDidLoad() {

    let speaker_id_param = this.navParams.get('speaker_id')

    //App: One event
    if (speaker_id_param === null || speaker_id_param === undefined) {

      alert("el speaker no existe")

    } else {

      this.speaker_id = speaker_id_param
      this.presentLoading()
      this.getSpeakerDetail()

    }

  }

  //Get speaker in server or storage
  getSpeakerDetail() {

    //Get storage
    this.storage.get(`speaker_${this.speaker_id}`).then((speaker) => {

      //No exist item storage
      if (speaker === null) {

        //Server request
        this.getSpeaker()

      } else {

        console.log(`Storage request...`)
        this.speaker = speaker
        this.getNameDocumentInPath()
        console.log(`Speaker(storage): `, this.speaker)
        this.loader.dismiss() //hide loader

      }

    })


  }

  //Get speaker in server
  getSpeaker() {

    this.speakersProvider.getSpeaker(this.speaker_id).subscribe(data => {

      this.speaker = data
      this.storage.set(`speaker_${this.speaker_id}`, this.speaker)
      console.log(`Speaker(server): `, this.speaker)
      this.getNameDocumentInPath()

      //Pull refresher
      if (this.refresher !== undefined) {

        console.log(`Refresher complete...`)
        this.refresher.complete()
        this.refresher = null

      }

      this.loader.dismiss() //hide loader 

    },
      error => {

        this.loader.dismiss() //hide loader 
        this.presentAlertFirebase("Error", "No se puede cargar el perfil de speaker.")
        this.navCtrl.pop();

      })

  }

  presentAlertFirebase(title, message) {

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok'],
      cssClass: 'alertPersonalizada'
    })

    alert.present()

  }

  getNameDocumentInPath() {

    this.speaker.spkDocuments = this.utilitiesComponent.getNameDocumentInPath(this.speaker.spkDocuments)
    console.log(`Documents():`, this.speaker.spkDocuments)
    this.banDocument = this.speaker.spkDocuments.length;
    console.log("Cantidad de documentos", this.banDocument);

  }

  openLink(url) {

    console.log(`gevents>> Open in browser ${url}`)
    this.iab.create(url)

  }

  //Download documents
  download(document) {
    //  const browser = this.iab.create(document)
    window.open(document, '_system', 'location=no')
  }

  //Pull refresher
  doRefresh(refresher) {

    this.presentLoading() //Show loader
    this.refresher = refresher
    this.getSpeaker()

  }

  //Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

  }

}
