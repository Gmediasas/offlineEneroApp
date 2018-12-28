import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomConferencePage } from './room-conference';

@NgModule({
  declarations: [
    RoomConferencePage,
  ],
  imports: [
    IonicPageModule.forChild(RoomConferencePage),
  ],
})
export class RoomConferencePageModule {}
