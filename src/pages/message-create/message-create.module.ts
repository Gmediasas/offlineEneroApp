import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageCreatePage } from './message-create';

@NgModule({
  declarations: [
    MessageCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(MessageCreatePage),
  ],
})
export class MessageCreatePageModule {}
