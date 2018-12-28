import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { NgxQRCodeModule } from 'ngx-qrcode3';
//providers
import { ProfileProvider } from '../../providers/profile/profile'


@IonicPage()
@Component({
  selector: 'page-code-qr-card',
  templateUrl: 'code-qr-card.html',
})
export class CodeQrCardPage {
  profile: any
  loader: any
  qrData = "Carlos Garzon";
  createdCode = null;
  scannedCode = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public profileProvider: ProfileProvider,
    public qr: NgxQRCodeModule
  ) {
  }

  ionViewDidEnter() {
    this.loader = null


  }

  ionViewWillEnter() {
    this.getUserProfile()
  }


  getUserProfile() {

    //Get storage
    this.storage.get('user_profile').then((user_profile) => {

      //No exist item storage
      if (user_profile !== null) {

        this.profile = user_profile
        console.log("Este es el Perfil", this.profile);
        this.generateQR();

      } else {

        this.getProfile()

      }

    })

  }

  generateQR() {
    var segs = [];
    /*{ data: 'Nombre: \n', mode: 'text' },
      { data: this.profile.nombres + " \n", mode: 'text' },
      { data: 'Apellido:\n ', mode: 'text' },
      { data: this.profile.apellidos + "\n", mode: 'text' },
      { data: 'Empresa:\n ', mode: 'text' },
      { data: this.profile.company + "\n", mode: 'text' },
      { data: 'Cargo:\n ', mode: 'text' },
      { data: this.profile.position + "\n", mode: 'text' },
      { data: 'Email:\n ', mode: 'text' },
      { data: this.profile.email + "\n", mode: 'email' }*/

    if (this.profile.nombres != null && this.profile.nombres != "" && this.profile.nombres != "null") {
      segs.push(
        { data: 'Nombre: \n', mode: 'text' },
        { data: this.profile.nombres + " \n", mode: 'text' })
    }

    if (this.profile.apellidos != null && this.profile.apellidos != "" && this.profile.apellidos != "null") {
      segs.push(
        { data: 'Apellido:\n ', mode: 'text' },
        { data: this.profile.apellidos + "\n", mode: 'text' })
    }
    if (this.profile.company != null && this.profile.company != "" && this.profile.company != "null") {
      segs.push(
        { data: 'Empresa:\n ', mode: 'text' },
        { data: this.profile.company + "\n", mode: 'text' })
    }
    if (this.profile.position != null && this.profile.position != "" && this.profile.position != "null") {
      segs.push(
        { data: 'Cargo:\n ', mode: 'text' },
        { data: this.profile.position + "\n", mode: 'text' })
    }
    if (this.profile.email != null && this.profile.email != "" && this.profile.email != "null") {
      segs.push(
        { data: 'Email:\n ', mode: 'text' },
        { data: this.profile.email + "\n", mode: 'email' })
    }

    console.log(segs);

    this.createdCode = segs;

  }


  getProfile() {

    this.storage.get(`access_token`).then((access_token) => {

      this.profileProvider.getProfile(access_token).subscribe(profile_data => {

        if (profile_data.status !== undefined && profile_data.status !== null) {

          if (profile_data.status == 'OK') {

            this.profile = profile_data.asistente

            this.storage.set(`user_profile`, this.profile)

            console.log("Este es el Perfil", this.profile);

          }

        }

        if (this.loader != null) {
          this.loader.dismiss() //hide loader
        }

      })

    })

  }






}
