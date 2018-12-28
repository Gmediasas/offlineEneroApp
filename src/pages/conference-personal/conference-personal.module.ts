import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConferencePersonalPage } from './conference-personal';

@NgModule({
  declarations: [
    ConferencePersonalPage,
  ],
  imports: [
    IonicPageModule.forChild(ConferencePersonalPage),
  ],
})
export class ConferencePersonalPageModule {}
