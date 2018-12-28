import { Component, Input } from '@angular/core'
import { Storage } from '@ionic/storage'
import { NavController } from 'ionic-angular'

//providers
import { ProfileProvider } from '../../providers/profile/profile'

//Constants
import { default_image } from '../../app/app.constants';

/**
 * Generated class for the ThumbnailPhotoProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'thumbnail-photo-profile',
  templateUrl: 'thumbnail-photo-profile.html'
})
export class ThumbnailPhotoProfileComponent {

  @Input() width: string;
  @Input() height: string;
  profile: any
  access_token: string

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public profileProvider: ProfileProvider,
  ) {


  }
  
  OnChange() {
    console.log('Hello ThumbnailPhotoProfileComponent Component')

    this.access_token = ''

    this.storage.get(`access_token`).then((access_token) => {

      this.access_token = access_token

      this.storage.get(`user_profile`).then((user_profile) => {

        if (user_profile !== null && user_profile !== undefined) {

          this.profile = user_profile

        } else {

          this.getProfile()

        }

      })

    })
  }

  ngOnInit() {

    console.log('Hello ThumbnailPhotoProfileComponent Component')

    this.access_token = ''

    this.storage.get(`access_token`).then((access_token) => {

      this.access_token = access_token

      this.storage.get(`user_profile`).then((user_profile) => {

        if (user_profile !== null && user_profile !== undefined) {

          this.profile = user_profile

        } else {

          this.getProfile()

        }

      })

    })
  }



  getProfile() {

    this.profileProvider.getProfile(this.access_token).subscribe(profile_data => {

      if (profile_data.status !== undefined && profile_data.status !== null) {

        if (profile_data.status == 'OK') {

          this.profile = profile_data.asistente
          this.storage.set(`user_profile`, this.profile)
          console.log(this.profile)

        }

      }

    })

  }

  errorProfilePhoto(event) {

    event.target.src = default_image.user

  }


}
