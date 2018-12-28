import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'

//pages
import { SponsorDetailPage } from '../sponsor-detail/sponsor-detail'
//providers
import { SponsorsProvider } from '../../providers/sponsors/sponsors';

/**
 * Generated class for the SponsorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sponsors',
  templateUrl: 'sponsors.html',
})
export class SponsorsPage {

  loader: any
  refresher: any
  evento_id = null
  sponsors: any

  //Sort
  //Input component data
  direction: number //Asc or Desc
  search_key: string //Key for search in records
  sort_component: any //Component for records sort
  test_options = [{
    label: "Compañía",
    value: "company"
  }, {
    label: "Nivel",
    value: "nivel"
  }]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sponsorsProvider: SponsorsProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {

    this.initSort()

  }

  ionViewDidLoad() {

    this.presentLoading() //Show loader

    //Get storage
    this.storage.get('current_event').then((current_event) => {

      //No exist item storage
      if (current_event !== null) {

        this.evento_id = current_event
        this.getSponsorDetail()

      } else {

        this.loader.dismiss() //hide loader
        alert("el evento no existe")

      }

    }, error => {
      this.loader.dismiss();
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })


  }

  //Get all Sponsors in server or storage
  getSponsorDetail() {

    //Get storage
    this.storage.get(`sponsors_${this.evento_id}`).then((sponsors) => {

      //No exist item storage
      if (sponsors === null) {

        //Server request
        this.getSponsors()

      } else {

        console.log(`Storage request: all sponsors in event(${this.evento_id}) ...`)
        this.sponsors = sponsors
        console.log(`Sponsors(storage): `, this.sponsors)
        this.loader.dismiss() //hide loader

      }

    }, error => {
      this.loader.dismiss();
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })

  }

  //Get all Sponsors in server
  getSponsors() {

    console.log(`Server request: all sponsors in event(${this.evento_id}) ...`)

    this.sponsorsProvider.getSponsors(this.evento_id).subscribe(data => {

      this.sponsors = data
      this.storage.set(`sponsors_${this.evento_id}`, this.sponsors)
      console.log(`Sponsors(server):`, this.sponsors)


      this.pullrefresher();

      this.loader.dismiss() //hide loader

    }, error => {
      this.pullrefresher();
      this.loader.dismiss();
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })

  }

  initSort() {

    this.search_key = 'spnsrName' //Name field default sort
    this.direction = 1 //Default direcion in sort

    //Options select sort
    this.sort_component = {
      label: "Ordenar por",
      options: this.test_options,
      sort_by: this.test_options[0].value, //Option default select sort_by in component
      sort_by_direction: this.direction === 1 ? 'asc' : 'desc' //Direction default select sort_by in component
    }

  }

  sortBy(sort_by_ouput) {

    switch (sort_by_ouput) {

      case 'company':
        this.search_key = 'spnsrName'
        break

      case 'nivel':
        this.search_key = 'spnsrCategory'
        break

    }

  }

  sortByDirection(sort_by_direction_output) {


    switch (sort_by_direction_output) {

      case 'asc':
        this.direction = 1
        break

      case 'desc':
        this.direction = -1
        break

    }

  }

  //Pull refresher
  doRefresh(refresher) {

    this.presentLoading() //Show loader
    this.refresher = refresher
    this.getSponsors()

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
    * Pull refresher
    */
  pullrefresher() {

    if (this.refresher !== undefined) {

      console.log(`Refresher complete...`);
      this.refresher.complete();
      this.refresher = null;

    }
  }

  //Go to detail sponsor page
  goToDeatil(sponsor_id) {

    this.navCtrl.push(SponsorDetailPage, {
      sponsor_id: sponsor_id
    })

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
