import { Platform } from 'ionic-angular'
import { Injectable } from '@angular/core';

/*
  Generated class for the EventAppearanceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventAppearanceProvider {

	device:string

	constructor(
		public platform: Platform
	){

		// console.log('EventAppearanceProvider run...')

		if(this.platform.is('core')){
			
			// This will only print when on Desktop device
			this.device = 'desktop'

		}else if (this.platform.is('ios')) {

		  // This will only print when on iOS
		  this.device = 'ios'

		}else if(this.platform.is('android')  ){

		  // This will only print when on Android or web
		  this.device = 'android'

		}else if(this.platform.is('mobileweb')){

			// This will only print when on Browser
			this.device = 'mobileweb'

		}

	}

	getDevice(){
		return this.device
	}

}
