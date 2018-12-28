import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BtnMenuModalPage } from './btn-menu-modal';

@NgModule({
  declarations: [
    BtnMenuModalPage,
  ],
  imports: [
    IonicPageModule.forChild(BtnMenuModalPage),
  ],
})
export class BtnMenuModalPageModule {}
