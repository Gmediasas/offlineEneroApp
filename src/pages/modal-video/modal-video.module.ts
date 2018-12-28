import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalVideoPage } from './modal-video';

@NgModule({
  declarations: [
    ModalVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalVideoPage),
  ],
})
export class ModalVideoPageModule {}
