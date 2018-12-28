import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage'

//Service
import { SponsorsProvider } from '../../providers/sponsors/sponsors';
import { UtilitiesComponent } from '../../components/utilities/utilities'

/**
 * Generated class for the SponsorDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sponsor-detail',
  templateUrl: 'sponsor-detail.html',
})
export class SponsorDetailPage {

  refresher: any
  loader: any
  sponsor: any
  sponsor_id = null
  banDocument: any;



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private iab: InAppBrowser,
    private storage: Storage,
    public sponsorsProvider: SponsorsProvider,
    public utilitiesComponent: UtilitiesComponent,
    public alertCtrl: AlertController
  ) {

  }

  ionViewDidLoad() {
    console.log("Documentos");


    let sponsor_id_param = this.navParams.get('sponsor_id')

    //App: One event
    if (sponsor_id_param === null || sponsor_id_param === undefined) {

      alert("patrocinador no existe")

    } else {

      this.sponsor_id = sponsor_id_param

      this.presentLoading()
      this.getSponsorDetail()

    }

  }

  //Get Sponsor in server or storage
  getSponsorDetail() {

    //Get storage
    this.storage.get(`sponsor_${this.sponsor_id}`).then((sponsor) => {

      //No exist item storage
      if (sponsor === null) {

        //Server request
        this.getSponsor()

      } else {

        console.log(`Storage request...`)

        this.sponsor = sponsor
        this.getNameDocumentInPath()
        console.log(`Sponsor(storage): `, this.sponsor)
        this.loader.dismiss() //hide loader

      }

    }, error => {
      this.loader.dismiss();
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })



  }

  //Get Sponsor in server
  getSponsor() {

    this.sponsorsProvider.getSponsor(this.sponsor_id).subscribe(sponsor => {

      this.sponsor = sponsor
      this.getNameDocumentInPath()

      this.storage.set(`sponsor_${this.sponsor_id}`, this.sponsor)
      console.log(`Sponsor(server): `, this.sponsor)

      this.pullrefresher();

      this.loader.dismiss() //hide loader 

    }, error => {
      this.pullrefresher();
      this.loader.dismiss();
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })

  }

  getNameDocumentInPath() {

    this.sponsor.spnsrDocs = this.utilitiesComponent.getNameDocumentInPath(this.sponsor.spnsrDocs)
    console.log(`Documents():`, this.sponsor.spnsrDocs)

    this.banDocument = this.sponsor.spnsrDocs.length;
    console.log("Cantidad de documentos", this.banDocument);

  }

  openLink(url) {

    console.log(`gevents>> Open in browser ${url}`)
    this.iab.create(url)

  }

  //Download documents
  download(document) {
    //  const browser = this.iab.create(document);
    window.open(document, '_system', 'location=no')
  }

  //Pull refresher
  doRefresh(refresher) {

    this.presentLoading() //Show loader
    this.refresher = refresher
    this.getSponsor()

  }

  //Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

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
