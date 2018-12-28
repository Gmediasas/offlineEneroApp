import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular'
import { QuestionsProvider } from '../../providers/questions/quiestionProvider'

/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-personal',
  templateUrl: 'question-personal.html',
})
export class QuestionsPersonalPage {

  loader:any;
  refresher:any;

  dateCreated:any;
  question:any;
  answer:any;
  conferencia:any;
  dateUpdated:any;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public loadingCtrlr: LoadingController,
     public questionsProvider: QuestionsProvider,
    ) {
      this.presentLoading() //Show loader

      this.dateCreated = this.navParams.get('created_at');
      this.question = this.navParams.get('pregunta');
      this.answer = this.navParams.get('respuesta');
      this.conferencia = this.navParams.get('conferencia');
      this.dateUpdated = this.navParams.get('updated_at');

      console.log('this.dateCreated  =>',this.dateCreated );
      console.log('this.question  =>',this.question );
      console.log('this.answer  =>',this.answer );
      console.log('this.dateUpdated  =>',this.dateUpdated );
      this.loader.dismiss() //hide loader

  }

  //Show loader
  presentLoading() {
      this.loader = this.loadingCtrlr.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPersonalPage');
  }

}
