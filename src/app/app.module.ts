import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { Geolocation } from '@ionic-native/geolocation'
import { GoogleMaps } from '@ionic-native/google-maps'
import { LaunchNavigator } from '@ionic-native/launch-navigator'
import { FCM } from '@ionic-native/fcm'
import { HttpModule } from '@angular/http' //Http service
import { IonicStorageModule } from '@ionic/storage' //Storage
import { Diagnostic } from '@ionic-native/diagnostic'
import { PhotoLibrary } from '@ionic-native/photo-library'
import { Camera } from '@ionic-native/camera'
import { NativeStorage } from '@ionic-native/native-storage'
import { TwitterConnect } from '@ionic-native/twitter-connect'
import { TwitterService } from 'ng2-twitter'
import { TwitterProvider } from '../providers/twitter/twitter'
import { Facebook } from '@ionic-native/facebook'
import { AppVersion } from '@ionic-native/app-version';
//codigoqr
import { NgxQRCodeModule } from 'ngx-qrcode3';
//Tranaslation
import { Globalization } from '@ionic-native/globalization'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

import { MyApp } from './app.component'
//Pages
import { CodeQrCardPage } from '../pages/code-qr-card/code-qr-card';
import { HomePage } from '../pages/home/home'
import { MultiEventPage } from '../pages/multi-event/multi-event'
import { SingleEventPage } from '../pages/single-event/single-event'
import { TabsPage } from '../pages/tabs/tabs'
import { DetailsPage } from '../pages/details/details'
import { MenuPage } from '../pages/menu/menu'
import { MenumodalPage } from '../pages/menumodal/menumodal'
import { NotificationPage } from '../pages/notification/notification'
import { PagelistPage } from '../pages/pagelist/pagelist'
import { ProfilePage } from '../pages/profile/profile'
import { ProfileDetailPage } from '../pages/profile-detail/profile-detail'
import { ProfileEditPage } from '../pages/profile-edit/profile-edit'
import { RegisterPage } from '../pages/register/register'
import { SearchModalPage } from '../pages/search-modal/search-modal'
import { SettingModalPage } from '../pages/setting-modal/setting-modal'
import { sortmodalPage } from '../pages/sortmodal/sortmodal'
import { TermsPage } from '../pages/terms/terms'
import { LoginPage } from '../pages/login/login'
import { LoginNativePage } from '../pages/login-native/login-native'
import { SliderPage } from '../pages/slider/slider'
import { InteractiveMapPage } from '../pages/interactive-map/interactive-map'
import { InteractiveMapMultiplePage } from '../pages/interactive-map-multiple/interactive-map-multiple'
import { NewsPage } from '../pages/news/news'
import { SocialNetworksPage } from '../pages/social-networks/social-networks'
import { DocumentsPage } from '../pages/documents/documents'
import { ConferencesPage } from '../pages/conferences/conferences'
import { ConferencePersonalPage } from '../pages/conference-personal/conference-personal'
import { SpeakersPage } from '../pages/speakers/speakers'
import { SponsorsPage } from '../pages/sponsors/sponsors'
import { StandsPage } from '../pages/stands/stands'
import { StaticMapPage } from '../pages/static-map/static-map'
import { StaticMapDetailPage } from '../pages/static-map-detail/static-map-detail'
import { ForgotPage } from '../pages/forgot/forgot'
import { ConferenceDetailPage } from '../pages/conference-detail/conference-detail'
import { StandDetailPage } from '../pages/stand-detail/stand-detail'
import { SocialNetworkDetailPage } from '../pages/social-network-detail/social-network-detail'
import { DocumentDetailPage } from '../pages/document-detail/document-detail'
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail'
import { SponsorDetailPage } from '../pages/sponsor-detail/sponsor-detail'
import { NewsDetailPage } from '../pages/news-detail/news-detail'
import { FastNotesPage } from '../pages/fast-notes/fast-notes'
import { AddNotePage } from '../pages/add-note/add-note'
import { ViewNotePage } from '../pages/view-note/view-note'
import { CodeQrPage } from '../pages/code-qr/code-qr'
import { CodeQrDetailPage } from '../pages/code-qr-detail/code-qr-detail'
import { SettingsPage } from '../pages/settings/settings'
import { TicketsPage } from '../pages/tickets/tickets'
import { SingleEventMorePage } from '../pages/single-event-more/single-event-more'
import { CityToursDetailPage } from '../pages/city-tours-detail/city-tours-detail';


// import { TermsPage } from '../pages/terms/terms'
import { ChangePasswordPage } from '../pages/change-password/change-password'
import { TermsPrivacyPage } from '../pages/terms-privacy/terms-privacy'
import { TermsHelpPage } from '../pages/terms-help/terms-help'
import { AttendantPage } from '../pages/attendant/attendant'

import { FollowersPage } from '../pages/followers/followers'
import { ContactsPage } from '../pages/contacts/contacts'
// import {MapPage} from '../pages/Map/Map'
import { WebViewPage } from '../pages/web-view/web-view'
import { QuestionsPage } from '../pages/questions/questions'
import { QuestionAddPage } from '../pages/question-add/question-add'
import { QuestionsPersonalPage } from '../pages/question-personal/question-personal'
import { GalleryPage } from '../pages/gallery/gallery'
import { VideoPage } from '../pages/video/video'
import { CityToursPage } from '../pages/city-tours/city-tours'
import { ChatPage } from '../pages/chat/chat'
import { ChatPersonalPage } from '../pages/chat-personal/chat-personal'
import { RoomPage } from '../pages/room/room'
import { ModalPage } from '../pages/modal/modal'
import { ModalVideoPage } from '../pages/modal-video/modal-video'
import { ModalAdsPage } from '../pages/modal-ads/modal-ads'
import { RoomConferencePage } from '../pages/room-conference/room-conference'
import { ChatConferencePage } from '../pages/chat-conference/chat-conference'
import { SurveyPage } from '../pages/survey/survey'
import { SurveyDetailPage } from '../pages/survey-detail/survey-detail'
import { GoogleMapPage } from '../pages/google-map/google-map'
import { PhotoLibraryPage } from '../pages/photo-library/photo-library'
import { MessagePage } from '../pages/message/message'
import { MessageCreatePage } from '../pages/message-create/message-create'
import { ProfileContactPage } from '../pages/profile-contact/profile-contact'
import { ChatBotPage } from '../pages/chat-bot/chat-bot';


//Elements and Components 
import { BtnMenuModalPage } from '../pages/btn-menu-modal/btn-menu-modal'
import { OrderByComponent } from '../components/order-by/order-by'
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form'
import { ThumbnailPhotoProfileComponent } from '../components/thumbnail-photo-profile/thumbnail-photo-profile'

//Pipes
import { OrderByPipe } from '../pipes/order-by.pipe'
import { SentencePipe } from '../pipes/sentence-case.pipe'
import { SearchFilterPipe } from '../pipes/search-filter-pipe'
import { GroupByPipe } from '../pipes/group-by.pipe'
import { ReplaceMiddelwarePathPipe } from '../pipes/replace-middelware-path'
import { File } from '@ionic-native/file'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer'
import { FilePath } from '@ionic-native/file-path'

//Services
import { AuthServiceProvider } from '../providers/auth-service/auth-service'
import { InteractiveMapProvider } from '../providers/interactive-map/interactive-map'
import { NewsProvider } from '../providers/news/news'
import { SocialNetworksProvider } from '../providers/social-networks/social-networks'
import { DocumentsProvider } from '../providers/documents/documents'
import { ConferencesProvider } from '../providers/conferences/conferences'
import { SpeakersProvider } from '../providers/speakers/speakers'
import { SponsorsProvider } from '../providers/sponsors/sponsors'
import { StandsProvider } from '../providers/stands/stands'
import { StaticMapProvider } from '../providers/static-map/static-map'
import { EventProvider } from '../providers/event/event'
import { NoteServiceProvider } from '../providers/note-service/note-service'
import { UtilitiesComponent } from '../components/utilities/utilities'
import { FirebaseTokenProvider } from '../providers/firebase-token/firebase-token'
import { QuestionsProvider } from '../providers/questions/quiestionProvider'
import { ProfileProvider } from '../providers/profile/profile'
import { EventAppearanceProvider } from '../providers/event-appearance/event-appearance'
import { AppAppearanceProvider } from '../providers/app-appearance/app-appearance'
import { SurveyProvider } from '../providers/survey/survey'
import { MenuCardsProvider } from '../providers/menu-cards/menu-cards'
import { GalleryProvider } from '../providers/gallery/gallery'
import { VideoProvider } from '../providers/video/video'
import { RegisterProvider } from '../providers/register/register'
import { Ng4TwitterTimelineModule } from 'ng4-twitter-timeline/lib/index'
import { DefaultLanguageProvider } from '../providers/default-language/default-language';
import { TouristappProvider } from '../providers/touristapp/touristapp';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import localeDe from '@angular/common/locales/de';

//Spanish
import es from '@angular/common/locales/es';

//English
import en from '@angular/common/locales/en';

//portugues
import pt from '@angular/common/locales/pt';

//Chinese
import zh from '@angular/common/locales/zh';

import { AssistantsProvider } from '../providers/assistants/assistants';
import { MessengerProvider } from '../providers/messenger/messenger';
import { MyFriendsProvider } from '../providers/my-friends/my-friends';
import { FirebasePushNotificationProvider } from '../providers/firebase-push-notification/firebase-push-notification';
import { AgenteProvider } from '../providers/agente/agente';

//sqlite
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';

//network state
import { Network } from '@ionic-native/network';


registerLocaleData(es)

@NgModule({
  declarations: [
    MyApp,
    //Pipes
    OrderByPipe,
    SentencePipe,
    SearchFilterPipe,
    GroupByPipe,
    ReplaceMiddelwarePathPipe,
    //pages
    CodeQrCardPage,
    HomePage,
    MultiEventPage,
    SingleEventPage,
    TabsPage,
    DetailsPage,
    LoginPage,
    LoginNativePage,
    SliderPage,
    MenuPage,
    MenumodalPage,
    NotificationPage,
    PagelistPage,
    ProfilePage,
    RegisterPage,
    SearchModalPage,
    SettingModalPage,
    sortmodalPage,
    TermsPage,
    InteractiveMapPage,
    InteractiveMapMultiplePage,
    NewsPage,
    SocialNetworksPage,
    DocumentsPage,
    ForgotPage,
    ConferencesPage,
    SpeakersPage,
    SponsorsPage,
    StandsPage,
    StaticMapPage,
    BtnMenuModalPage,
    ConferenceDetailPage,
    ConferencePersonalPage,
    StandDetailPage,
    SocialNetworkDetailPage,
    DocumentDetailPage,
    SpeakerDetailPage,
    SponsorDetailPage,
    NewsDetailPage,
    StaticMapDetailPage,
    FastNotesPage,
    AddNotePage,
    ViewNotePage,
    WebViewPage,
    QuestionsPage,
    QuestionAddPage,
    QuestionsPersonalPage,
    GalleryPage,
    VideoPage,
    CityToursPage,
    ChatPage,
    ChatPersonalPage,
    RoomPage,
    RoomConferencePage,
    ChatConferencePage,
    OrderByComponent,
    DynamicFormComponent,
    ThumbnailPhotoProfileComponent,
    SurveyPage,
    SurveyDetailPage,
    ProfileDetailPage,
    ProfileEditPage,
    CodeQrPage,
    SettingsPage,
    TermsPage,
    ChangePasswordPage,
    TermsPrivacyPage,
    TermsHelpPage,
    CodeQrDetailPage,
    TicketsPage,
    ModalPage,
    ModalVideoPage,
    SingleEventMorePage,
    AttendantPage,
    // MapPage,
    ModalAdsPage,
    GoogleMapPage,
    MessagePage,
    FollowersPage,
    ContactsPage,
    PhotoLibraryPage,
    MessageCreatePage,
    ProfileContactPage,
    CityToursDetailPage,
    ChatBotPage
  ],
  imports: [
    NgxQRCodeModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    Ng4TwitterTimelineModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    //pages
    CodeQrCardPage,
    MultiEventPage,
    SingleEventPage,
    TabsPage,
    DetailsPage,
    LoginPage,
    LoginNativePage,
    SliderPage,
    MenuPage,
    MenumodalPage,
    NotificationPage,
    PagelistPage,
    ProfilePage,
    RegisterPage,
    SearchModalPage,
    SettingModalPage,
    sortmodalPage,
    TermsPage,
    InteractiveMapPage,
    InteractiveMapMultiplePage,
    NewsPage,
    SocialNetworksPage,
    DocumentsPage,
    ConferencesPage,
    ConferencePersonalPage,
    SpeakersPage,
    SponsorsPage,
    StandsPage,
    StaticMapPage,
    ForgotPage,
    BtnMenuModalPage,
    ConferenceDetailPage,
    StandDetailPage,
    SocialNetworkDetailPage,
    DocumentDetailPage,
    SpeakerDetailPage,
    SponsorDetailPage,
    NewsDetailPage,
    StaticMapDetailPage,
    FastNotesPage,
    AddNotePage,
    ViewNotePage,
    WebViewPage,
    QuestionsPage,
    QuestionAddPage,
    QuestionsPersonalPage,
    GalleryPage,
    VideoPage,
    CityToursPage,
    ChatPage,
    ChatPersonalPage,
    RoomPage,
    RoomConferencePage,
    ChatConferencePage,
    OrderByComponent,
    DynamicFormComponent,
    SurveyPage,
    SurveyDetailPage,
    ProfileEditPage,
    ProfileDetailPage,
    CodeQrPage,
    SettingsPage,
    TermsPage,
    ChangePasswordPage,
    TermsPrivacyPage,
    TermsHelpPage,
    CodeQrDetailPage,
    TicketsPage,
    ModalPage,
    ModalVideoPage,
    SingleEventMorePage,
    AttendantPage,
    // MapPage,
    ModalAdsPage,
    GoogleMapPage,
    MessagePage,
    FollowersPage,
    ContactsPage,
    PhotoLibraryPage,
    MessageCreatePage,
    ProfileContactPage,
    CityToursDetailPage,
    ChatBotPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // BaseService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LOCALE_ID, useValue: 'es' },
    //Plugins
    SQLite,
    Network,
    Camera,
    Diagnostic,
    Facebook,
    FCM,
    File,
    FilePath,
    FileTransfer,
    Geolocation,
    Globalization,
    GoogleMaps,
    InAppBrowser,
    LaunchNavigator,
    NativeStorage,
    PhotoLibrary,
    UtilitiesComponent,
    TwitterConnect,
    TwitterService,
    //providers
    AppAppearanceProvider,
    AuthServiceProvider,
    AssistantsProvider,
    ConferencesProvider,
    DefaultLanguageProvider,
    DocumentsProvider,
    EventAppearanceProvider,
    EventProvider,
    FirebaseTokenProvider,
    GalleryProvider,
    InteractiveMapProvider,
    MenuCardsProvider,
    MessengerProvider,
    NewsProvider,
    NoteServiceProvider,
    ProfileProvider,
    SocialNetworksProvider,
    SpeakersProvider,
    SponsorsProvider,
    StandsProvider,
    StaticMapProvider,
    SurveyProvider,
    QuestionsProvider,
    VideoProvider,
    RegisterProvider,
    TwitterProvider,
    DefaultLanguageProvider,
    AppVersion,
    MyFriendsProvider,
    TouristappProvider,
    FirebasePushNotificationProvider,
    AgenteProvider,
    DatabaseProvider,
  ]
})
export class AppModule { }
