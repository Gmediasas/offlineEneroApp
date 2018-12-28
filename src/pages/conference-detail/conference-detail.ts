import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
//Constants
import { appToken } from '../../app/app.constants';
import { default_image } from '../../app/app.constants';
//Pages
import { QuestionsPage } from '../questions/questions';
import { RoomConferencePage } from '../room-conference/room-conference';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail'
import { ConferencePersonalPage, MyConference } from '../conference-personal/conference-personal'
//Providers
import { ConferencesProvider } from '../../providers/conferences/conferences';
import { UtilitiesComponent } from '../../components/utilities/utilities'

//Models
import { MyAgenda } from '../../models/my_agenda'


/**
 * Generated class for the ConferenceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conference-detail',
  templateUrl: 'conference-detail.html',
})

export class ConferenceDetailPage {

  refresher: any
  loader: any
  schedule_id = null
  schduleData: any = {}
  dataEvent: any = null;
  dataUser: any = null;
  dataRoomName = { roomname: '' };
  AppID: any = null;
  current_event: string
  access_token: string
  banDocument: any;
  myConferencia: boolean;
  scheduleDataDay: any[] = []
  conferences: MyConference[] = []
  myCon: any = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private iab: InAppBrowser,
    public utilitiesComponent: UtilitiesComponent,
    public conferencesProvider: ConferencesProvider,
    public alertCtrl: AlertController
  ) {

    this.access_token = ''
    this.current_event = ''

    this.storage.get(`access_token`).then((access_token) => {
      //createResponseQuestion(survey_id, question_id, respuesta, current_event, access_token )

      this.access_token = access_token

      //Get storage
      this.storage.get('current_event').then((current_event) => {

        //No exist item storage
        if (current_event !== null) {

          this.current_event = current_event

        } else {

          this.loader.dismiss() //hide loader
          alert("el evento no existe")

        }

      })

    })

    let schedule_id_param = navParams.get('schedule_id')


    this.cargarMyconferences(schedule_id_param);
    console.log("this.navParams->data_event =>", this.navParams.data.event);
    console.log("this.navParams->data_user =>", this.navParams.data.data_user);
    this.dataEvent = this.navParams.data.event;
    this.dataUser = this.navParams.data.data_user;
    this.AppID = navParams.get('schedule_id');
    console.log(`App ID: `, this.AppID);



    //App: One event
    if (schedule_id_param === null || schedule_id_param === undefined) {

      alert("La conferencia no existe")

    } else {

      this.schedule_id = schedule_id_param
      this.presentLoading()
      this.getScheduleDetail()

    }
  }

  cargarMyconferences(schedule_id_param: any) {
    let my_conferences = this.navParams.get('my_conferences');
    console.log("my_conferences", my_conferences);

    this.myCon = my_conferences.filter(task =>
      task.idConferencia == schedule_id_param);

    console.log("myCon", this.myCon);

    if (this.myCon.length > 0) {
      this.myConferencia = true;
    }
    else {
      this.myConferencia = false;
    }


  }



  addConference() {

    let body = {
      api_token: appToken, // App
      token_app: this.access_token,  //logeo
      idAsistente: "1",
      idEvento: this.schduleData.schdlEventUID,
      idConferencia: this.schduleData.schdlUID,
      observaciones: "Prueba de observaciones en detalle",
      asistencia: "asistire"
    }
    console.log('body =>', body)

    this.storage.get(`my_schedules_${this.current_event}`).then((Schdls) => {

      var scheduleTemps: any[] = Schdls

      if (!scheduleTemps.find(x => x.schdlUID == this.schduleData.schdlUID)) {
        this.conferencesProvider.userAddConference(body).subscribe(data => {
          let alert = this.alertCtrl.create({
            title: 'Conferencia Agregada',
            subTitle: "Agregada exitosamente",
            buttons: ['OK'],
            cssClass: 'alertPersonalizada'
          });
          alert.present();
          this.myConferencia = true;
          //this.getConferences();
        }, error => {
          let alert = this.alertCtrl.create({
            title: '',
            subTitle: "Error al intentar agregar conferencia",
            buttons: ['OK'],
            cssClass: 'alertPersonalizada'
          });
          alert.present();
        })
      } else {
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: "Esta confenrencia ya esta en tu Agenda",
          buttons: ['OK'],
          cssClass: 'alertPersonalizada'
        });
        alert.present();
      }

    })
  }

  /**
   * Eliminar demis conferencias
   */
  removeConference() {
    let body = {
      api_token: appToken, // App
      token_app: this.access_token, //logeo
      id: this.myCon[0].id
    }

    console.log("este es el id de la conferencia detalleeeee" + this.myCon[0].id);

    this.conferencesProvider.userDeleteConference(body).subscribe(data => {

      let alert = this.alertCtrl.create({
        title: 'Conferencia Eliminada',
        subTitle: "Eliminada exitosamente",
        buttons: ['OK'],
        cssClass: 'alertPersonalizada'
      });
      alert.present();

      this.myConferencia = false;
      this.getMyConferences();
    }, error => {

      this.loader.dismiss() //hide loader

      let alert = this.alertCtrl.create({
        title: '',
        subTitle: "Error al intentar eliminar conferencia",
        buttons: ['OK'],
        cssClass: 'alertPersonalizada'
      });
      alert.present();

    })
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
      this.storage.get(`schedules_${this.dataEvent.evntUID}`).then((Schdls) => {

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


  //Get conferences in server or storage
  getScheduleDetail() {

    //Get storage
    this.storage.get(`schedule_${this.schedule_id}`).then((scheduleRes) => {

      //No exist item storage
      if (scheduleRes === null) {

        //Server request
        this.getSchedule()

      } else {

        console.log(`Storage request...`)
        this.schduleData = scheduleRes
        this.getNameDocumentInPath()
        console.log(`scheduleRes typeof`, typeof scheduleRes)
        //this.countdata = this.schduleData.length
        console.log(`Schedule Detail(storage):`, this.schduleData)
        this.loader.dismiss() //hide loader

      }
    })
  }

  //Get speaker in server
  getSchedule() {

    this.conferencesProvider.getConference(this.schedule_id).subscribe(data => {
      console.log(`Abriendo sh...`)
      this.schduleData = data
      this.getNameDocumentInPath()
      //console.log(`scheduleRes typeof`,typeof scheduleRes)
      //this.countdata = this.schduleData.length
      this.storage.set(`schedule_${this.schedule_id}`, this.schduleData)
      console.log(`Schedule Detail(server): `, this.schduleData)

      //Pull refresher
      if (this.refresher !== undefined) {

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
    this.getSchedule()

  }

  //Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

  }

  errorSpeakerPhoto(event) {

    event.target.src = default_image.user;

  }

  goQuestionsList() {
    this.navCtrl.push(QuestionsPage, {
      //tokenUser: this.token_app
    })
  }

  goChatRoomConference(nameSchedule) {
    console.log("nameSchedule =>", nameSchedule);
    this.navCtrl.push(RoomConferencePage, {
      schedule_id: this.schedule_id,
      schedule_name: nameSchedule,
      event: this.dataEvent,
      data_user: this.dataUser,
      app_id: this.AppID,
    })
  }

  openBrowserVideo(link_video) {


    console.log(`gevents>> Open in browser ${link_video}`)
    this.iab.create(link_video)

  }


  getNameDocumentInPath() {

    this.schduleData.schdlDocuments = this.utilitiesComponent.getNameDocumentInPath(this.schduleData.schdlDocuments)


    this.banDocument = this.schduleData.schdlDocuments.length;
    console.log("Cantidad de documentos", this.banDocument);
  }

  //Download documents
  download(document) {
    // const browser = this.iab.create(document);
    window.open(document, '_system', 'location=no')
  }


  //Go to detail speaker page
  goToSpeakerDeatil(speaker_id) {

    this.navCtrl.push(SpeakerDetailPage, {
      speaker_id: speaker_id
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConferenceDetailPage');
  }

}
