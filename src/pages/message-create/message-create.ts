import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { Storage } from '@ionic/storage'

//Constantes
  import { environment } from '../../environment/environment'
//lib
import * as firebase from 'firebase/app';
  import { UtilitiesComponent } from '../../components/utilities/utilities'
//Pages
  import { ChatPersonalPage } from '../chat-personal/chat-personal';
//providers
  import { ProfileProvider } from '../../providers/profile/profile'

/**
 * Generated class for the MessageCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-create',
  templateUrl: 'message-create.html',
})
export class MessageCreatePage {

  app_id:string
  event_id:string
  user_profile: any
  ref: any = null
  rooms = []
  refRooms: any = null
  user_receptor:any
  user_emisor:any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public utilitiesComponent: UtilitiesComponent,
    public profileProvider: ProfileProvider,
    private storage: Storage,
  ) {

    let id_event_param = navParams.get('id_event')
    
    if ( id_event_param !== null || id_event_param !== undefined) {
      
      let assistant_param = navParams.get('assistant')

      if( assistant_param  !== null || assistant_param !== undefined ){
  
        this.storage.get(`access_token`).then( (access_token) => {
        
          this.storage.get(`user_profile`).then( (user_profile) => {

            this.user_profile = user_profile

            this.profileProvider.getProfile( access_token ).subscribe( profile_data => {

              if (profile_data.status !== undefined && profile_data.status !== null) {
    
                if (profile_data.status == 'OK') {

                  this.user_emisor = profile_data.asistente
                  console.log(`User emisor: `,this.user_emisor)

                  this.user_receptor = assistant_param
                  console.log(`User receptor: `,this.user_receptor)
                  
                  this.event_id = id_event_param
                  this.app_id = environment.appId

                  this.createChat()
    
                }
    
              }
    
            })

          })

        })

      }

    }

  }

  createChat(){

    console.log("createChat()")

    let chat_name = `${Math.min( this.user_emisor.idasistente, this.user_receptor.idasistente )}To${Math.max( this.user_emisor.idasistente, this.user_receptor.idasistente )}`

    this.ref = firebase.database().ref(`Apps/${this.app_id}/events/${this.event_id}/chats/personToPerson/${chat_name}`)
    
    let personal_chat = {
      key: ''
    }

    this.ref.on('value', resp => {

      console.log( `Chats person to person: ` , resp )

      this.rooms = resp.val()
      personal_chat.key = resp.key

      console.log(`Rooms: `, this.rooms )

    })

    
    //Create chat room
      // this.refRooms = firebase.database().ref(`Apps/${this.app_id}/events/${this.event_id}/chats/personToPerson/${chat_name}`).set(`chat`)
      // console.log('refRooms: ', this.refRooms )

      this.navCtrl.push(ChatPersonalPage, {
        key:personal_chat.key,
        nickname: this.user_profile.nombres+ " "+this.user_profile.apllidos,
        event: this.event_id,
        app_id: this.app_id,
      });


  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad MessageCreatePage')
    
  }

}
