import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'
import { Storage } from '@ionic/storage'

//Constants
import { default_image } from '../../app/app.constants'

// PAGES 
  import { MessagePage} from '../message/message'
  import { FollowersPage} from '../followers/followers'
  import { ContactsPage} from '../contacts/contacts'
  import { MessageCreatePage } from '../message-create/message-create'
  import { ProfileContactPage } from '../profile-contact/profile-contact'
  import { HomePage } from '../home/home'
  import { SingleEventPage } from '../single-event/single-event'
  //Pages
  import { ChatPersonalPage } from '../chat-personal/chat-personal';

//Provider 
  import { MyFriendsProvider } from '../../providers/my-friends/my-friends'
  import { ProfileProvider } from '../../providers/profile/profile'


/**
 * Generated class for the AttendantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attendant',
  templateUrl: 'attendant.html',
})
export class AttendantPage {

  id_event:number =  null
  assistants:any = []
  access_token:string = ''
  my_friend_requests:any = []
  refresher: any
  profile: any
  page:number

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public profileProvider: ProfileProvider,
    private alertCtrl: AlertController,
    public myFriendsProvider:MyFriendsProvider
  ){

  }
 

  ionViewDidEnter() {
    this.storage.get(`access_token`).then((access_token) => {
    this.access_token = access_token
    //Get storage
    
  })
}


  ionViewWillEnter() {
    
    //Flag for firebase push notification
    this.storage.set('attendant_page_intent', false);

    //Get storage
    this.storage.get('current_event').then((current_event) => {

    //No exist item storage
      if (current_event !== null || current_event !== undefined) {
        
          //Server request
            this.id_event = current_event

            this.storage.get('access_token').then( access_token =>{

              this.page = 1;
              this.access_token = access_token
              this.getMyAttendants()
              this.getUserProfile()

            })
    
        }

    })

  }

  ionViewDidLoad() {

  }
  
  getUserProfile() {

    //Get storage
    this.storage.get('user_profile').then((user_profile) => {

      //No exist item storage
      if (user_profile !== null) {

        this.profile = user_profile

      } else {

        this.getProfile()

      }

    })

  }

  getProfile() {

    this.profileProvider.getProfile(this.access_token).subscribe(profile_data => {

      if (profile_data.status !== undefined && profile_data.status !== null) {

        if (profile_data.status == 'OK') {

          this.profile = profile_data.asistente
          this.storage.set(`user_profile`, this.profile)


        }

      }

    })

  }

  // goHome(){
    
  //   // this.navCtrl.setRoot(HomePage)

  //   //Go to event
  //     this.navCtrl.push(SingleEventPage, {
  //       event_id: this.id_event
  //     })


  // }

  getMyAttendants(){

    this.myFriendsProvider.getMyAttendants( this.access_token ).subscribe( data =>{

      if( data.status = 'OK'){

        //Server request
        this.assistants =  data.response
        console.log(`(attendant.ts) gevents>> Assistants in event(${this.id_event}) `, this.assistants )

        this.storage.set(`my_attendants_page_${this.id_event}`, this.page);
        this.doRefreshComplete()

      }

    }, error =>{

      console.log(`(attendant.ts) Error in getMyAttendants():`, error)
      this.doRefreshComplete()

    })

    this.myFriendsProvider.getMyFriends( this.access_token, this.id_event ).subscribe( data =>{

      if( data.status = 'OK'){

        //Server request
        console.log(`(attendant.ts) gevents>> My friends in event(${this.id_event}) `,  data.response )

      }

    })
    

  }

  addFriend(assistant, rechazar_solicitud_amistad?){


    if( assistant.estado != 'pendiente'  && assistant.estado != 'pendiente_aceptar' && assistant.estado != 'aceptado' ){

      console.log(`Send friend request: ${ assistant.idasistente } `)

      this.myFriendsProvider.createFriendRequest(this.access_token, assistant.idasistente, this.id_event).subscribe( response => {

        if(response.status = 'OK'){

          assistant.estado = 'pendiente'

        }
        
      }, error =>{

        this.presentAlert("Error", "No se pudo enviar la solicitud de amistad.");

      })   

    }else if(assistant.estado == 'pendiente'){


      this.myFriendsProvider.updateFriendRequest( this.access_token, assistant.idasistente, this.id_event, 'pendiente').subscribe(response =>{

        console.log(`updateFriendRequest(): Cancelar solicitud `,response)
        assistant.estado = null

      }, error =>{

        this.presentAlert("Error", "No se pudo cancelar la solicitud de amistad.");

      })     

    }else if( assistant.estado == 'pendiente_aceptar' ){


      if( rechazar_solicitud_amistad ){
       
        this.myFriendsProvider.updateFriendRequest( this.access_token, assistant.idasistente, this.id_event, 'declinar_amistad').subscribe(response =>{

          console.log(`updateFriendRequest(): Cancelar solicitud amistad entrante `,response)
          assistant.estado = null
  
        }, error =>{
  
          this.presentAlert("Error", "No se pudo cancelar la solicitud de amistad.");
  
        })    

      }else{

          
        this.myFriendsProvider.updateFriendRequest( this.access_token, assistant.idasistente, this.id_event, 'aceptado').subscribe(response =>{

          console.log(`updateFriendRequest(): Aceptar solicitud`,response)
          assistant.estado = 'aceptado'

        }, error =>{

          this.presentAlert("Error", "No se pudo aceptar la solicitud de amistad.");

        })  
        
      }


    }else if( assistant.estado == 'aceptado' ){

      this.myFriendsProvider.updateFriendRequest( this.access_token, assistant.idasistente, this.id_event, 'eliminar_amistad').subscribe(response =>{

        console.log(`updateFriendRequest(): Eliminar amistad`,response)
        assistant.estado = null

      }, error =>{

        this.presentAlert("Error", "No se pudo eliminar la amistad.");

      })

    }

  }
  
  errorProfilePhoto(event) {

    event.target.src = default_image.user

  }

  presentAlert(title, message) {

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });

    alert.present();

  }

  goToMessageCreate( assistant ){

    console.log(`goMessageCreate`)
    console.log(`assistant.estado: `, assistant.estado)

    if(assistant.estado == 'aceptado'){

      this.navCtrl.push( ChatPersonalPage, {
        id_event: this.id_event,
        assistant: assistant
      } )

    }else{

      this.presentAlert("Error", "Para mandar un mensaje primero tienes que agregar al contacto.")
    }
    

  }

  goToMessage(){

    this.navCtrl.push(MessagePage)

  }
  
  goToFollowers(){

    this.navCtrl.push(FollowersPage)

  }

  goToContacts(){

    this.navCtrl.push(ContactsPage,{
      profile:this.profile
    })

  }

  goToProfileContact( assistant ){

    this.navCtrl.push( ProfileContactPage, {
      assistant: assistant
    })
    
  }
  
  doRefresh(refresher) {

    this.refresher = refresher
    this.getMyAttendants()

  }

  doRefreshComplete() {

    //Pull refresher
    if (this.refresher !== undefined) {

      console.log(`Refresher complete...`)
      this.refresher.complete()
      this.refresher = null

    }

  }

  doInfinite(infiniteScroll) {

    console.log("infinite scroll")

    setTimeout(() => {

      //this.getStandDetail();
     
      this.storage.get(`my_attendants_page_${this.id_event}`).then((page) => {

        //No exist item storage
        if ( page === null) {

          this.getMyAttendants()
          infiniteScroll.complete();

        }else{

            this.page = page + 1;
            
            console.log('this.page: ',this.page)

            this.myFriendsProvider.getMyAttendants( this.access_token, this.page ).subscribe( data =>{

              if( data.status = 'OK'){
        
                //Server request
                // this.assistants =  data.response
                data.response.forEach( assistant => {
                  
                  console.log(`(attendant.ts) gevents>> push(assistant) `, assistant )
                  this.assistants.push(  assistant )

                });
               
                console.log(`(attendant.ts) gevents>> Assistants in event(${this.id_event}) `, data )
        
                this.storage.set(`my_attendants_page_${this.id_event}`, this.page);

                infiniteScroll.complete();
        
              }
        
            }, error =>{
        
              console.log(`(attendant.ts) Error in getMyAttendants():`, error)
              this.doRefreshComplete()
        
            })

        }
  
      });
      
    }, 1000);

  }


}
