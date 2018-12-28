import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// PAGES
import {CodeQrDetailPage} from '../code-qr-detail/code-qr-detail'
/**
 * Generated class for the CodeQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-code-qr',
  templateUrl: 'code-qr.html',
})
export class CodeQrPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodeQrPage');
  }
  goToCodeQrDetail(){

    this.navCtrl.push(CodeQrDetailPage)

  }

}
