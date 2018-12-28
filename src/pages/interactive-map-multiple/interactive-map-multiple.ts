import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'

//Pages
import { InteractiveMapPage } from '../interactive-map/interactive-map'
//Providers
import { StandsProvider } from '../../providers/stands/stands'
//Providers
import { InteractiveMapProvider } from '../../providers/interactive-map/interactive-map'

/**
 * Generated class for the InteractiveMapMultiplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-interactive-map-multiple',
  templateUrl: 'interactive-map-multiple.html',
})
export class InteractiveMapMultiplePage {

  loader:any
  refresher:any
  evento_id=null
  interactive_maps:any
  countdata:any

  //Sort
    //Input component data
    direction: number //Asc or Desc
    search_key: string //Key for search in records
    sort_component: any //Component for records sort
    test_options = [{
      label: "Nombre",
      value: "name"
    }]


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public standsProvider: StandsProvider,
    public interactiveMapProvider: InteractiveMapProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController
  ) {

    this.initSort()

  }

  ionViewDidLoad() {
    
    this.presentLoading() //Show loader

    //Get storage
    this.storage.get('current_event').then((current_event) => {

        //No exist item storage
        if( current_event !== null ){

          this.evento_id = current_event
          this.getStandDetail()

        }else{

          this.loader.dismiss() //hide loader
          alert("el evento no existe")

        }

    })


  }

   //Get all Schedule in server or storage
   getStandDetail(){

    //Get storage
    this.storage.get(`interactive_maps_${this.evento_id}`).then((interactive_maps) => {

      //No exist item storage
      if (interactive_maps === null) {

        //Server request
        this.getInteractiveMaps()

      } else {

        console.log(`Storage request: all conferences in event(${this.evento_id}) ...`)
        this.interactive_maps = interactive_maps
        this.countdata = interactive_maps.length
    
        console.log(`interactive_maps(storage): `, this.interactive_maps)
        this.loader.dismiss() //hide loader

      }

    })

  }

  //Get all Sponsors in server
  getInteractiveMaps(){

    console.log(`Server request: all conferences in event(${this.evento_id}) ...`)

    this.interactiveMapProvider.getInteractiveMap(this.evento_id).subscribe(interactive_maps => {

      this.interactive_maps = interactive_maps
      this.countdata = interactive_maps.length
      this.storage.set(`interactive_maps_${this.evento_id}`, this.interactive_maps )
  
      console.log(`Conferences(server):`, this.interactive_maps)

      //Pull refresher
      if(this.refresher !== undefined){

        console.log(`Refresher complete...`)
        this.refresher.complete()
        this.refresher = null

      }

      this.loader.dismiss() //hide loader

    })

  }

  initSort(){

    this.search_key = 'mapa.name' //Name field default sort
    this.direction = 1 //Default direcion in sort

    //Options select sort
    this.sort_component = {
      label: "Ordenar por",
      options: this.test_options,
      sort_by: this.test_options[0].value, //Option default select sort_by in component
      sort_by_direction: this.direction === 1 ? 'asc': 'desc' //Direction default select sort_by in component
    }  
    
  }

  sortBy(sort_by_ouput){

    switch (sort_by_ouput) {

      case 'name':
        this.search_key = 'mapa.name'
        break

    }

  }

  sortByDirection( sort_by_direction_output ){


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
    this.getInteractiveMaps()

  }

  //Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

  }

  goToDeatil(interactive_map_id){

    this.navCtrl.push( InteractiveMapPage, {

      interactive_map_id: interactive_map_id
      
    })

  }

}
