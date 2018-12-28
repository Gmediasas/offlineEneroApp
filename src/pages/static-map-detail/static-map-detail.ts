import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'

//provider
  import { StaticMapProvider } from '../../providers/static-map/static-map';

/**
 * Generated class for the StaticMapDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-static-map-detail',
  templateUrl: 'static-map-detail.html',
})
export class StaticMapDetailPage {

  refresher:any
  loader:any
  map:any
  id_map = null

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public staticMapProvider: StaticMapProvider
  ) {

    let id_map_param = navParams.get('id_map')

    //App: One event
    if (id_map_param === null || id_map_param === undefined) {

      alert("el speaker no existe")

    } else {

      this.id_map = id_map_param
      this.presentLoading()
      this.getMapDetail()
   
    }

  }

  //Get map in server or storage
    getMapDetail(){

      //Get storage
      this.storage.get(`map_${this.id_map}`).then((map) => {
              
          //No exist item storage
          if( map === null ){

            //Server request
            this.getMap()

          }else{

            console.log(`Storage request...`)
            this.map= map
            console.log(`Map(storage): `,this.map)
            this.loader.dismiss() //hide loader
          
          }
        
      })

    }

  //Get map in server
    getMap(){

      this.staticMapProvider.getMap(this.id_map).subscribe(map => {

        this.map = map
        this.storage.set(`map_${this.id_map}`, this.map )
        console.log(`Map(server): `, this.map)  

        //Pull refresher
        if(this.refresher !== undefined){
      
          console.log(`Refresher complete...`)
          this.refresher.complete()
          this.refresher = null

        }

        this.loader.dismiss() //hide loader 

      })

    }

  //Pull refresher
    doRefresh(refresher) {

      this.presentLoading() //Show loader
      this.refresher = refresher
      this.getMap()

    }

  //Show loader
    presentLoading() {

      this.loader = this.loadingCtrl.create({
        content: "Un momento por favor...",
        spinner: 'bubbles'
      })
  
      this.loader.present()

    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad StaticMapDetailPage');
  }

}
