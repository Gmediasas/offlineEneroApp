import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FastNotesPage } from './fast-notes';

@NgModule({
  declarations: [
    FastNotesPage,
  ],
  imports: [
    IonicPageModule.forChild(FastNotesPage),
  ],
})
export class FastNotesPageModule {}
