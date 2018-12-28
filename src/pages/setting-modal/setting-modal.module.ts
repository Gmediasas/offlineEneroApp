import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingModalPage } from './setting-modal';

@NgModule({
  declarations: [
    SettingModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingModalPage),
  ],
})
export class SettingModalPageModule {}
