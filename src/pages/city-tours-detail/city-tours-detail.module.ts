import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CityToursDetailPage } from './city-tours-detail';

@NgModule({
  declarations: [
    CityToursDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CityToursDetailPage),
  ],
})
export class CityToursDetailPageModule {}
