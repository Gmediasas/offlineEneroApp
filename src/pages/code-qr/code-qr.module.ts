import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodeQrPage } from './code-qr';

@NgModule({
  declarations: [
    CodeQrPage,
  ],
  imports: [
    IonicPageModule.forChild(CodeQrPage),
  ],
})
export class CodeQrPageModule {}
