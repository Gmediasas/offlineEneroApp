import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'

//pages 
import { StaticMapDetailPage } from '../static-map-detail/static-map-detail'

//providers
import { StaticMapProvider } from '../../providers/static-map/static-map';

/**
 * Generated class for the StaticMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-static-map',
  templateUrl: 'static-map.html',
})
export class StaticMapPage {

  refresher:any
  loader:any
  maps:any
  evento_id= null

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public staticMapProvider: StaticMapProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
  ) {

    console.log(`Maps static page run...`);

    this.presentLoading() //Show loader
    
    //Get storage
    this.storage.get('current_event').then((current_event) => {
      
        this.evento_id = current_event

        //No exist item storage
        if(this.evento_id !== null ){

          this.evento_id = current_event
          this.getStaticMaps()

        }else{

            this.loader.dismiss() //hide loader
            alert("el evento no existe")

        }
      
    })


  }

  //Get all maps in server or storage
    getStaticMaps(){

      //Get storage
      this.storage.get(`maps_${this.evento_id}`).then((maps) => {
              
          //No exist item storage
          if( maps === null ){

            //Server request
            this.getAllStaticMaps()

          }else{

            console.log(`Storage request...`)
            this.maps= maps
            console.log(`Maps(storage): `,this.maps)
            this.loader.dismiss() //hide loader
          
          }
        
      })

    }

  //Get all maps in server
    getAllStaticMaps(){

      console.log(`Server request: all google maps in event(${this.evento_id}) ...`)

      this.staticMapProvider.getStaticMaps(this.evento_id).subscribe(maps => {

        this.maps = maps
        this.storage.set(`maps_${this.evento_id}`, this.maps )
        console.log(`Maps(server): `,this.maps)

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
      this.getAllStaticMaps()

    }

  //Show loader
    presentLoading() {

      this.loader = this.loadingCtrl.create({
        content: "Un momento por favor...",
        spinner: 'bubbles'
      })
  
      this.loader.present()

    }

  //Go to detail speaker page
    goToDeatil(id_map){

      this.navCtrl.push(StaticMapDetailPage, {
        id_map: id_map
      })

    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad StaticMapPage');
  }

}
