import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { SpeakersProvider } from '../../providers/speakers/speakers'
import { LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'

//Pages 
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail'
/**
 * Generated class for the SpeakersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-speakers',
  templateUrl: 'speakers.html',
})
export class SpeakersPage {

  refresher:any 
  loader:any
  evento_id=null
  speakers:any
  page:number

  //Sort
    //Input component data
    direction: number //Asc or Desc
    search_key: string //Key for search in records
    sort_component: any //Component for records sort
    test_options = [{
      label: "Nombre",
      value: "name"
    },{
      label: "Compañia",
      value: "company"
    },{
      label: "Cargo",
      value: "charge"
    } ]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public speakersProvider: SpeakersProvider,
    private storage: Storage,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController) {

      this.initSort()
   
  }

  ionViewDidLoad() {
    
    this.presentLoading() //Show loader

    //Get storage
    this.storage.get('current_event').then((current_event) => {
     
        //No exist item storage
        if( current_event !== null ){

          this.evento_id = current_event
          this.page = 0;
          this.getSpeakers()
        
        }else{

            this.loader.dismiss() //hide loader
            alert("el evento no existe")

        }
      
    })

  }

  //Get all speakers in server or storage
    getSpeakers(){
       
      //Get storage
      this.storage.get(`speakers_${this.evento_id}`).then((speakers) => {
            
          //No exist item storage
          if( speakers === null ){

            //Server request
            this.getAllSpeakers()

          }else{

            console.log(`Storage request...`)
            this.speakers= speakers
            console.log(`Speakers(storage): `,this.speakers)
            this.loader.dismiss() //hide loader
          
          }
        
      })

    }

  //Get all speakers in server
  getAllSpeakers(){

    console.log(`Server request: all speakers in event(${this.evento_id}) ...`)

    this.speakersProvider.getSpeakersPaged(this.evento_id, 0, this.search_key).subscribe(speakers => {

      this.speakers = speakers
      this.storage.set(`speakers_${this.evento_id}`, this.speakers )
      this.storage.set(`speakers_page_${this.evento_id}`, 0);
      console.log(`Speakers(server): `,this.speakers)

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

      this.search_key = 'title' //Name field default sort
      this.direction = 1 //Default direcion in sort
  
      //Options select sort
      this.sort_component = {
        label: "Ordenar por",
        options: this.test_options,
        sort_by: this.test_options[0].value, //Option default select sort_by in component
        sort_by_direction: this.direction === 1 ? 'asc': 'desc' //Direction default select sort_by in component
      }  
      
    }

    doInfinite(infiniteScroll) {
      //setTimeout(() => {
        //this.getStandDetail();
  
        this.storage.get(`speakers_page_${this.evento_id}`).then((page) => {
  
          //No exist item storage
          if (page === null) {
            this.getAllSpeakers();
            this.loader.dismiss();
            infiniteScroll.complete();
          }else{
            this.page = page+1;
            console.log('actual page: ',this.page)
            this.speakersProvider.getSpeakersPaged(this.evento_id, this.page, this.search_key).subscribe(speakers => {
          
              if(this.speakers == undefined) {
                this.speakers = speakers
              } else {
                speakers.forEach(element => {
                  this.speakers.push(element);
                });
              }
              if(speakers.length>0){
                this.storage.set(`speakers_${this.evento_id}`, this.speakers);
                this.storage.set(`speakers_page_${this.evento_id}`, this.page);
              }
              infiniteScroll.complete();
              console.log(`Speakers(server):`, this.speakers.length)
              this.loader.dismiss() //hide loader
            });
          }
    
        });
  
        
      //}, 1000);
    }

  sortBy(sort_by_ouput){

    switch (sort_by_ouput) {

      case 'name':
        this.search_key = 'title'
        break

      case 'company':
        this.search_key = 'field_empresa_expositor'
        break

      case 'charge':
        this.search_key = 'field_cargo_expositor'
        break

    }

    this.getAllSpeakers();

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
      this.getAllSpeakers()

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
    goToDeatil(speaker_id){

      this.navCtrl.push(SpeakerDetailPage, {
        speaker_id: speaker_id
      })

    }

}
