import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaticMapDetailPage } from './static-map-detail';

@NgModule({
  declarations: [
    StaticMapDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StaticMapDetailPage),
  ],
})
export class StaticMapDetailPageModule {}
