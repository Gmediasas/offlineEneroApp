import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionsPersonalPage } from './question-personal';

@NgModule({
  declarations: [
    QuestionsPersonalPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionsPersonalPage),
  ],
})
export class QuestionsPageModule {}
