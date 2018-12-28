import { Component, ViewChild } from '@angular/core'
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'
import { LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { Slides } from 'ionic-angular'
import * as moment from 'moment'

//Constants
import { default_image } from '../../app/app.constants'
//Pages
import { ConferenceDetailPage } from '../conference-detail/conference-detail'
//Pipes
import { GroupByPipe } from '../../pipes/group-by.pipe'
//providers
import { ConferencesProvider } from '../../providers/conferences/conferences'
import { appToken } from '../../app/app.constants'
//Models
import { MyAgenda } from '../../models/my_agenda'
/**
 * Generated class for the ConferencePersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conference-personal',
  templateUrl: 'conference-personal.html',
})
export class ConferencePersonalPage {


  loader: any
  refresher: any
  tokenUser: any
  evento_id = null
  allSchedule: any[] = []
  schedule: any[] = []
  schdle_group: any = []
  current_number_date: string
  current_date: string
  conferences: MyConference[] = []
  countdata: any
  buttonDisabled = null
  access_token: string
  current_event: string
  @ViewChild(Slides) slides: Slides

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public conferencesProvider: ConferencesProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
  ) {


    this.access_token = ''
    this.current_date = ''
    this.current_number_date = ''
    this.schdle_group = []

    this.presentLoading() //Show loader

    this.storage.get(`access_token`).then((access_token) => {
      //createResponseQuestion(survey_id, question_id, respuesta, current_event, access_token )

      this.access_token = access_token

      //Get storage
      this.storage.get('current_event').then((current_event) => {

        //No exist item storage
        if (event !== null) {

          this.current_event = current_event
          this.evento_id = current_event
          this.getConferences()

        } else {

          this.loader.dismiss() //hide loader
          alert("el evento no existe")

        }
      })

    })

  }

  //Get all Sponsors in server
  getConferences() {

    console.log(`Server request: all conferences by user ...`)
    let body = {
      api_token: appToken, // App
      token_app: this.access_token  //acces token
    }

    this.conferencesProvider.userGetConference(body).subscribe(data => {

      this.conferences = JSON.parse(data.response)
      this.storage.set(`myConferences`, this.conferences)
      //Get all schedules of current event
      this.storage.get(`schedules_${this.evento_id}`).then(allSchedule => {


        console.log("conference-personal.ts>> allSchedule:", allSchedule);

        let myAgenda = new MyAgenda()
        this.schedule = myAgenda.saveMySchedule(allSchedule, this.conferences)
        this.storage.set(`my_schedules_${this.current_event}`, this.schedule)
        this.countdata = this.schedule.length

        console.log(`myConferences:`, this.conferences)

        if (this.schedule.length > 0) {

          this.current_date = this.schedule[0].dateStartSchdl
          console.log("my_schedule: ", this.schedule[0].dateStartSchdl)

        }


        this.schdle_group = new GroupByPipe().transform(this.schedule, 'schdlDay')

        this.schdle_group.forEach(group => {

          group.date = group.value[0].dateStartSchdl

        })

        if (this.schdle_group.length > 0) {
          this.current_number_date = this.schdle_group[0].key
        }

        console.log("schdle_group: ", this.schdle_group)


      })

      this.pullrefresher();

      this.loader.dismiss() //hide loader

      }, error => {
        this.pullrefresher();
        this.loader.dismiss();
        this.alertPresent("Error", "Se ha producido un error");
        console.log(error);

      })
  }

  pullrefresher() {
    //Pull refresher
    if (this.refresher !== undefined) {

      console.log(`Refresher complete...`);
      this.refresher.complete();
      this.refresher = null;

    }
  }



  getIdConsecutive(idConferencia): string {
    var result: string
    this.conferences.forEach(element => {
      console.log(idConferencia + " - " + element.idConferencia)
      if (idConferencia == element.idConferencia) {
        result = element.id
      }
    })
    return result
  }

  removeConference(id) {

    this.presentLoading() //Show loader

    let body = {
      api_token: appToken, // App
      token_app: this.access_token, //logeo
      id: this.getIdConsecutive(id)
    }

    this.conferencesProvider.userDeleteConference(body).subscribe(data => {

      this.loader.dismiss() //hide loader

      this.alertPresent('Conferencia Eliminada', "Se eliminó exitosamente")

      var scheduleClear = this.schedule.findIndex(x => x.schdlUID == id)
      this.schedule.splice(scheduleClear, 1)
      this.getConferences()

    }, error => {

      this.loader.dismiss() //hide loader

      this.alertPresent('', "Error al intentar eliminar conferencia")

    })
  }

  // goToDeatil(schedule_id){
  //   this.navCtrl.push(ConferenceDetailPage, {
  //     schedule_id: schedule_id,
  //     event: this.dataEvent,
  //     data_user: this.dataUser,
  //   })
  // }

  alertPresent(title, subTitle) {

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK'],
      cssClass: 'alertPersonalizada'
    })

    alert.present()

  }

  beforeSlide() {

    let currentIndex = this.slides.getActiveIndex() - 1

    if (currentIndex >= 0) {

      this.slides.slideTo(currentIndex, 500)

      if (this.schdle_group[currentIndex] !== undefined) {
        this.current_number_date = this.schdle_group[currentIndex].key

        let cureent_date_moment = moment.unix(Number(this.current_date)).format('YYYY MM DD')
        console.log("moment date:", cureent_date_moment)

      }

      console.log("current", this.current_number_date)

    }

  }

  nextSlide() {

    let currentIndex = this.slides.getActiveIndex() + 1

    if (currentIndex <= this.slides.length()) {

      this.slides.slideTo(currentIndex, 500)

      if (this.schdle_group[currentIndex] !== undefined) {

        this.current_number_date = this.schdle_group[currentIndex].key


        let cureent_date_moment = moment(this.current_date).format('LLLL dd yyyy')
        console.log("moment datex:", cureent_date_moment)

      }

      console.log("current", this.current_number_date)

    }

  }

  goToDeatil(schedule_id) {

    this.navCtrl.push(ConferenceDetailPage, {
      schedule_id: schedule_id
    })

  }

  //Catch error speaker photo   
  errorSpeakerPhoto(event) {

    event.target.src = default_image.user

  }

  //Pull refresher
  doRefresh(refresher) {

    this.presentLoading() //Show loader
    this.refresher = refresher
    this.getConferences()

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
    console.log('ionViewDidLoad MyConferencesPage')
  }

}

export interface MyConference {
  id: string
  idEvento: string
  idConferencia: string
  observaciones: string
  asistencia: string
  idAsistente: string
  created_at: string
  updated_at: string
}
