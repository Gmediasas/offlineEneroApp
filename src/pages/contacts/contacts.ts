import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { ProfileContactPage } from '../profile-contact/profile-contact'

//Constants
  import { default_image } from '../../app/app.constants'

//Provider 
  import { MyFriendsProvider } from '../../providers/my-friends/my-friends'

/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  id_event:number =  null
  my_friends:any = []
  access_token:string = ''
  refresher: any
  profile:any

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
          this.getMyFriends()

          let profile_param = navParams.get('profile')
    
          if ( profile_param !== null || profile_param !== undefined) {
            
            this.profile = profile_param
            
          }

        })
  
      }

    })

  }

  goToProfileContact( assistant ){

    this.navCtrl.push( ProfileContactPage, {
      assistant: assistant
    })
    
  }
  
  getMyFriends(){

    this.myFriendsProvider.getMyFriends( this.access_token, this.id_event ).subscribe( data =>{

      if( data.status = 'OK'){

        //Server request
        this.my_friends =  data.response
        console.log(`(attendant.ts) gevents>> My friends in event(${this.id_event}) `,  data.response )

      }

    }, error =>{

      console.log(`(contacts.ts) Error in getMyAttendants():`, error)
      this.doRefreshComplete()

    })
 
  }

  doRefresh(refresher) {

    this.refresher = refresher
    this.getMyFriends()

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
    console.log('ionViewDidLoad ContactsPage')
  }

}
