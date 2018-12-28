import { Component , ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser'

//Providers
import { SocialNetworksProvider } from '../../providers/social-networks/social-networks'
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { TwitterConnect } from '@ionic-native/twitter-connect';

import { Observable } from 'rxjs';
import { TwitterProvider } from './../../providers/twitter/twitter';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { NativeStorage } from '@ionic-native/native-storage'


/**
 * Generated class for the SocialNetworkDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-social-network-detail',
  templateUrl: 'social-network-detail.html',
})
export class SocialNetworkDetailPage {

 
  // TWITTER_SCRIPT_ID = 'twitter-wjs';
  // TWITTER_WIDGET_URL = 'https://platform.twitter.com/widgets.js';
  loading: Loading;
  // @Input() tweetId: string;
  tweets: Observable<any[]>;


  userData: any;
  refresher:any
  loader:any
  social_network = null
  socialNetworkData: any = {}
  urlHashtag:string
  url_facebook:SafeResourceUrl
  link_facebook_widget:string
  //countdata: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public socialNetworksProvider: SocialNetworksProvider,
    public nativeStorage: NativeStorage,
    private iab: InAppBrowser,
    // private twitter: TwitterConnect,
    private element: ElementRef,
    private twitter: TwitterConnect, 
    private twitterProvider: TwitterProvider, 
    private alertCtrl: AlertController, 
    private toastCtrl: ToastController, 
    private facebook: Facebook,
    private domSanitizer: DomSanitizer,
  ) {

    let social_network = navParams.get('social_network')

    //App: One event


    if (social_network === null || social_network === undefined) {

      alert("Error")

    } else {

      this.social_network = social_network
      // this.presentLoading()
      // this.getSocialNetworkDetail()

      if( this.social_network.redSocial == 'Twitter' ){

        let env = this;

        this.nativeStorage.getItem('twitter_user').then( function (data) {

          // user is previously logged and we have his data
          // we will let him access the app
          env.twitterProvider.setTokens(data.token, data.secret);
          env.loadTimeline()

        }, function (error) {
          //we don't have the user data so we will ask him to log in
          env.loginWithTwitter()
          
        });

      }else{

        this.url_facebook = this.domSanitizer.bypassSecurityTrustResourceUrl(this.link_facebook_widget = "https://www.facebook.com/plugins/page.php?href="+this.social_network.urlHashtag+"&tabs=timeline&width=340&height=700&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId")

      }

    }


  }

  ngAfterViewInit() {

  }

  launchTwitter( url_or_hashtag){
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialNetworkDetailPage');
  }

  /**
   * LOGIN WITH FACEBOOK
  */
    loginWithFB() {
      this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
        this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
          this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
        });
      });
    }

  /**
   * LOGIN WITH TWITTER
  */
    public loginWithTwitter() {

      let env = this;
      var token_twitter = null
      var secret_twitter = null

      this.showLoading();
      this.twitter.login().then((data) => {

        this.twitterProvider.setTokens(data.token, data.secret);
        token_twitter = data.token
        secret_twitter =  data.secret

        this.loading.dismiss().then(() => {

           //Get user data
            env.twitter.showUser().then(function(user){

              //Save the user data in NativeStorage
              env.nativeStorage.setItem('twitter_user',
              {
                name: user.name,
                userName: user.screen_name,
                followers: user.followers_count,
                picture: user.profile_image_url_https,
                token: token_twitter,
                secret: secret_twitter

              }).then(function() {
                 
                env.loadTimeline()

              })

            }, function(error){

              env.loading.dismiss();

            });

        });

      }, error => {

        this.showError(error);
        this.navCtrl.pop();

      });

    }

  /**
   * LOGOUT WITH TWITTER
  */
    public doTwitterLogout(){

      let env = this;
      let nav = this.navCtrl;

      this.twitter.logout().then(function(response)
      {
        env.nativeStorage.remove('twitter_user');
        nav.pop()

      }, function (error) {

        console.log(error);

      });
    }

  /**
   * TWITTER TIMELINE
   * @param refresher 
   */
    public loadTimeline(refresher?) {

      this.showLoading();
      this.tweets = this.twitterProvider.getUserTimeline( this.social_network.SocialName );
      this.tweets.subscribe(data => {

        this.loading.dismiss();
        refresher.complete();

      }, err => {

        refresher.complete();
        this.showError(err);

      });

    }

  /**
   * NEW TWEET
   */
    public composeTweet() {

      let prompt = this.alertCtrl.create({
        title: 'Nuevo Tweet',
        message: "Escriba su Tweet a continuación",
        inputs: [
          {
            name: 'text',
            value: "@"+this.social_network.SocialName
          },
        ],
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Tweet',
            handler: data => {
              this.postTweet(data.text);
            }
          }
        ]
      });

      prompt.present();

    }

    public postTweet(text) {

      this.showLoading();

      this.twitterProvider.postTweet(text).subscribe(res => {

        this.loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Tweet publicado!',
          duration: 3000
        });

        toast.present();

      }, err => {

        this.showError(err);

      });

    }

  public dateForTweet(dateString) {
    let d = new Date(Date.parse(dateString));
 
    // http://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
      d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
 
    return datestring;
  }
 
  public openLinkUrl(url) {
    let browser = this.iab.create(url, '_self', 'location=no');
  }
 
//Pull refresher
  doRefresh(refresher) {

    this.presentLoading() //Show loader
    this.refresher = refresher
    // this.getSocialNetwork()

  }

//Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

  }

  private showLoading() {

    this.loading = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loading.present()
  }

  private showError(text) {
    this.loading.dismiss().then(() => {
      let alert = this.alertCtrl.create({
        title: 'Fail',
        message: text + '\nMake sure to setup Twitter account on your device.',
        buttons: ['OK'],
        cssClass: 'alertPersonalizada'
      });
      alert.present();
    });
  } 

}
