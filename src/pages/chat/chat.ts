import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  @ViewChild(Content) content: Content;
  data: any = { type:'', nickname:'', message:'', roomname:'' };
  chats = [];
  roomkey:string;
  nickname:string;
  eventData:any = {};
  AppID:any = null;
  offStatus:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.roomkey = this.navParams.get("key") as string;
    this.nickname = this.navParams.get("nickname") as string;
    this.eventData = this.navParams.get("event");
    this.AppID = this.navParams.get("app_id");

    this.data.type = 'message';
    this.data.nickname = this.nickname;

    console.log("this.roomkey =>",this.roomkey);
    console.log("this.nickname =>",this.nickname);
    console.log("this.eventData =>",this.eventData);
    console.log("this.AppID =>",this.AppID);

    //let joinData = firebase.database().ref('chatrooms/'+this.eventData.evntUID+'/'+this.roomkey+'/chats').push();
    //'Apps/'+this.AppID+'/events/'+this.dataEvent.evntUID+'/chats/chats/chatRoomsEvent/'
    let joinData = firebase.database().ref('Apps/'+this.AppID+'/events/'+this.eventData.evntUID+'/chats/chatRoomsEvent/'+this.roomkey+'/chats').push();
    joinData.set({
      type:'join',
      user:this.nickname,
      //message:this.nickname+' has joined this room.',
      message:this.nickname+' ha ingresado al chat.',
      sendDate:Date()
    });
    this.data.message = '';

    //firebase.database().ref('chatrooms/'+this.eventData.evntUID+'/'+this.roomkey+'/chats').on('value', resp => {
    firebase.database().ref('Apps/'+this.AppID+'/events/'+this.eventData.evntUID+'/chats/chatRoomsEvent/'+this.roomkey+'/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if(this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });
  }

  sendMessage(eventData) {
    //let newData = firebase.database().ref('chatrooms/'+eventData.evntUID+'/'+this.roomkey+'/chats').push();
    let newData = firebase.database().ref('Apps/'+this.AppID+'/events/'+this.eventData.evntUID+'/chats/chatRoomsEvent/'+this.roomkey+'/chats').push();
    newData.set({
      type:this.data.type,
      user:this.data.nickname,
      message:this.data.message,
      sendDate:Date()
    });
    this.data.message = '';
    this.addRoom(eventData);
  }

  addRoom(eventData) {
    console.log("eventData =>",eventData);
    //let newData = this.ref.push();
    //let addRoomRef = firebase.database().ref().child('chatrooms/'+eventData.evntUID+'/'+this.roomkey).update({ roomname: eventData.evntName });
    firebase.database().ref().child('Apps/'+this.AppID+'/events/'+this.eventData.evntUID+'/chats/chatRoomsEvent/'+this.roomkey).update({ roomname: eventData.evntName });
    // let addRoomRef = firebase.database().ref('chatrooms/'+eventData.evntUID+'/'+this.roomkey).push();
    // addRoomRef.set({
    //   //roomname:this.data.roomname
    //   roomname:eventData.evntName
    // });
    //this.navCtrl.pop();
  }

  exitChat(eventData) {
    //let exitData = firebase.database().ref('chatrooms/'+eventData.evntUID+'/'+this.roomkey+'/chats').push();
    let exitData = firebase.database().ref('Apps/'+this.AppID+'/events/'+this.eventData.evntUID+'/chats/chatRoomsEvent/'+this.roomkey+'/chats').push();
    exitData.set({
      type:'exit',
      user:this.nickname,
      //message:this.nickname+' has exited this room.',
      message:this.nickname+' ha salido del chat.',
      sendDate:Date()
    });

    this.offStatus = true;

    // this.navCtrl.setRoot(RoomPage, {
    //   nickname:this.nickname
    // });
    // this.navCtrl.push(RoomPage, {
    //   id: "123",
    //   name: "Carl"
    // });
    //this.navCtrl.setRoot(RoomPage);
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
