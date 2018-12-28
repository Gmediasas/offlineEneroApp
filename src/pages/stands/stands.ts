import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'
import { LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'

//Pages
import { StandDetailPage } from '../stand-detail/stand-detail'
//Providers
import { StandsProvider } from '../../providers/stands/stands'
/**
 * Generated class for the StandsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stands',
  templateUrl: 'stands.html',
})
export class StandsPage {

  loader: any
  refresher: any
  evento_id = null
  stands: any
  countdata: any
  page: number

  //Sort
  //Input component data
  direction: number //Asc or Desc
  search_key: string //Key for search in records
  sort_component: any //Component for records sort
  test_options = [{
    label: "Compañía",
    value: "company"
  }, {
    label: "Número de stand",
    value: "stand_name"
  }]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public standsProvider: StandsProvider,
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
        this.getStandDetail()
        this.page = 0;

      } else {

        this.loader.dismiss() //hide loader
        alert("el evento no existe")

      }

    })

  }

  //Get all Schedule in server or storage
  getStandDetail() {

    //Get storage
    this.storage.get(`stands_${this.evento_id}`).then((stands) => {

      //No exist item storage
      if (stands === null) {
        this.getStands();
      } else {
        console.log(`Storage request: all conferences in event(${this.evento_id}) ...`);
        this.stands = stands;
        this.countdata = this.stands.length;
        console.log(`Stands(storage): `, this.stands);
        this.loader.dismiss();
      }

    })

  }

  //Get all Sponsors in server
  /* getStands() {
 
     console.log(`Server request: all conferences in event(${this.evento_id}) ...`)
 
     this.standsProvider.getStands(this.evento_id).subscribe(stands => {
 
       this.stands = stands
       this.countdata = stands.length
       this.storage.set(`stands_${this.evento_id}`, this.stands)
 
       console.log(`Conferences(server):`, this.stands)
 
       //Pull refresher
       if (this.refresher !== undefined) {
 
         console.log(`Refresher complete...`)
         this.refresher.complete()
         this.refresher = null
 
       }
 
       this.loader.dismiss() //hide loader
 
     })
 
   }*/


  getStands() {

    console.log(`Server request: all conferences in event(${this.evento_id}) ...`)

    this.standsProvider.getStandsPaged(this.evento_id, 0, this.search_key).subscribe(stands => {

      this.stands = stands
      this.countdata = this.stands.length;
      this.storage.set(`stands_${this.evento_id}`, this.stands);
      this.storage.set(`stands_page_${this.evento_id}`, this.page);
      console.log(`Conferences(server):`, this.stands);


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

  initSort() {

    this.search_key = 'field_compania_stand' //Name field default sort
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
        this.search_key = 'field_compania_stand'
        break

      case 'stand_name':
        this.search_key = 'title'
        break

    }

    this.getStands();

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
    this.getStands()

  }

  //Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

  }

  goToDeatil(stand_id) {

    this.navCtrl.push(StandDetailPage, {
      stand_id: stand_id
    })

  }

  doInfinite(infiniteScroll) {


    this.storage.get(`stands_page_${this.evento_id}`).then((page) => {

      if (page === null) {
        this.getStands();
        this.loader.dismiss();
        infiniteScroll.complete();
      } else {
        this.page = page + 1;
        console.log('actual page: ', this.page)
        this.standsProvider.getStandsPaged(this.evento_id, this.page, this.search_key).subscribe(stands => {

          if (this.stands == undefined) {
            this.stands = stands
          } else {
            stands.forEach(element => {
              this.stands.push(element);
            });
          }
          this.storage.set(`stands_${this.evento_id}`, this.stands);
          this.storage.set(`stands_page_${this.evento_id}`, this.page);
          this.countdata = this.stands.length;
          infiniteScroll.complete();
          console.log(`Conferences(server):`, this.stands.length)
          this.loader.dismiss() //hide loader
        });
      }

    });


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
