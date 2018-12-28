import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { PhotoLibrary } from '@ionic-native/photo-library'

/**
 * Generated class for the PhotoLibraryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photo-library',
  templateUrl: 'photo-library.html',
})
export class PhotoLibraryPage {

  photo_library:any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private photoLibrary: PhotoLibrary,) {

      this.photoLibrary.requestAuthorization().then(() => {
        this.photoLibrary.getLibrary().subscribe({
          next: library => {

            this.photo_library = library 

            library.forEach(function(libraryItem) {
              console.log(libraryItem.id)          // ID of the photo
              console.log(libraryItem.photoURL)    // Cross-platform access to photo
              console.log(libraryItem.thumbnailURL)// Cross-platform access to thumbnail
              console.log(libraryItem.fileName)
              console.log(libraryItem.width)
              console.log(libraryItem.height)
              console.log(libraryItem.creationDate)
              console.log(libraryItem.latitude)
              console.log(libraryItem.longitude)
              console.log(libraryItem.albumIds)    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
            })
            
          },
          error: err => { console.log('gevents>> could not get photos') },
          complete: () => { console.log('gevents>> done getting photos') }
        })
      })
      .catch(err => console.log('gevents>> permissions weren\'t granted'))

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoLibraryPage')
  }

}
