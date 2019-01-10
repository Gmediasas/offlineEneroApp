//Ionic
import { NavController } from 'ionic-angular'
import { MenuController } from 'ionic-angular'
import { LoadingController, NavParams } from 'ionic-angular'
import { Storage } from '@ionic/storage'

//Angular 
import { Component } from '@angular/core'

//pages
import { SingleEventPage } from '../../pages/single-event/single-event'
import { MultiEventPage } from '../../pages/multi-event/multi-event'
import { SliderPage } from '../../pages/slider/slider'
import { ChatPersonalPage } from '../../pages/chat-personal/chat-personal';
import { AttendantPage } from '../../pages/attendant/attendant'

//services
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { EventProvider } from '../../providers/event/event'

//Const
import { appId } from '../../app/app.constants'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loader: any
  id_app: string

  constructor(
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private auth: AuthServiceProvider,
  ) {
    console.log("(home.ts) gevents>> HomePage run...")
  }


  ionViewWillEnter() {
    this.id_app = appId
    this.presentLoading()
    console.log('aca no llega');
    this.auth.isAuthenticated().then((access_token) => {
      if (access_token !== null && access_token !== undefined) {
        console.log("(home.ts) gevents>> User is login: ", access_token)
        this.storage.get('chat_personal_intent').then(chat_intent => {
          if (chat_intent == undefined || chat_intent == null || chat_intent == false) {
            this.storage.get('attendant_page_intent').then(attendant_page_intent => {
              if (attendant_page_intent == undefined || attendant_page_intent == null || attendant_page_intent == false) {
                this.goToEvent() 
              } else {
                this.gotToAttendant()
              }
            })
          } else {
            this.gotToChatPersonal()
          }
        })
      } else {
        console.log("(home.ts) gevents>> User is logout")
        this.loader.dismiss() //hide loader
        this.navCtrl.push(SliderPage)
      }
    })
  }

  goToEvent() {
    this.eventProvider.getAllEvents(this.id_app).subscribe(events => {
      console.log("(home.ts) gevents>> `Server request Events: ", events)
      this.loader.dismiss() //hide loader
      //App: multi-event
      if (events.length > 1) {
        //Save in storage
        this.storage.set('events', events)
        //Go to events
        this.navCtrl.push(MultiEventPage, {
          id_app: this.id_app
        })
      } else if (events.length == 1) {
        //App: One event
        //Go to event
        this.navCtrl.setRoot(SingleEventPage, {
          event_id: events[0].evntUID
        })
      } else {
        this.loader.dismiss() //hide loader
        alert(`No hay aplicaciones asociadas a esta aplicacion`)
      }
    })
  }

  gotToChatPersonal() {
    //Open chat
    let id_event_param = this.navParams.get('id_event')
    if (id_event_param !== null || id_event_param !== undefined) {
      let assistant_param = this.navParams.get('assistant')
      if (assistant_param !== null || assistant_param !== undefined) {
        this.loader.dismiss() //hide loader
        this.navCtrl.push(ChatPersonalPage, {
          id_event: id_event_param,
          assistant: assistant_param
        })
      }
    }
  }

  gotToAttendant() {
    this.loader.dismiss() //hide loader
    this.navCtrl.push(AttendantPage)
  }

  ionViewDidLoad() {
  }

  //Show loader
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })
    this.loader.present()
  }

  openMenu() {
    this.menuCtrl.open()
  }

}
