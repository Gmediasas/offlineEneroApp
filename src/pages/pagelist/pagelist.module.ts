import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagelistPage } from './pagelist';

@NgModule({
  declarations: [
    PagelistPage,
  ],
  imports: [
    IonicPageModule.forChild(PagelistPage),
  ],
})
export class PagelistPageModule {}
