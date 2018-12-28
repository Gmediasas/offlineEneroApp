import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InteractiveMapPage } from './interactive-map';

@NgModule({
  declarations: [
    InteractiveMapPage,
  ],
  imports: [
    IonicPageModule.forChild(InteractiveMapPage),
  ],
})
export class InteractiveMapPageModule {}
