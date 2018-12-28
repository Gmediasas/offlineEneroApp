import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveyDetailPage } from './survey-detail';

@NgModule({
  declarations: [
    SurveyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SurveyDetailPage),
  ],
})
export class SurveyDetailPageModule {}
