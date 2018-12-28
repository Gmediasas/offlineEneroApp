import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StandsPage } from './stands';

@NgModule({
  declarations: [
    StandsPage,
  ],
  imports: [
    IonicPageModule.forChild(StandsPage),
  ],
})
export class StandsPageModule {}
