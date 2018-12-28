import { Component, ViewChild } from '@angular/core'
import { IonicPage, Slides, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

//Constants
import { default_image } from '../../app/app.constants'
//Pages
import { ConferenceDetailPage } from '../conference-detail/conference-detail'
import { ConferencePersonalPage, MyConference } from '../conference-personal/conference-personal'
//providers
import { ConferencesProvider } from '../../providers/conferences/conferences'
import { appToken } from '../../app/app.constants'
//Models
import { MyAgenda } from '../../models/my_agenda'
/**
 * Generated class for the ConferencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conferences',
  templateUrl: 'conferences.html',
})
export class ConferencesPage {

  @ViewChild('slider') slider: any

  loader: any
  refresher: any
  evento_id = null
  current_event: string
  access_token: string
  scheduleDataDay: any[] = []
  scheduleDataInfo: any[] = []
  countdata: any
  buttonDisabled = null
  allSchedule: any[] = []
  conferences: MyConference[] = []
  dataEvent: any = null
  dataUser: any = null
  daysNumber: any = null
  dataDaySchedule: any = null
  currentIndex: any = null
  scheduleDataLength: any[] = []

  //Sort
  //Input component data
  direction: number //Asc or Desc
  search_key: string //Key for search in records

  //My conferences
  schedule: any[] = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public conferencesProvider: ConferencesProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
  ) {

    console.log("gevents>> ConferencesPage constructor()");

    this.access_token = ''
    this.current_event = ''

    this.presentLoading() //Show loader
    this.currentIndex = 0

    console.log(`event_param: ${this.navParams.data.event}`);
    console.log(`data_user_param: ${this.navParams.data.event}`);

    this.dataEvent = this.navParams.data.event
    this.dataUser = this.navParams.data.data_user

    this.search_key = 'dateStartSchdl_UNIX' //Name field default sort
    this.direction = 1 //Default direcion in sort



  }


  ionViewDidEnter() {

    this.storage.get(`access_token`).then((access_token) => {

      this.access_token = access_token

      //Get storage
      this.storage.get('current_event').then((current_event) => {

        //No exist item storage
        if (event !== null) {

          this.evento_id = current_event
          this.current_event = current_event
          this.getConferenceDetail()

        } else {

          this.loader.dismiss() //hide loader
          alert("el evento no existe")

        }

      })

    })

  }

  //Get all Schedule in server or storage
  getConferenceDetail() {

    //Get storage
    this.storage.get(`schedules_${this.evento_id}`).then((Schdls) => {

      //No exist item storage
      if (Schdls === null) {

        //Server request

        this.getConferences()

      } else {

        console.log(`Storage request: all conferences in event(${this.evento_id}) ...`)
        this.scheduleDataDay = Schdls
        this.getPersonalConferences(this.scheduleDataDay)
        //this.countdata = Schdls.length


        console.log(`schelude in storage: `, Schdls)
        if (this.scheduleDataDay.length > 0) {

          this.scheduleDataInfo = this.scheduleDataDay[this.currentIndex].dataSchedls
          this.storage.set(`schedules_${this.evento_id}`, this.scheduleDataDay)

        }

        console.log(`Conferences(storage): `, this.scheduleDataDay)

        this.loader.dismiss() //hide loader

        //Pull refresher
        if (this.refresher !== undefined) {

          console.log(`Refresher complete...`)
          this.refresher.complete()
          this.refresher = null

        }

      }
      //this.getMyConferences()
    })

  }

  //Get all Sponsors in server
  getConferences() {

    console.log(`gevents>> Server request: all conferences in event(${this.evento_id}) ...`)

    this.conferencesProvider.getConferences(this.evento_id).subscribe(data => {
      // console.log(`DATA:`, data)
      // console.log(`DATA(typeof):`, typeof data)
      this.scheduleDataDay = data
      this.getPersonalConferences(this.scheduleDataDay)
      //console.log('​getConferences -> this.scheduleDataDay', this.scheduleDataDay)
      this.scheduleDataInfo = data[this.currentIndex].dataSchedls
      //console.log('​getConferences -> this.scheduleDataInfo', this.scheduleDataInfo)

      this.storage.set(`schedules_${this.evento_id}`, this.scheduleDataDay)
      console.log(`Conferences(server):`, this.scheduleDataDay)

      //Pull refresher
      if (this.refresher !== undefined) {

        console.log(`Refresher complete...`)
        this.refresher.complete()
        this.refresher = null

      }

      this.loader.dismiss() //hide loader

    })

  }

  getPersonalConferences(scheduleDataDay) {

    console.log(`(conferences.ts) gevents>> getPersonalConferences()`)
    let body = {
      api_token: appToken, // App
      token_app: this.access_token  //acces token
    }

    this.conferencesProvider.userGetConference(body).subscribe(data => {

      let my_conferences = JSON.parse(data.response)


      this.conferences = JSON.parse(data.response)

      my_conferences.forEach(my_conference => {

        console.log("my_conference", my_conference) //idConferencia

        scheduleDataDay.forEach(day_conferences => {

          if (day_conferences.dataSchedls != undefined && day_conferences.dataSchedls != null) {

            day_conferences.dataSchedls.forEach(conference => {

              if (Number(conference.schdlUID) == my_conference.idConferencia) {

                conference.asistire = true
                // console.log("asistire: ", my_conference )
                // console.log("asistire: ", conference )

              }

            })

          }

        })


      })

    })

    console.log(scheduleDataDay)

  }

  removeConference(my_conference_id) {

    this.presentLoading() //Show loader

    let body = {
      api_token: appToken, // App
      token_app: this.access_token, //logeo
      id: this.getIdConsecutive(my_conference_id)
    }

    console.log("este es el id de la conferencia" + this.getIdConsecutive(my_conference_id));


    this.conferencesProvider.userDeleteConference(body).subscribe(data => {

      // this.loader.dismiss() //hide loader

      // this.alertPresent( 'Conferencia Eliminada', "Se eliminó exitosamente" )

      // var scheduleClear = this.schedule.findIndex(x => x.schdlUID == my_conference_id)
      // this.schedule.splice(scheduleClear,1)

      // this.presentLoading()

      this.getConferences()

    }, error => {

      this.loader.dismiss() //hide loader

      this.alertPresent('', "Error al intentar eliminar conferencia")

    })
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


  alertPresent(title, subTitle) {

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK'],
      cssClass: 'alertPersonalizada'
    })

    alert.present()

  }

  nextSlide() {
    this.slider.slideNext()
    this.currentIndex = this.slider.getActiveIndex()
    this.scheduleDataInfo = this.scheduleDataDay[this.currentIndex].dataSchedls
    console.log('​nextSlide -> this.scheduleDataInfo', this.scheduleDataInfo)
  }

  previousSlide() {
    this.slider.slidePrev()
    this.currentIndex = this.slider.getActiveIndex()
    this.scheduleDataInfo = this.scheduleDataDay[this.currentIndex].dataSchedls
    console.log('​previousSlide -> this.scheduleDataInfo', this.scheduleDataInfo)
  }

  onSlideChanged(slider: Slides) {
    this.currentIndex = this.slider.getActiveIndex()
    console.log('Slide changed! Current index is', this.currentIndex)
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


  goToConferencePersonal() {
    this.navCtrl.push(ConferencePersonalPage, {})
  }

  addConference(id_conferencia, conferencia) {
    let body = {
      api_token: appToken, // App
      token_app: this.access_token,  //logeo
      //idAsistente: "1",
      idEvento: this.evento_id,
      idConferencia: id_conferencia,
      observaciones: "Prueba de observaciones",
      asistencia: "asistire"
    }

    if (!this.conferences.find(x => x.idConferencia == id_conferencia)) {
      console.log("data conference add =>", body)
      this.conferencesProvider.userAddConference(body).subscribe(data => {
        console.log("response conference add =>", data)
        let alert = this.alertCtrl.create({
          title: 'Conferencia Agregada',
          subTitle: "Agregada exitosamente",
          buttons: ['OK'],
          cssClass: 'alertPersonalizada'
        })
        alert.present()
        conferencia.asistire = true;
        this.getMyConferences()
      }, error => {
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: "Error al intentar agregar conferencia",
          buttons: ['OK'],
          cssClass: 'alertPersonalizada'
        })
        alert.present()
      })
    } else {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: "Esta confenrencia ya esta en tu Agenda",
        buttons: ['OK'],
        cssClass: 'alertPersonalizada'
      })
      alert.present()
    }
  }

  getMyConferences() {

    console.log(`Server request: all conferences by user ...`)
    let body = {
      api_token: appToken, // App
      token_app: this.access_token //logeo
    }

    this.conferencesProvider.userGetConference(body).subscribe(data => {
      console.log("data conference =>", data)
      this.conferences = JSON.parse(data.response)
      this.storage.set(`myConferences`, this.conferences)
      //console.log(`My Conferences(server):`,  this.conferences )
      this.storage.get(`schedules_${this.evento_id}`).then((Schdls) => {

        let myAgenda = new MyAgenda();
        let save_schedule = myAgenda.saveMySchedule(Schdls, this.conferences)
        this.storage.set(`my_schedules_${this.current_event}`, save_schedule)

      })

      //Pull refresher
      if (this.refresher !== undefined) {

        console.log(`Refresher complete...`)
        this.refresher.complete()
        this.refresher = null

      }

      this.loader.dismiss() //hide loader

    })
  }

  saveMySchedule(schedules_data, conferences_data) {

    let save_schedule = []
    // console.log(`Conferences(storage)`, this.allSchedule)
    // console.log(`My Conferences(server):`,  this.conferences )

    if (schedules_data === null) {

      console.log("No hay conferencias en este evento")

    } else {

      conferences_data.forEach(conferences => {

        schedules_data.forEach(schedule_data => {

          let schedule_found = schedule_data.dataSchedls.find(schedule => {

            return conferences.idConferencia == schedule.schdlUID

          })

          if (schedule_found !== undefined && schedule_found !== null) {

            // console.log( `My conference: `, schedule_found )

            let schedule_exist = save_schedule.find(my_schedules => {

              return my_schedules.schdlUID == schedule_found.schdlUID

            })

            if (schedule_exist == undefined && schedule_exist !== null && schedule_exist !== '') {

              schedule_found.dateStartSchdl = schedule_found.dateStartSchdl_UNIX
              schedule_found.dateFinishSchdl = schedule_found.dateFinishSchdl_UNIX

              save_schedule.push(schedule_found)

            } else {

              console.log("shedule all days and save")

            }

          }

          // console.log( `conference: `, schedule_found )

        })

      })

    }

    console.log(save_schedule)
    return save_schedule

  }

  errorSpeakerPhoto(event) {

    event.target.src = default_image.user

  }

  goToDeatil(schedule_id) {
    this.navCtrl.push(ConferenceDetailPage, {
      schedule_id: schedule_id,
      event: this.dataEvent,
      data_user: this.dataUser,
      my_conferences: this.conferences
    })
  }

  goUserConferencesList() {
    this.navCtrl.push(ConferencePersonalPage, {
      //tokenUser: this.token_app
    })
  }


  counter: number = 0
  viewBackColor(): String {
    this.counter++
    console.log(this.counter)
    if (this.counter % 2 == 1) {
      return "backgroundColor1"
    } else {
      return "backgroundColor2"
    }
  }

  ionViewDidLoad() {
    //this.presentLoading()
    console.log('ionViewDidLoad ConferencesPage')
  }

}
