import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SponsorDetailPage } from './sponsor-detail';

@NgModule({
  declarations: [
    SponsorDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SponsorDetailPage),
  ],
})
export class SponsorDetailPageModule {}
