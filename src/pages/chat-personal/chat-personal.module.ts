import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPersonalPage } from './chat-personal';

@NgModule({
  declarations: [
    ChatPersonalPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatPersonalPage),
  ],
})
export class ChatPersonalPageModule {}
