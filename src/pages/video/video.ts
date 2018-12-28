import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, ModalController, Loading, LoadingController, AlertController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser'

//Pages
import { ModalVideoPage } from '../modal-video/modal-video'
//Provider
import { VideoProvider } from '../../providers/video/video'
//Const
import { appAppearance } from '../../app/app.constants'
//Pipes
import { GroupByPipe } from '../../pipes/group-by.pipe'

/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {

  VideoType = 'regular'
  current_event: string
  gallery: any[]
  recent_gallery: any[]
  appAppearance: any
  trustedVideoUrl: SafeResourceUrl
  loading: Loading

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private videoProvider: VideoProvider,
    private domSanitizer: DomSanitizer,
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
        this.getVideos()

      } else {

        alert("el evento no existe")

      }

    }, error => {
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })

  }

  getVideos() {

    this.loading = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loading.present()

    this.videoProvider.getVideos(this.current_event).subscribe(video_gallery => {

      this.gallery = video_gallery

      console.log(this.gallery)

      this.gallery.forEach(video => {

        video.loading = true
        video.trustedVideoUrl = this.getEmbedVideo(video.galVImagen)

      })

      console.log("Recent")

      if (this.gallery.length !== 0) {

        let gallery_by_day = new GroupByPipe().transform(this.gallery, 'galVDia')
        this.recent_gallery = gallery_by_day[gallery_by_day.length - 1].value

        this.recent_gallery.forEach(video => {

          video.loading = true
          video.trustedVideoUrl = this.getEmbedVideo(video.galVImagen)

        })

        console.log("recent_gallery_video: ", this.recent_gallery)

      }

    }, error => {
      this.loading.dismiss()
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })
  }

  getEmbedVideo(video_url) {

    console.log("link video:", video_url)

    let videoId = this.getId(video_url)
    console.log("link video id", videoId)

    video_url = `https://www.youtube.com/embed/${videoId}`
    console.log("link video embed: ", video_url)

    let trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(video_url)
    console.log("trustedVideoUrl: ", trustedVideoUrl)
    return trustedVideoUrl

  }

  handleIFrameLoadEvent(video): void {

    console.log("handleIFrameLoadEvent(): ", video)
    video.loading = false
    this.loading.dismiss()

  }

  getId(url) {

    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    var match = url.match(regExp)

    if (match && match[2].length == 11) {
      return match[2]
    } else {
      return 'error'
    }

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad VideoPage')

  }

  GoToOpenBasicModal1(video) {

    let myModal = this.modalCtrl.create(ModalVideoPage, {

      link: video.galVImagen,
      title: video.galVTitle,
      company: video.galVEmpresa,
      day: video.galVDia,

    })

    myModal.present()

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
