import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, } from 'ionic-angular';

/**
 * Generated class for the ModalAdsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-ads',
  templateUrl: 'modal-ads.html',
})
export class ModalAdsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalAdsPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
