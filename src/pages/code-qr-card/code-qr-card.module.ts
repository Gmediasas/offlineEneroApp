import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodeQrCardPage } from './code-qr-card';

@NgModule({
  declarations: [
    CodeQrCardPage,
  ],
  imports: [
    IonicPageModule.forChild(CodeQrCardPage),
  ],
})
export class CodeQrCardPageModule {}
