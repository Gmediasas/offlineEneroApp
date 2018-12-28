import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, ViewController, Loading, LoadingController } from 'ionic-angular'
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser'

/**
 * Generated class for the ModalVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-video',
  templateUrl: 'modal-video.html',
})
export class ModalVideoPage {

  link_video:string
  title:string
  company:string
  day:string
  trustedVideoUrl: SafeResourceUrl
  loading: Loading

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private domSanitizer: DomSanitizer) {

      let link_param = navParams.get('link')

      if (link_param !== null || link_param !== undefined) {
  
        this.link_video  = link_param
        console.log("link video:", this.link_video)

        let videoId = this.getId( this.link_video )
        console.log("link video id", videoId)

        this.link_video  = `https://www.youtube.com/embed/${videoId}`
        console.log("link video embed: ", this.link_video)

        this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl( this.link_video )
        console.log("trustedVideoUrl: ", this.trustedVideoUrl )

      }
  
      let title_param = navParams.get('title')
  
      if (title_param !== null || title_param !== undefined) {
  
        this.title = title_param
        console.log("title video", this.title)
  
      }
  
      let company_param = navParams.get('company')
  
      if (company_param !== null || company_param !== undefined) {
  
        this.company = company_param
        console.log("company video", this.company)
  
      }
  
      let day_param = navParams.get('day')
  
      if (day_param !== null || day_param !== undefined) {
  
        this.day  = day_param
        console.log("day video", this.day)
  
      }

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

  handleIFrameLoadEvent(): void {

    this.loading.dismiss()

  }


  ionViewDidLoad() {

    console.log('ionViewDidLoad ModalVideoPage')

    this.loading = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loading.present()

    
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

}
 