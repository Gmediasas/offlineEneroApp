import { NgModule } from '@angular/core';
import { UtilitiesComponent } from './utilities/utilities';
import { OrderByComponent } from './order-by/order-by';
import { DynamicFormComponent } from './dynamic-form/dynamic-form';
import { ThumbnailPhotoProfileComponent } from './thumbnail-photo-profile/thumbnail-photo-profile';
@NgModule({
	declarations: [UtilitiesComponent,
    OrderByComponent,
    DynamicFormComponent,
    ThumbnailPhotoProfileComponent],
	imports: [],
	exports: [UtilitiesComponent,
    OrderByComponent,
    DynamicFormComponent,
    ThumbnailPhotoProfileComponent]
})
export class ComponentsModule {}
