import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaticMapPage } from './static-map';

@NgModule({
  declarations: [
    StaticMapPage,
  ],
  imports: [
    IonicPageModule.forChild(StaticMapPage),
  ],
})
export class StaticMapPageModule {}
