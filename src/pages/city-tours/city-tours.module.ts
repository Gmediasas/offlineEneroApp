import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CityToursPage } from './city-tours';

@NgModule({
  declarations: [
    CityToursPage,
  ],
  imports: [
    IonicPageModule.forChild(CityToursPage),
  ],
})
export class CityToursPageModule {}
