import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
//Constants
import { default_image } from '../../app/app.constants'
//Pages
import { ModalPage } from '../modal/modal'
//Providers
import { GalleryProvider } from '../../providers/gallery/gallery'
//Pipes
import { GroupByPipe } from '../../pipes/group-by.pipe'
//Const
import { appAppearance } from '../../app/app.constants'


/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {

  galleryType = 'regular'
  current_event: string
  gallery: any[]
  recent_gallery: any[]
  appAppearance: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private storage: Storage,
    private galleryProvider: GalleryProvider,
    public alertCtrl: AlertController
  ) {

    this.appAppearance = appAppearance
    this.current_event = ''
    this.gallery = []
    this.recent_gallery = []

    this.storage.get('current_event').then((current_event) => {

      //No exist item storage
      if (current_event !== null) {

        this.current_event = current_event
        this.getGallery()

      } else {

        alert("el evento no existe")

      }

    }, error => {
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })

  }

  getGallery() {

    this.galleryProvider.getGallery(this.current_event).subscribe(gallery => {

      this.gallery = gallery

      console.log(this.gallery)

      console.log("Recent")

      if (this.gallery.length !== 0) {

        let gallery_by_day = new GroupByPipe().transform(this.gallery, 'galFDia')

        this.recent_gallery = gallery_by_day[gallery_by_day.length - 1].value

        console.log("recent_gallery: ", this.recent_gallery);

      }

    }, error => {
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })

  }

  errorLoadImg(event) {

    event.target.src = default_image.user

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage')
  }

  goToOpenBasicModal(image) {

    let myModal = this.modalCtrl.create(ModalPage, {

      img: image.galFImagen,
      title: image.galFTitle,
      company: image.galFEmpresa,
      day: image.galFDia,

    })

    myModal.present()

    myModal.onDidDismiss(data => {
      console.log(data);
    });



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
