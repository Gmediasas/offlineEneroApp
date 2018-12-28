import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConferencesPage } from './conferences';
import {LOCALE_ID} from '@angular/core';

@NgModule({
  declarations: [
    ConferencesPage,
  ],
  imports: [
    IonicPageModule.forChild(ConferencesPage),
  ],
  providers: [
      { provide: LOCALE_ID, useValue: window.navigator.language }
  ]
})
export class ConferencesPageModule {}
