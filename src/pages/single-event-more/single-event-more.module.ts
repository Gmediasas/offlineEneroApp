import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleEventMorePage } from './single-event-more';

@NgModule({
  declarations: [
    SingleEventMorePage,
  ],
  imports: [
    IonicPageModule.forChild(SingleEventMorePage),
  ],
})
export class SingleEventMorePageModule {}
