import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
//Pages
import { QuestionAddPage } from '../question-add/question-add'
import { QuestionsPersonalPage } from '../question-personal/question-personal'
//providers
import { QuestionsProvider } from '../../providers/questions/quiestionProvider'
import { ConferencesProvider } from '../../providers/conferences/conferences'

//Constants
import { appToken } from '../../app/app.constants'

/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {

  dataEvent: any = null
  dataUser: any = null
  evento_id: any = null
  loader: any
  refresher: any
  question: any[] = []
  countdata: any
  access_token: any
  dataQuestions: any
  dataInitQuestions: any
  dataConference: any
  conferencia_id: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public questionsProvider: QuestionsProvider,
    public conferencesProvider: ConferencesProvider,
    private storage: Storage, ) {

    this.presentLoading() //Show loader

    this.access_token = ''
    this.evento_id = ''
    this.dataEvent = this.navParams.data.event
    this.dataUser = this.navParams.data.data_user

  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {

    //Get questions
    this.storage.get(`access_token`).then((access_token) => {

      this.access_token = access_token

      this.storage.get('current_event').then((current_event) => {

        //No exist item storage
        if (event !== null) {

          this.evento_id = current_event
          this.getQuestionDetail()
          console.log("this.navParams =>", this.navParams.data.event)
          console.log("this.navParams =>", this.navParams.data.data_user)

        } else {

          this.loader.dismiss() //hide loader
          alert("el evento no existe")

        }

      }, error => {
        this.pullrefresher();
        this.loader.dismiss();
        this.alertPresent("Error", "Se ha producido un error");
        console.log(error);

      })

    }, error => {
      this.pullrefresher();
      this.loader.dismiss();
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);

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

  //Get all Questions in Storage
  getQuestionDetail() {

    // //Get storage
    // this.storage.get(`questions_${this.evento_id}`).then((QuestRes) => {

    //   //No exist item storage
    //   if (QuestRes === null) {

    //Server request
    this.getQuestions()

    //   } else {

    //     this.dataQuestions = QuestRes
    //     this.dataInitQuestions = QuestRes

    //     console.log(`Questions(storage): `, this.dataQuestions)
    //     this.loader.dismiss() //hide loader
    //     //Pull refresher
    //     if(this.refresher !== undefined){

    //       console.log(`Refresher complete...`)
    //       this.refresher.complete()
    //       this.refresher = null

    //     }

    //   }
    //   //this.getMyConferences()
    // })


  }

  //Get all Questions in Storage
  getQuestions() {


    console.log(`Server request: all questions in event(${this.evento_id}) ...`)

    let body = {
      api_token: appToken, // App
      token_app: this.access_token,  //logeo
      //idAsistente: "1",
      idEvento: this.evento_id,
      idConferencia: this.conferencia_id,
      //observaciones: "Test",
      //asistencia: "asistire"
    }

    this.questionsProvider.getQuestions(body).subscribe(data => {

      console.log('DATA:', JSON.parse(data.response))
      this.dataQuestions = JSON.parse(data.response)
      this.dataInitQuestions = JSON.parse(data.response)

      this.conferencesProvider.getListConferences(this.evento_id).subscribe(conferences => {

        this.dataConference = conferences

        this.dataQuestions.forEach(question => {

          this.dataConference.forEach(conference => {


            if (conference.schdlUID == question.idConferencia) {

              question.conferencia = conference.schdlName

            }

          })

        })

        this.storage.set(`questions_${this.evento_id}`, this.dataQuestions)
        this.loader.dismiss() //hide loader
        this.pullrefresher();
      }, error => {
        this.pullrefresher();
        this.loader.dismiss();
        this.alertPresent("Error", "Se ha producido un error");
        console.log(error);

      })
    }, error => {
      this.pullrefresher();
      this.loader.dismiss();
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })

  }

  selectConference(idConference) {
    console.log("<<<<<<<< Testtttttt >>>>>>>>")
    //alert(JSON.stringify(idConference))
    this.conferencia_id = idConference
    console.log('filer----->', this.filterQuestions(this.conferencia_id))
    console.log('this.dataQuestions =>', this.dataQuestions)
  }


  goToQuestionAdd() {

    this.navCtrl.push(QuestionAddPage, {
      event: this.dataEvent,
      event_id: this.evento_id,
      data_user: this.dataUser,
      conference_id: this.conferencia_id,
      list_conferences: this.dataConference,
    })

  }

  goToQuestionsPersonal(question) {
    // console.log('question =>',question)
    this.navCtrl.push(QuestionsPersonalPage,
      question)

  }

  //Pull refresher
  doRefresh(refresher) {

    this.presentLoading() //Show loader
    this.refresher = refresher
    this.getQuestions()

  }

  //Show loader
  presentLoading() {
    this.loader = this.loadingController.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()
  }

  filterQuestions(param: any): void {

    this.dataQuestions = this.dataInitQuestions

    let val: string = param

    // DON'T filter the technologies IF the supplied input is an empty string
    if (val.trim() !== '') {
      this.dataQuestions = this.dataQuestions.filter((item) => {
        return item.idConferencia == val
      })
    }
  }

  resetFilter() {
    this.dataQuestions = this.dataInitQuestions
  }

}
