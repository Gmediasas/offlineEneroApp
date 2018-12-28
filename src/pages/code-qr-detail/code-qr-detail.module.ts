import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodeQrDetailPage } from './code-qr-detail';

@NgModule({
  declarations: [
    CodeQrDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CodeQrDetailPage),
  ],
})
export class CodeQrDetailPageModule {}
