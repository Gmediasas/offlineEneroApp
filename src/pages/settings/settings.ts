import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { TranslateService } from '@ngx-translate/core'
import { Storage } from '@ionic/storage'

//Pages
  import {ChangePasswordPage} from '../change-password/change-password'

//Services
  import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
  import { InteractiveMapProvider } from '../../providers/interactive-map/interactive-map'
  import { NewsProvider } from '../../providers/news/news'
  import { SocialNetworksProvider } from '../../providers/social-networks/social-networks'
  import { DocumentsProvider } from '../../providers/documents/documents'
  import { ConferencesProvider } from '../../providers/conferences/conferences'
  import { SpeakersProvider } from '../../providers/speakers/speakers'
  import { SponsorsProvider } from '../../providers/sponsors/sponsors'
  import { StandsProvider } from '../../providers/stands/stands'
  import { StaticMapProvider } from '../../providers/static-map/static-map'
  import { EventProvider } from '../../providers/event/event'
  import { NoteServiceProvider } from '../../providers/note-service/note-service'
  import { FirebaseTokenProvider } from '../../providers/firebase-token/firebase-token'
  import { QuestionsProvider } from '../../providers/questions/quiestionProvider'
  import { ProfileProvider } from '../../providers/profile/profile'
  import { EventAppearanceProvider } from '../../providers/event-appearance/event-appearance'
  import { AppAppearanceProvider } from '../../providers/app-appearance/app-appearance'
  import { SurveyProvider } from '../../providers/survey/survey'
  import { GalleryProvider } from '../../providers/gallery/gallery'
  import { VideoProvider } from '../../providers/video/video'
  import { RegisterProvider } from '../../providers/register/register'


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private translate: TranslateService,
    public storage: Storage,
    private interactiveMapProvider:InteractiveMapProvider,
    private newsProvider:NewsProvider,
    private socialNetworksProvider:SocialNetworksProvider,
    private documentsProvider:DocumentsProvider,
    private conferencesProvider:ConferencesProvider,
    private speakersProvider:SpeakersProvider,
    private sponsorsProvider:SponsorsProvider,
    private standsProvider:StandsProvider,
    private staticMapProvider:StaticMapProvider,
    private eventProvider:EventProvider,
    private questionsProvider:QuestionsProvider,
    private profileProvider:ProfileProvider,
    private appAppearanceProvider:AppAppearanceProvider,
    private surveyProvider:SurveyProvider,
    private galleryProvider:GalleryProvider,
    private videoProvider:VideoProvider,
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage')
  }

  onLangChange($lang){

    console.log(`(settings.ts) gevents>> onLangChange( ${$lang} ) `)

    let deafult_storage = {
      data_user:'',
      access_token:'',
      remember_account:'',
      current_event:''
    }
         

    this.storage.get('data_user').then((data_user) => {

      deafult_storage.data_user = data_user

      this.storage.get('access_token').then((access_token) => {

        deafult_storage.access_token = access_token

        this.storage.get('remember_account').then((remember_account) => {

          deafult_storage.remember_account = remember_account

          this.storage.get('current_event').then((current_event) => {

            deafult_storage.current_event = current_event

            // this language will be used as a fallback when a translation isn't found in the current language
              this.translate.setDefaultLang($lang)

            // the lang to use, if the lang isn't available, it will use the current loader to get them
              this.translate.use($lang)

            // Setup storage
              this.storage.clear()
              this.storage.set('default_lang', $lang)
              this.storage.set('data_user', deafult_storage.data_user)
              this.storage.set('access_token', deafult_storage.access_token)
              this.storage.set('remember_account', deafult_storage.remember_account)
              this.storage.set('current_event', deafult_storage.current_event)

            //Setup language in providers
              this.appAppearanceProvider.setLanguage( $lang )
              this.conferencesProvider.setLanguage( $lang )
              this.documentsProvider.setLanguage( $lang )
              this.eventProvider.setLanguage( $lang )
              this.galleryProvider.setLanguage( $lang )
              this.interactiveMapProvider.setLanguage( $lang )
              this.newsProvider.setLanguage( $lang )
              // this.profileProvider.setLanguage( $lang )
              this.socialNetworksProvider.setLanguage( $lang )
              this.speakersProvider.setLanguage( $lang )
              this.sponsorsProvider.setLanguage( $lang )
              this.standsProvider.setLanguage( $lang )
              this.staticMapProvider.setLanguage( $lang )
              this.surveyProvider.setLanguage( $lang )
              this.questionsProvider.setLanguage( $lang )
              this.videoProvider.setLanguage( $lang )
              // this.authServiceProvider.setLanguage( $lang )
              // this.registerProvider.setLanguage( $lang )

          })  

        })  

      })

    })
 

  }

  goToChangePassword(){
    this.navCtrl.push(ChangePasswordPage)
  }

}
