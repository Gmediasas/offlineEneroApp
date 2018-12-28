import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular'
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage'
//provider
import { NewsProvider } from '../../providers/news/news'

/**
 * Generated class for the NewsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage {

  refresher: any
  loader: any
  news: any
  id_news = null

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public newsProvider: NewsProvider,
    public loadingCtrl: LoadingController,
    private iab: InAppBrowser,
    private storage: Storage,
    public alertCtrl: AlertController,
  ) {

  }

  ionViewDidLoad() {


    let id_news_param = this.navParams.get('id_news')

    //App: One event
    if (id_news_param === null || id_news_param === undefined) {

      alert("el speaker no existe")

    } else {

      this.id_news = id_news_param

      this.presentLoading()
      this.getNewsDetail()

    }

  }

  //Get News in server or storage
  getNewsDetail() {

    //Get storage
    this.storage.get(`news_deatil_${this.id_news}`).then((news) => {

      //No exist item storage
      if (news === null) {

        //Server request
        this.getNews()

      } else {

        console.log(`Storage request...`)
        this.news = news
        console.log(`News detail(storage): `, this.news)
        this.loader.dismiss() //hide loader

      }

    }, error => {
      this.loader.dismiss();
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })

  }


  //Get News in server
  getNews() {

    this.newsProvider.getNewsDetail(this.id_news).subscribe(news => {

      this.news = news
      this.storage.set(`news_deatil_${this.id_news}`, this.news)
      console.log(`Sponsor(server): `, this.news)

      this.pullrefresher();

      this.loader.dismiss() //hide loader 

    }, error => {
      this.pullrefresher();
      this.loader.dismiss();
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })

  }

  //Download documents
  download(document) {
    this.iab.create(document);
  }

  openLink(url) {

    console.log(`gevents>> Open in browser ${url}`)
    this.iab.create(url)

  }

  //Pull refresher
  doRefresh(refresher) {

    this.presentLoading() //Show loader
    this.refresher = refresher
    this.getNews()

  }

  //Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

  }

  /**
   * Mensaje alerta
   * @param title 
   * @param subTitle 
   */
  alertPresent(title, subTitle) {

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK'],
      cssClass: 'alertPersonalizada'
    })
    alert.present()
  }

  /**
  * Pull refresher
  */
  pullrefresher() {

    if (this.refresher !== undefined) {

      console.log(`Refresher complete...`);
      this.refresher.complete();
      this.refresher = null;

    }
  }
}
