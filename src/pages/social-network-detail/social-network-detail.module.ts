import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialNetworkDetailPage } from './social-network-detail';

@NgModule({
  declarations: [
    SocialNetworkDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialNetworkDetailPage),
  ],
})
export class SocialNetworkDetailPageModule {}
