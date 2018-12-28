import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MultiEventPage } from './multi-event';

@NgModule({
  declarations: [
    MultiEventPage,
  ],
  imports: [
    IonicPageModule.forChild(MultiEventPage),
  ],
})
export class MultiEventPageModule {}
