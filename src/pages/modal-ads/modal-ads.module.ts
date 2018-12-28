import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAdsPage } from './modal-ads';

@NgModule({
  declarations: [
    ModalAdsPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAdsPage),
  ],
})
export class ModalAdsPageModule {}
