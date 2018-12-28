import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-chat-conference',
  templateUrl: 'chat-conference.html',
})
export class ChatConferencePage {

  @ViewChild(Content) content: Content;
  data: any = { type:'', nickname:'', message:'', roomname:'' };
  chats = [];
  roomkey:string;
  nickname:string;
  eventData:any = {};
  AppID:any = null;
  scheduleID:any = null;
  scheduleName:any = null;
  offStatus:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.roomkey = this.navParams.get("key") as string;
    this.nickname = this.navParams.get("nickname") as string;
    this.eventData = this.navParams.get("event");
    this.AppID = this.navParams.get("app_id");
    this.scheduleID = this.navParams.get("schedule_id");
    this.scheduleName = this.navParams.get("schedule_name");

    this.data.type = 'message';
    this.data.nickname = this.nickname;

    console.log("this.roomkey =>",this.roomkey);
    console.log("this.nickname =>",this.nickname);
    console.log("this.eventData =>",this.eventData);
    console.log("this.AppID =>",this.AppID);
    console.log("this.scheduleID =>",this.scheduleID);
    console.log("this.scheduleName =>",this.scheduleName);

    let joinData = firebase.database().ref('Apps/'+this.AppID+'/events/'+this.eventData.evntUID+'/chats/chatRoomsConference/'+this.roomkey+'/chats').push();
    joinData.set({
      type:'join',
      user:this.nickname,
      //message:this.nickname+' has joined this room.',
      message:this.nickname+' ha ingresado al chat.',
      sendDate:Date()
    });
    this.data.message = '';

    //firebase.database().ref('chatrooms/'+this.eventData.evntUID+'/'+this.roomkey+'/chats').on('value', resp => {
    firebase.database().ref('Apps/'+this.AppID+'/events/'+this.eventData.evntUID+'/chats/chatRoomsConference/'+this.roomkey+'/chats').on('value', resp => {
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
    let newData = firebase.database().ref('Apps/'+this.AppID+'/events/'+this.eventData.evntUID+'/chats/chatRoomsConference/'+this.roomkey+'/chats').push();
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
    firebase.database().ref().child('Apps/'+this.AppID+'/events/'+this.eventData.evntUID+'/chats/chatRoomsConference/'+this.roomkey).update({ roomname: this.scheduleName });
    // let addRoomRef = firebase.database().ref('chatrooms/'+eventData.evntUID+'/'+this.roomkey).push();
    // addRoomRef.set({
    //   //roomname:this.data.roomname
    //   roomname:eventData.evntName
    // });
    //this.navCtrl.pop();
  }

  exitChat(eventData) {
    //let exitData = firebase.database().ref('chatrooms/'+eventData.evntUID+'/'+this.roomkey+'/chats').push();
    let exitData = firebase.database().ref('Apps/'+this.AppID+'/events/'+this.eventData.evntUID+'/chats/chatRoomsConference/'+this.roomkey+'/chats').push();
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
