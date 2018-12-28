import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

//Pages
import { MultiEventPage } from '../multi-event/multi-event';
import { SingleEventPage } from '../single-event/single-event';
import { HomePage } from '../home/home';
import { InteractiveMapPage } from '../interactive-map/interactive-map'
import { NewsPage } from '../news/news'
import { SocialNetworksPage } from '../social-networks/social-networks'
import { DocumentsPage } from '../documents/documents'
//Pages
import { ConferencesPage } from '../conferences/conferences'
import { SpeakersPage } from '../speakers/speakers'
import { SponsorsPage } from '../sponsors/sponsors'
import { StandsPage } from '../stands/stands'
import { StaticMapPage } from '../static-map/static-map'

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1:any = MultiEventPage
  tab2:any = SingleEventPage
  tab3:any = HomePage
  interactive_map_page:any = InteractiveMapPage
  news_page:any = NewsPage
  social_networks_page:any = SocialNetworksPage
  documents_page:any = DocumentsPage
  //Tabs pages
  ConferencesPage:any = ConferencesPage
  SpeakersPage:any = SpeakersPage
  SponsorsPage:any = SponsorsPage
  StandsPage:any = StandsPage
  StaticMapPage:any = StaticMapPage

  constructor() {

  }

}
