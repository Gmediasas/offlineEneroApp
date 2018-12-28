import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AddRoomPage } from '../add-room/add-room';
import { ChatConferencePage } from '../chat-conference/chat-conference';
import * as firebase from 'firebase/app';
import { UtilitiesComponent } from '../../components/utilities/utilities'

//Constantes
import { environment } from '../../environment/environment';

@IonicPage()
@Component({
  selector: 'page-room-conference',
  templateUrl: 'room-conference.html',
})
export class RoomConferencePage {

  rooms = [];
  dataRoomName = { roomname:'' };
  ref: any = null;
  refRooms: any = null;
  dataEvent: any = null;
  dataUser: any = null;
  AppID: any = null;
  scheduleID: any = null;
  scheduleName: any = null;
  eventUID: any = null;
  //ref = firebase.database().ref('chatrooms/');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public utilitiesComponent: UtilitiesComponent,
  ) {

    console.log("1 - schedule_id =>",this.navParams.data.schedule_id);
    console.log("2 - event =>",this.navParams.data.event);
    console.log("3 - data_user =>",this.navParams.data.data_user);
    console.log("4 - app_id =>",this.navParams.data.app_id);
    console.log("5 - schedule_name =>",this.navParams.data.schedule_name);
    // this.dataEvent = this.navParams.data.event;
    // this.dataUser = this.navParams.data.data_user;
    // this.AppID = environment.appId;
    this.scheduleID = this.navParams.data.schedule_id;
    this.scheduleName = this.navParams.data.schedule_name;
    // console.log(`App ID: `,this.AppID);
    // //this.ref = firebase.database().ref('chatrooms/'+this.dataEvent.evntUID+'/');
    // this.ref = firebase.database().ref('Apps/'+this.AppID+'/events/'+this.dataEvent.evntUID+'/chats/chatRoomsConference/');
    // this.ref.on('value', resp => {
    //   this.rooms = [];
    //   this.rooms = snapshotToArray(resp);
    // });
    //
    //
    // /*
    // *********************************** BEGIN - Creacion de chatroom al inicio - Firebase *************************** */
    // this.refRooms = firebase.database().ref('Apps/'+this.AppID+'/events/'+this.dataEvent.evntUID+'/chats/chatRoomsConference/'+this.scheduleID+'/roomname').set(this.scheduleName);
    // /************************************ END - Creacion de chatroom al inicio - Firebase ***************************/

    this.AppID = environment.appId;
    this.utilitiesComponent.getCurrentEventUID().then(data => {
        this.eventUID = data;
        console.log("this.eventUID =>",this.eventUID);

        if (this.eventUID && this.eventUID!=null) {

          this.utilitiesComponent.getDataEventByID(this.eventUID).then(dataEvent => {
            this.dataEvent = dataEvent;


            console.log("this.dataEvent =>",this.dataEvent);

            if (this.dataEvent && this.dataEvent!=null) {
              //this.ref = firebase.database().ref('Apps/'+this.AppID+'/events/'+this.dataEvent.evntUID+'/chats/chatRoomsEvent/');
              this.ref = firebase.database().ref('Apps/'+this.AppID+'/events/'+this.dataEvent.evntUID+'/chats/chatRoomsConference/');
              this.ref.on('value', resp => {
                this.rooms = [];
                this.rooms = snapshotToArray(resp);
              });
              //alert("this.scheduleID => "+this.scheduleID);
              /************************************ BEGIN - Creacion de chatroom al inicio - Firebase *************************** */
              //this.refRooms = firebase.database().ref('Apps/'+this.AppID+'/events/'+this.dataEvent.evntUID+'/chats/chatRoomsEvent/'+this.dataEvent.evntUID+'/roomname').set(this.dataEvent.evntName);
              this.refRooms = firebase.database().ref('Apps/'+this.AppID+'/events/'+this.dataEvent.evntUID+'/chats/chatRoomsConference/'+this.scheduleID+'/roomname').set(this.scheduleName);
              /************************************* END - Creacion de chatroom al inicio - Firebase *****************************/
              this.utilitiesComponent.getDataUserSession().then(dataUser => {
                this.dataUser = dataUser;
              });

            } else {
              console.log("this.dataEvent not found!");
            }

          });

        } else {
          console.log("this.eventUID not found!");
        }

    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomConferencePage');
  }

  addRoom() {
    //this.navCtrl.push(AddRoomPage);
  }

  joinRoom(key, dataEvent) {
    this.navCtrl.push(ChatConferencePage, {
      key:key,
      nickname: this.dataUser.firstNameUser+' '+this.dataUser.lastNameUser,
      event: dataEvent,
      app_id: this.AppID,
      data_user: this.dataUser,
      schedule_id: this.scheduleID,
      schedule_name: this.scheduleName,
    });
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
