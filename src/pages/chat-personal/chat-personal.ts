import { Component, ViewChild } from '@angular/core';
import { App, Nav,IonicPage, NavController, NavParams, Content, AlertController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage'

//Constantes
  import { environment } from '../../environment/environment'
//lib
import * as firebase from 'firebase/app';
  import { UtilitiesComponent } from '../../components/utilities/utilities'
//providers
  import { ProfileProvider } from '../../providers/profile/profile'
  import { FirebasePushNotificationProvider } from '../../providers/firebase-push-notification/firebase-push-notification'
//Pages
  import { AttendantPage } from '../attendant/attendant'
  import { HomePage } from '../home/home'
  import { SingleEventPage } from '../single-event/single-event'

/**
 * Generated class for the ChatPersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-chat-personal',
  templateUrl: 'chat-personal.html',
})
export class ChatPersonalPage {

  @ViewChild(Nav) nav: Nav
  @ViewChild(Content) content: Content;
  data: any = { type:'', nickname:'', message:'', roomname:'' };
  chats = [];
  roomkey:string = '';
  nickname:string;
  eventData:any = {};
  AppID:any = null;
  offStatus:boolean = false;
  ref: any = null
  access_token:string = ''

  app_id:string
  event_id:string
  user_profile: any
  user_receptor:any
  user_emisor:any
  loader:any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public utilitiesComponent: UtilitiesComponent,
    public profileProvider: ProfileProvider,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public firebasePushNotificationProvider: FirebasePushNotificationProvider,
    private storage: Storage,
    public appCtrl: App
  ) {

    //Flag for play with firebase push notification
      this.storage.set('chat_personal_intent', false);

    let id_event_param = navParams.get('id_event')
    
    if ( id_event_param !== null || id_event_param !== undefined) {
      
      let assistant_param = navParams.get('assistant')

      if( assistant_param  !== null || assistant_param !== undefined ){
  
        this.storage.get(`access_token`).then( (access_token) => {
          
          this.access_token = access_token

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
  
  ionViewWillEnter() {
    
    //Flag for firebase push notification
      this.storage.set('chat_personal_intent', false);

  }

  createChat(){

    console.log("createChat()")

    let chat_name = `${Math.min( this.user_emisor.idasistente, this.user_receptor.idasistente )}To${Math.max( this.user_emisor.idasistente, this.user_receptor.idasistente )}`

    this.ref = firebase.database().ref(`Apps/${this.app_id}/events/${this.event_id}/chats/personToPerson/${chat_name}`)
    
    this.roomkey = this.ref.key;


    console.log(`xxLa referencia existe ?:  ` , this.roomkey  )

    let personal_chat = {
      key: this.roomkey
    }


    // this.ref.on('value', resp => {

    //   console.log( `Chats person to person: ` , resp )

    //   personal_chat.key = resp.key
    //   this.roomkey = resp.key

    // })
    this.presentLoading()

    setTimeout(() => {

      //Create chat room
      if( this.roomkey == ''){
        firebase.database().ref(`Apps/${this.app_id}/events/${this.event_id}/chats/personToPerson/${chat_name}`).set(`chat`)
      }

      this.openChat()

    }, 500);

  }

  openChat(){

    this.data.type = 'message';
    this.data.nickname = this.user_profile.nombres+ " "+this.user_profile.apellidos
    this.nickname = this.user_profile.nombres+ " "+this.user_profile.apellidos

    let joinData = firebase.database().ref(`Apps/${this.app_id}/events/${this.event_id}/chats/personToPerson/${this.roomkey}/chats`).push();
 
    console.log(`Nickname : ${this.user_profile.nombres+ " "+this.user_profile.apellidos}`)

    joinData.set({
      type:'join',
      user:this.nickname,
      message: this.nickname +' ha ingresado al chat.',
      sendDate:Date()
    });
    
    this.data.message = '';

    firebase.database().ref(`Apps/${this.app_id}/events/${this.event_id}/chats/personToPerson/${this.roomkey}/chats`).on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);

      this.loader.dismiss() //hide loader

      setTimeout(() => {
        if(this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
      
    });

    

  }

  sendMessage() {
     
     if(this.data.message!= null && this.data.message!=''){

      let newData = firebase.database().ref(`Apps/${this.app_id}/events/${this.event_id}/chats/personToPerson/${this.roomkey}/chats`).push();

      newData.set({
        type:this.data.type,
        user:this.data.nickname,
        message:this.data.message,
        sendDate:Date()
      });

      this.firebasePushNotificationProvider.sendMessageToContact( this.access_token, this.user_receptor.idasistente, this.data.message, this.event_id ).subscribe(response => {

        console.log(response)

      })

      this.data.message = '';

     }


  }

  exitChat(eventData) {
    
    let exitData = firebase.database().ref('Apps/'+this.app_id+'/events/'+this.eventData.event_id+'/chats/chatRoomsEvent/'+this.roomkey+'/chats').push();
    exitData.set({
      type:'exit',
      user:this.nickname,
      //message:this.nickname+' has exited this room.',
      message:this.nickname+' ha salido del chat.',
      sendDate:Date()
    });

    this.offStatus = true;

    // this.navCtrl.push(AttendantPage)

  }

  presentAlert(title, message) {

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });

    alert.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPersonalPage');
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

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
