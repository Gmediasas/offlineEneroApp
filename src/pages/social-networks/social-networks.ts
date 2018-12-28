import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage';
//Pages
import { SocialNetworkDetailPage } from '../social-network-detail/social-network-detail';
//Providers
import { SocialNetworksProvider } from '../../providers/social-networks/social-networks';

@IonicPage()
@Component({
  selector: 'page-social-networks',
  templateUrl: 'social-networks.html',
})
export class SocialNetworksPage {

  loader:any
  refresher:any
  evento_id=null
  socialNet:any
  countdata:any

	constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public socialNetworksProvider: SocialNetworksProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController
  ) {

    this.presentLoading() //Show loader

    //Get storage
    this.storage.get('current_event').then((current_event) => {

        //No exist item storage
        if( event !== null ){

          this.evento_id = current_event
          this.getSocialNetworkDetail()

        }else{

          this.loader.dismiss() //hide loader
          alert("el evento no existe")

        }

    })

	}

  //Get all Social networs in server or storage
  getSocialNetworkDetail(){

    //Get storage
    this.storage.get(`social_networks_${this.evento_id}`).then((socialNetRes) => {

      //No exist item storage
      if (socialNetRes === null) {

        //Server request
        this.getSocialNetworks()

      } else {

        console.log(`Storage request: all Social networks in event(${this.evento_id}) ...`)
        this.socialNet = socialNetRes
        this.countdata = socialNetRes.length;
        console.log(`Social networks(storage): `, this.socialNet)
        this.loader.dismiss() //hide loader

      }

    })

  }

  //Get all Social Networks in server
  getSocialNetworks(){

    console.log(`Server request: all conferences in event(${this.evento_id}) ...`)

    this.socialNetworksProvider.getSocialNetworks(this.evento_id).subscribe(data => {

      this.socialNet = data
      this.countdata = data.length;
      this.storage.set(`social_networks_${this.evento_id}`, this.socialNet )
      console.log(`Conferences(server):`, this.socialNet)

      //Pull refresher
      if(this.refresher !== undefined){

        console.log(`Refresher complete...`)
        this.refresher.complete()
        this.refresher = null

      }

      this.loader.dismiss() //hide loader

    })

  }

  //Pull refresher
  doRefresh(refresher) {

    this.presentLoading() //Show loader
    this.refresher = refresher
    this.getSocialNetworks()

  }

  //Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

  }

	goToDeatil( social_network ){

		this.navCtrl.push( SocialNetworkDetailPage, {
			social_network: social_network
		})

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SocialNetworksPage');
  }
  
  

}
