import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'

//providers
  import { QuestionsProvider } from '../../providers/questions/quiestionProvider'
  import { ConferencesProvider } from '../../providers/conferences/conferences'
//Constants
  import { appToken } from '../../app/app.constants'

/**
 * Generated class for the QuestionAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-add',
  templateUrl: 'question-add.html',
})
export class QuestionAddPage {

  loader:any
  refresher:any
  access_token:string

  dataEvent:any
  dataUser:any
  eventID:any
  schdlID:any
  dataConference:any
  listSchdls:any

  dataQuestion:any = {}

  listConferences:any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    private storage: Storage,
    public questionsProvider: QuestionsProvider,
    public conferencesProvider: ConferencesProvider,
  ) {

    this.access_token = ''

    this.presentLoading() //Show loader

    this.dataEvent = this.navParams.get('event')
    this.dataUser = this.navParams.get('data_user')
    this.eventID = this.navParams.get('event_id')
    this.schdlID = this.navParams.get('conference_id')
    this.listSchdls = this.navParams.get('list_conferences')

    this.dataQuestion.eventID = this.eventID
    this.dataQuestion.schdlID = this.schdlID
    this.dataQuestion.questionDesc = ''

    console.log('this.dataEvent  =>',this.dataEvent )
    console.log('this.dataUser  =>',this.dataUser )
    console.log('this.eventID  =>',this.eventID )
    console.log('this.schdlID  =>',this.schdlID )
    console.log('this.listSchdls  =>',this.listSchdls )


    this.storage.get(`access_token`).then( (access_token) => {

      this.access_token = access_token

      if (!this.listSchdls || this.listSchdls == null) {

        this.conferencesProvider.getListConferences(this.eventID).subscribe(dataList => {

          this.dataConference = dataList
          this.loader.dismiss() //hide loader

        })

      } else {

        this.dataConference = this.listSchdls
        this.loader.dismiss() //hide loader

      }

    })

  }

  selectConference(idConference){

    this.schdlID = idConference
    this.dataQuestion.schdlID = this.schdlID
    console.log('this.listConferences ->',this.listConferences)
    console.log('this.schdlID ->',this.schdlID)
    
  }

  saveQuestion(){

    if( this.dataQuestion.schdlID != undefined){

      if( this.dataQuestion.questionDesc != undefined && this.dataQuestion.questionDesc != ''){

        this.presentLoading() //Show loader

        let body = {
          api_token: appToken, // App
          token_app: this.access_token,  //logeo
          //idAsistente: "1",
          idEvento: this.dataQuestion.eventID,
          idConferencia: this.dataQuestion.schdlID,
          pregunta: this.dataQuestion.questionDesc,
        }
    
        console.log('DATA FORM:', body )
    
        this.questionsProvider.addQuestion(body).subscribe( response => {
          // console.log(`addQuestion() response:`, response)

          this.loader.dismiss() //hide loader
          this.presentAlert( 'Pregunta enviada!', 'Has generado una nueva pregunta! \n Pronto la contestarán!' )

          this.navCtrl.pop()
          
        })

      }else{

        this.presentAlert( 'Error pregunta', 'Por favor escriba su pregunta' )

      }

    }else{

      this.presentAlert( 'Error conferencia', 'Por favor seleccione una conferencia.' )
      
    }

  }

  presentAlert( title, subTitle ){

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Aceptar'],
      cssClass: 'alertPersonalizada'
    })
    
    alert.present()

  }

  //Show loader
  presentLoading() {

    this.loader = this.loadingController.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionAddPage')
  }

}
