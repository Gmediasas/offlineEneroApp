import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular'

//Pages
import { LoginPage } from '../../pages/login/login'

//Providers
  import { AuthServiceProvider } from '../../providers/auth-service/auth-service'

/**
 * Generated class for the MenumodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menumodal',
  templateUrl: 'menumodal.html',
})
export class MenumodalPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private auth:AuthServiceProvider,
  ) {
  }

  
  closeMenuModal() {
    
    console.log("(app.component.ts) gevents>> App logout")

    //close side menu
    this.viewCtrl.dismiss()

    this.auth.logout().subscribe( is_logout => {

        console.log(`Is logout: ${is_logout}`)

        if(is_logout){

           //Go to Login page
          this.navCtrl.push( LoginPage, {})

        }else{

          alert(`No se pudo finalizar sesión`)

        }

      }

    )

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenumodalPage')
  }

}
