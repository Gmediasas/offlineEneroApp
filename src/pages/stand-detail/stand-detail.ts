import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { InAppBrowser } from '@ionic-native/in-app-browser';

//Providers
import { StandsProvider } from '../../providers/stands/stands'
import { UtilitiesComponent } from '../../components/utilities/utilities'

/**
 * Generated class for the StandDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stand-detail',
  templateUrl: 'stand-detail.html',
})
export class StandDetailPage {

  refresher: any
  loader: any
  stand_id = null
  standData: any = {}
  banDocument: any;

  //countdata: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private iab: InAppBrowser,
    public standsProvider: StandsProvider,
    public utilitiesComponent: UtilitiesComponent,
    public alertCtrl: AlertController
  ) {
    this.standData.standLogo = "assets/img/AvatarSpeaker.png";
  }

  ionViewDidLoad() {

    let stand_id_param = this.navParams.get('stand_id')

    //App: One event
    if (stand_id_param === null || stand_id_param === undefined) {

      alert("El Stand no existe")

    } else {

      this.stand_id = stand_id_param
      this.presentLoading()
      this.getStandDetail()

    }

  }

  //Get Stands in server or storage
  getStandDetail() {

    //Get storage
    this.storage.get(`stand_${this.stand_id}`).then((standRes) => {

      //No exist item storage
      if (standRes === null) {

        //Server request
        this.getStand()

      } else {

        console.log(`Storage request...`)
        this.standData = standRes
        this.getNameDocumentInPath()

        console.log(`standRes typeof`, typeof standRes)
        //this.countdata = standRes.length
        console.log(`Stand Detail(storage): `, this.standData)
        this.loader.dismiss() //hide loader

      }

    })

  }

  //Get Stand in server
  getStand() {

    console.log('getStand()');

    this.standsProvider.getStand(this.stand_id).subscribe(data => {

      this.standData = data
      this.getNameDocumentInPath()
      //this.countdata = data.length
      this.storage.set(`stand_${this.stand_id}`, this.standData)
      console.log(`Stand Detail(server): `, this.standData)

      this.pullrefresher();

      this.loader.dismiss() //hide loader

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






  openLink(url) {

    console.log(`gevents>> Open in browser ${url}`)
    this.iab.create(url)

  }

  //Download documents
  download(document) {
    // const browser = this.iab.create(document);
    window.open(document, '_system', 'location=no')
  }

  getNameDocumentInPath() {
    console.log("Prueba", this.standData);

    this.standData.standDocuments = this.utilitiesComponent.getNameDocumentInPath(this.standData.standDocuments)
    console.log(`Documents():`, this.standData.standDocuments)
    this.banDocument = this.standData.standDocuments.length;
    console.log("Cantidad de documentos", this.banDocument);

  }

  //Pull refresher
  doRefresh(refresher) {

    this.presentLoading() //Show loader
    this.refresher = refresher
    this.getStand();
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
