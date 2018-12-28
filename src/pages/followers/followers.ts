import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'
import { Storage } from '@ionic/storage'

//Constants
  import { default_image } from '../../app/app.constants'

//Provider 
  import { MyFriendsProvider } from '../../providers/my-friends/my-friends'

/**
 * Generated class for the FollowersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-followers',
  templateUrl: 'followers.html',
})
export class FollowersPage {

  id_event:number =  null
  my_followers:any = []
  access_token:string = ''
  refresher: any
  
  constructor(

    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private alertCtrl: AlertController,
    public myFriendsProvider:MyFriendsProvider

  ) {

    //Get storage
    this.storage.get('current_event').then((current_event) => {

      //No exist item storage
      if (current_event !== null || current_event !== undefined) {

        //Server request
        this.id_event = current_event

        this.storage.get('access_token').then( access_token =>{

          this.access_token = access_token
          this.getMyFollowers()

        })
  
      }

    })
    
  }

  getMyFollowers(){

    this.myFriendsProvider.getMyFollowers( this.access_token, this.id_event ).subscribe( data =>{

      if( data.status = 'OK'){

        //Server request
        this.my_followers =  data.response
        console.log(`(followers.ts) gevents>> My Followers in event(${this.id_event}) `,  data.response )

      }

    }, error =>{

      console.log(`(followers.ts) Error in getMyFollowers():`, error)
      this.doRefreshComplete()

    })
 
  }

  doRefresh(refresher) {

    this.refresher = refresher
    this.getMyFollowers()

  }

  doRefreshComplete() {

    //Pull refresher
    if (this.refresher !== undefined) {

      console.log(`Refresher complete...`)
      this.refresher.complete()
      this.refresher = null

    }

  }

  errorProfilePhoto(event) {

    event.target.src = default_image.user

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowersPage');
  }

}
