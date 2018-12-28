import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentDetailPage } from './document-detail';

@NgModule({
  declarations: [
    DocumentDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DocumentDetailPage),
  ],
})
export class DocumentDetailPageModule {}
