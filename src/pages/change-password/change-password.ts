import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//formulario
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'

//importar provider

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  public formauth: FormGroup;

  public contrasena: any;
  public confirmarContrasena: any;
  public tokenUser: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public storage: Storage,
    public authServiceProvider: AuthServiceProvider
  ) {

    this.formauth = this.formBuilder.group
      ({
        contrasena:
          [
            '',
            Validators.compose
              ([
                Validators.required,
                Validators.minLength(6),
              ])
          ],
        confirmarContrasena:
          [
            '',
            Validators.compose
              ([
                Validators.minLength(6),
              ])
          ]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
    this.storage.get(`access_token`).then((access_token) => {
      this.tokenUser = access_token;
    })

    console.log(this.tokenUser);

  }

  goContrasena() {

    if (this.contrasena == this.confirmarContrasena) {

      this.authServiceProvider.changePassword(this.tokenUser, this.contrasena).subscribe(response => {

        if (response.success !== null && response.success !== undefined) {

          this.alerta('Contraseña actualizada', response.success);
          this.navCtrl.pop();
        }

      },
        error => {

          let error_text = ''

          switch (error.status) {

            case 401:
              error_text = "Contraseña incorrecta"
              break

            case 500:
              error_text = "Hubo un problema de nuestro lado Inténtelo mas tarde"
              break

            default:
              error_text = "Hubo un problema inténtelo mas tarde"
              break

          }

          this.alerta('Error', error_text);
          console.log("error", error);

        })

    } else {

      this.alerta('Error', 'Las contraseñas ingresadas no coinciden.');

    }

  }


  alerta(titulo: any, mensaje: any) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['Ok'],
      cssClass: 'alertPersonalizada'
    });

    alert.present();
  }

}
