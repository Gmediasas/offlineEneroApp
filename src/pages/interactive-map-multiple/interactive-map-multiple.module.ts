import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InteractiveMapMultiplePage } from './interactive-map-multiple';

@NgModule({
  declarations: [
    InteractiveMapMultiplePage,
  ],
  imports: [
    IonicPageModule.forChild(InteractiveMapMultiplePage),
  ],
})
export class InteractiveMapMultiplePageModule {}
