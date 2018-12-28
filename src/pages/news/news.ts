import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular'
import { NewsProvider } from '../../providers/news/news'
import { Storage } from '@ionic/storage'

//pages
import { NewsDetailPage } from '../news-detail/news-detail'

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  loader: any
  refresher: any
  news: any
  evento_id = null
  page: number

  //Sort
  //Input component data
  direction: number //Asc or Desc
  search_key: string //Key for search in records
  sort_component: any //Component for records sort
  test_options = [{
    label: "Título de la noticia",
    value: "title"
  }]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public newsProvider: NewsProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
  ) {

    this.initSort()

  }

  ionViewDidLoad() {


    this.presentLoading() //Show loader

    //Get storage
    this.storage.get('current_event').then((current_event) => {

      //No exist item storage
      if (current_event !== null) {

        this.evento_id = current_event
        this.page = 0;
        this.getNews()


      } else {

        this.loader.dismiss() //hide loader
        alert("el evento no existe")

      }

    }, error => {
      this.loader.dismiss();
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })

  }

  //Get all News in server or storage
  getNews() {

    //Get storage
    this.storage.get(`news_${this.evento_id}`).then((news) => {

      //No exist item storage
      if (news === null) {

        //Server request
        this.getAllNews()

      } else {

        console.log(`Storage request: all news in event(${this.evento_id}) ...`)
        this.news = news
        console.log(`News(storage): `, this.news)
        this.loader.dismiss() //hide loader

      }

    }, error => {
      this.pullrefresher();
      this.loader.dismiss();
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })

  }

  getAllNews() {

    console.log(`Server request: all news in event(${this.evento_id}) ...`)

    this.newsProvider.getNewsPaged(this.evento_id, 0, this.search_key).subscribe(news => {

      this.news = news
      this.storage.set(`news_${this.evento_id}`, this.news)
      this.storage.set(`news_page_${this.evento_id}`, 0);
      console.log(`News(server):`, this.news)

      this.pullrefresher();
      this.loader.dismiss() //hide loader

    }, error => {
      this.pullrefresher();
      this.loader.dismiss();
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })
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

  initSort() {

    this.search_key = 'title' //Name field default sort
    this.direction = 1 //Default direcion in sort

    //Options select sort
    this.sort_component = {
      label: "Ordenar por",
      options: this.test_options,
      sort_by: this.test_options[0].value, //Option default select sort_by in component
      sort_by_direction: this.direction === 1 ? 'asc' : 'desc' //Direction default select sort_by in component
    }

  }

  doInfinite(infiniteScroll) {
    //setTimeout(() => {
    //this.getStandDetail();

    this.storage.get(`news_page_${this.evento_id}`).then((page) => {

      //No exist item storage
      if (page === null) {
        this.getAllNews();
        this.loader.dismiss();
        infiniteScroll.complete();
      } else {
        this.page = page + 1;
        console.log('actual page: ', this.page)
        this.newsProvider.getNewsPaged(this.evento_id, this.page, this.search_key).subscribe(news => {

          if (this.news == undefined) {
            this.news = news
          } else {
            news.forEach(element => {
              this.news.push(element);
            });
          }
          if (news.length > 0) {
            this.storage.set(`news_${this.evento_id}`, this.news);
            this.storage.set(`news_page_${this.evento_id}`, this.page);
          }
          infiniteScroll.complete();
          console.log(`News(server):`, this.news.length)
          this.loader.dismiss() //hide loader
        });
      }

    });


    //}, 1000);
  }

  sortBy(sort_by_ouput) {

    switch (sort_by_ouput) {

      case 'title':
        this.search_key = 'title'
        break
    }

    this.getAllNews();

  }

  sortByDirection(sort_by_direction_output) {


    switch (sort_by_direction_output) {

      case 'asc':
        this.direction = 1
        break

      case 'desc':
        this.direction = -1
        break

    }

  }

  //Pull refresher
  doRefresh(refresher) {

    this.presentLoading() //Show loader
    this.refresher = refresher
    this.getAllNews()

  }

  //Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

  }

  goToDeatil(id_news) {

    this.navCtrl.push(NewsDetailPage, {
      id_news: id_news
    })

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

}
