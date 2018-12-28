import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginNativePage } from './login-native';

@NgModule({
  declarations: [
    LoginNativePage,
  ],
  imports: [
    IonicPageModule.forChild(LoginNativePage),
  ],
})
export class LoginNativePageModule {}
