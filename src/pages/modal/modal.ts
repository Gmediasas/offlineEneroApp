import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
    
  img:string
  title:string
  company:string
  day:string

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public viewCtrl: ViewController,
  ) {

    let img_param = navParams.get('img')

    if (img_param !== null || img_param !== undefined) {

      this.img  = img_param

    }

    let title_param = navParams.get('title')

    if (title_param !== null || title_param !== undefined) {

      this.title = title_param

    }

    let company_param = navParams.get('company')

    if (company_param !== null || company_param !== undefined) {

      this.company = company_param

    }

    let day_param = navParams.get('day')

    if (day_param !== null || day_param !== undefined) {

      this.day  = day_param

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  dismiss() {
    
    this.viewCtrl.dismiss({
      pop:true
    })

  }

}