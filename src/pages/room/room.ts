import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
//import { AddRoomPage } from '../add-room/add-room';
import { ChatPage } from '../chat/chat';
import * as firebase from 'firebase/app';
import { UtilitiesComponent } from '../../components/utilities/utilities'

//Constantes
import { environment } from '../../environment/environment';

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {

  rooms = [];
  ref: any = null;
  refRooms: any = null;
  dataEvent: any = null;
  dataUser: any = null;
  dataRoomName = { roomname:'' };
  AppID: any = null;
  eventUID: any = null;
  //ref = firebase.database().ref('chatrooms/');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public utilitiesComponent: UtilitiesComponent,
  ) {
    
    this.AppID = environment.appId;
    this.utilitiesComponent.getCurrentEventUID().then(data => {
        this.eventUID = data;
        console.log("this.eventUID =>",this.eventUID);

        if (this.eventUID && this.eventUID!=null) {

          this.utilitiesComponent.getDataEventByID(this.eventUID).then(dataEvent => {
            this.dataEvent = dataEvent;


            console.log("this.dataEvent =>",this.dataEvent);

            if (this.dataEvent && this.dataEvent!=null) {
              this.ref = firebase.database().ref('Apps/'+this.AppID+'/events/'+this.dataEvent.evntUID+'/chats/chatRoomsEvent/');
              this.ref.on('value', resp => {
                this.rooms = [];
                this.rooms = snapshotToArray(resp);
              });
              /************************************ BEGIN - Creacion de chatroom al inicio - Firebase *************************** */
              this.refRooms = firebase.database().ref('Apps/'+this.AppID+'/events/'+this.dataEvent.evntUID+'/chats/chatRoomsEvent/'+this.dataEvent.evntUID+'/roomname').set(this.dataEvent.evntName);
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
    console.log('ionViewDidLoad RoomPage');
  }

  addRoom() {
    //this.navCtrl.push(AddRoomPage);
  }

  joinRoom(key, dataEvent, dataUser) {
    //alert(JSON.stringify(dataUser));
    this.navCtrl.push(ChatPage, {
      key:key,
      //nickname:'German Pinilla ->'+key,
      nickname: dataUser.firstNameUser+' '+dataUser.lastNameUser,
      event: dataEvent,
      app_id: this.AppID,
      //nickname:this.navParams.get("nickname")
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
