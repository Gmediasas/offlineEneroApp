import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
//Pages
  import {SurveyDetailPage} from '../survey-detail/survey-detail'
//Providers
  import { SurveyProvider } from '../../providers/survey/survey'
/**
 * Generated class for the SurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html',
})
export class SurveyPage {

  refresher:any 
  loader:any
  surveys:any
  evento_id:any

   //Sort
    //Input component data
    direction: number //Asc or Desc
    search_key: string //Key for search in records
    sort_component: any //Component for records sort
    test_options = [{
      label: "Encuesta",
      value: "name"
    },{
      label: "Conferencia",
      value: "conference"
    } ]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public survey_provider: SurveyProvider,
    public loadingCtrl: LoadingController,
  ) {

    this.evento_id = null
    this.initSort()

  }

  ionViewDidLoad() {

    this.presentLoading() //Show loader

    //Get storage
    this.storage.get('current_event').then((current_event) => {
     
      //No exist item storage
      if( current_event !== null ){

        this.evento_id = current_event
        this.getSurveys()
      
      }else{

        this.loader.dismiss() //hide loader
        alert("No existen encuestas.")

      }
    
  })
    
  }

  //Get all surveys in server or storage
    getSurveys(){

      //Get storage
      this.storage.get(`surveys_${this.evento_id}`).then((surveys) => {
              
          //No exist item storage
          if( surveys === null ){

            //Server request
            this.getAllSurveys()

          }else{

            console.log(`Storage request...`)
            this.surveys= surveys
            console.log(`Surveys(storage): `,this.surveys)
            this.loader.dismiss() //hide loader
          
          }
        
      })

    }

    //Get all speakers in server
    getAllSurveys(){

      this.survey_provider.getSurveys(this.evento_id).subscribe( surveys => {

        this.surveys = surveys


        this.storage.set(`surveys_${this.evento_id}`, this.surveys )
        
        console.log(`Surveys(server): `,this.surveys)

        //Pull refresher
        if(this.refresher !== undefined){
    
          console.log(`Refresher complete...`)
          this.refresher.complete()
          this.refresher = null

        }

        this.loader.dismiss() //hide loader

      })

    }
  
  //Survey detail
    goToSurveyDetail(survey_id){

      this.navCtrl.push(SurveyDetailPage, {
        evento_id: this.evento_id,
        survey_id: survey_id
      })
  
    }

  //sort
    initSort(){

      this.search_key = 'standCompany' //Name field default sort
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
          this.search_key = 'name'
          break
  
        case 'conference':
          this.search_key = 'conference'
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
      this.getAllSurveys()

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
