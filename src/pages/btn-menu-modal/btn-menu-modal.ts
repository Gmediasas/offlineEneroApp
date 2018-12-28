import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MenumodalPage } from '../../pages/menumodal/menumodal';
/**
 * Generated class for the BtnMenuModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-btn-menu-modal',
  templateUrl: 'btn-menu-modal.html',
})
export class BtnMenuModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BtnMenuModalPage');
  }

  openMenuModal(){
    let menu_modal = this.modalCtrl.create(MenumodalPage, { userId: 0 });
    menu_modal.present();
  }

}
