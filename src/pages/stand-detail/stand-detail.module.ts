import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StandDetailPage } from './stand-detail';

@NgModule({
  declarations: [
    StandDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StandDetailPage),
  ],
})
export class StandDetailPageModule {}
