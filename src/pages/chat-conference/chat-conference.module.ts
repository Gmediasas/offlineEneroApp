import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatConferencePage } from './chat-conference';

@NgModule({
  declarations: [
    ChatConferencePage,
  ],
  imports: [
    IonicPageModule.forChild(ChatConferencePage),
  ],
})
export class ChatConferencePageModule {}
