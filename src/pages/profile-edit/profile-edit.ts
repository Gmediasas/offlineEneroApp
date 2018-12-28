import { Component } from '@angular/core'
import { Platform, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'
import { LoadingController, Loading } from 'ionic-angular'
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { Storage } from '@ionic/storage'
import { ActionSheetController } from 'ionic-angular'
import { Camera, CameraOptions } from '@ionic-native/camera'
import { ToastController } from 'ionic-angular'
import * as full_countries_cities from 'full-countries-cities'
import { File } from '@ionic-native/file'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer'
import { FilePath } from '@ionic-native/file-path'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser'
import { apiMiddleUrl } from '../../app/app.constants'
import { appToken } from '../../app/app.constants'

//Constants
import { default_image } from '../../app/app.constants'

//Pages
import { PhotoLibraryPage } from '../photo-library/photo-library'

//providers
import { ProfileProvider } from '../../providers/profile/profile'

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {

  apiMiddleUrl: string = apiMiddleUrl
  appToken: string = appToken
  loading: Loading
  loader: any
  refresher: any
  access_token: any
  profile: any
  formProfile: FormGroup
  show_error: boolean
  lastImage: string = null
  error_upload: string = ''

  ProfileModel = {
    photo: '',
    name: '',
    last_name: '',
    member_since: '',
    city: '',
    country: '',
    my_profile: '',
    birth_date: '',
    cell_phone: '',
    gender: '',
    email: '',
    company: '',
    position: '',
    address: '',
    nombres: '',
    direccion: '',
    genero: '',
    telefono: '',
    apellidos: ''
  }

  country_list: any = []

  city_list: any = []

  public base64Image: string

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public profileProvider: ProfileProvider,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private camera: Camera,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public filePath: FilePath,
    private file: File,
    private fileTransfer: FileTransfer,
    private _sanitizer: DomSanitizer,

  ) {
    full_countries_cities.getCountryNames().forEach(country_name => {

      this.country_list.push(
        {
          label: country_name,
          value: country_name,
        }
      )

    })

    this.loader = null

    this.storage.get(`access_token`).then((access_token) => {

      this.access_token = access_token

      //Get storage
      this.storage.get('user_profile').then((user_profile) => {

        //No exist item storage
        if (user_profile !== null) {

          this.ProfileModel = user_profile
          this.ProfileModel.photo = user_profile.photo
          this.ProfileModel.name = user_profile.nombres
          this.ProfileModel.last_name = user_profile.apellidos
          this.ProfileModel.cell_phone = user_profile.telefono
          this.ProfileModel.address = user_profile.direccion
          this.ProfileModel.gender = user_profile.genero

          this.renderFormGroup()

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
          this.profile.name = profile_data.asistente.nombres
          this.profile.last_name = profile_data.asistente.apellidos
          this.profile.gender = profile_data.asistente.genero
          this.profile.cell_phone = profile_data.asistente.telefono
          this.profile.address = profile_data.asistente.direccion

          this.storage.set(`user_profile`, this.profile)

          console.log("Perfil Guardado", this.profile)

        }

      }

      if (this.loader != null) {
        this.loader.dismiss() //hide loader
      }

      if (this.refresher !== undefined) {

        console.log(`Refresher complete...`)
        this.refresher.complete()
        this.refresher = null

      }

    })

  }

  renderFormGroup() {

    if (this.ProfileModel.country != undefined && this.ProfileModel.country != null && this.ProfileModel.country != '') {

      this.renderCities(this.ProfileModel.country)

    }

    this.formProfile = new FormGroup({

      name: new FormControl(this.ProfileModel.name || '', Validators.compose([
        Validators.required,
        Validators.pattern("[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+"),
        Validators.maxLength(30)
      ])),

      last_name: new FormControl(this.ProfileModel.last_name || '', Validators.compose([
        Validators.required,
        Validators.pattern("[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+"),
        Validators.maxLength(30)
      ])),

      member_since: new FormControl(this.ProfileModel.member_since || ''),

      city: new FormControl(this.ProfileModel.city || '', Validators.compose([
        Validators.required
      ])),

      country: new FormControl(this.ProfileModel.country || '', Validators.compose([
        Validators.required
      ])),

      birth_date: new FormControl(this.ProfileModel.birth_date || '', Validators.compose([
        Validators.required
      ])),

      cell_phone: new FormControl(this.ProfileModel.cell_phone || '', Validators.compose([
        Validators.required,
        Validators.pattern("[0-9]*"),
      ])),

      gender: new FormControl(this.ProfileModel.gender || '', Validators.compose([
        Validators.required
      ])),

      email: new FormControl(this.ProfileModel.email || '', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ])),

      //No Required
      my_profile: new FormControl(this.ProfileModel.my_profile || '', Validators.compose([
        Validators.maxLength(1000)
      ])),
      company: new FormControl(this.ProfileModel.company || '', Validators.compose([
        Validators.maxLength(80)
      ])),
      position: new FormControl(this.ProfileModel.position || '', Validators.compose([
        Validators.maxLength(80)
      ])),
      address: new FormControl(this.ProfileModel.address || '', Validators.compose([
        Validators.maxLength(80)
      ])),

    })

    this.show_error = false

    if (this.loader != null)
      this.loader.dismiss() //hide loader

    if (this.refresher !== undefined) {

      console.log(`Refresher complete...`)
      this.refresher.complete()
      this.refresher = null

    }

  }

  onChangeCountry(country) {
    this.ProfileModel.city = "";
    console.log("Entro a  pais");

    this.renderCities(country)

  }

  renderCities(country) {
    this.city_list = [];
    console.log(`gevents>>(profile-edit.js) renderCities(${country}):`, full_countries_cities.getCities(country))

    let cities = full_countries_cities.getCities(country)

    if (cities !== undefined) {

      cities.forEach(city => {

        this.city_list.push({
          label: city,
          value: city,
        })

      })

    }
    console.log("Ciudades", this.city_list);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage')
  }

  saveProfile(Profile) {

    console.log(Profile)

    if (this.formProfile.valid) {

      Profile.photo = this.ProfileModel.photo

      this.ProfileModel.nombres = Profile.name;
      this.ProfileModel.direccion = Profile.address;
      this.ProfileModel.genero = Profile.gender;
      this.ProfileModel.telefono = Profile.cell_phone;
      this.ProfileModel.apellidos = Profile.last_name;
      this.storage.set(`user_profile`, this.ProfileModel)

      this.profileProvider.updatetProfile(this.access_token, Profile).subscribe(profile_data => {

        console.log(profile_data);
        this.getProfile();
        this.alert("Perfil actualizado", "Su perfil ha sido actualizado con éxito.");
        this.navCtrl.pop();
      }),
        (error => {
          console.log("error", error);
        });



      // this.navCtrl.push( ProfileDetailPage)

    } else {

      this.show_error = true
      console.log("Error validacion");

    }

  }

  alert(title, subTitle) {

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK'],
      cssClass: 'alertPersonalizada'
    })

    alert.present()

  }

  errorProfilePhoto(event) {

    event.target.src = "assets/img/avatar-default.jpg"

  }

  goToProfileDetail() {

    this.saveProfile(this.formProfile.value)

  }

  goToPhotoLibrary() {

    this.navCtrl.push(PhotoLibraryPage)

  }

  //Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

  }

  //Pull refresher
  doRefresh(refresher) {

    this.presentLoading() //Show loader
    this.refresher = refresher
    this.getProfile()

  }

  takePhoto(sourceType) {

    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library

      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {

        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          })

      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }

    }, (err) => {
      console.log(err);

      this.presentToast('Error while selecting image.')

    })

  }


  // Create a new name for the image
  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  copyFileToLocalDir(namePath, currentName, newFileName) {

    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName
      this.uploadImage();
      this.presentToast('file save');
    }, error => {
      this.presentToast('Error while storing file.')
      console.log('Error while storing file.')
      console.log(JSON.stringify(error))
    })

  }


  presentToast(text) {

    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    })

    toast.present()

  }

  // Always get the accurate path to your apps folder
  pathForImage(img) {

    if (img === null) {
      return (this.ProfileModel.photo != '') ? this.ProfileModel.photo : ''
    } else {
      return this.file.dataDirectory + img
    }

  }

  public uploadImage() {

    // Destination URL

    var url = this.apiMiddleUrl + "/api/servicios/my_profile/edit"

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage)

    // File name only
    var filename = this.lastImage

    var options = {
      fileKey: "photo",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        'fileName': filename,
        'api_token': this.appToken,
        'token_app': this.access_token
      }
    }
    console.log("optionsFile", options);

    console.log("Ruta completa", targetPath, url, options);
    const fileTransfer: FileTransferObject = this.fileTransfer.create()

    this.presentLoading();
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loader.dismiss();
      this.presentToast('Imagen cargada con éxito.')
    }, err => {
      this.loader.dismiss();
      this.presentToast('Ha ocurrido un error vuelve a intentarlo.')
      this.error_upload = err;
      this.presentToast('Error while uploading file.')
      console.log("este es el error", err);
    })

  }

  editPhotoProfile() {

    const actionSheet = this.actionSheetCtrl.create({

      title: 'Editar foto de perfil',
      buttons: [
        {
          text: 'Camara',
          handler: () => {

            this.takePhoto(this.camera.PictureSourceType.CAMERA)

          }
        }, {
          text: 'Galeria',
          handler: () => {

            this.takePhoto(this.camera.PictureSourceType.PHOTOLIBRARY)

          }
        }
      ]

    })

    actionSheet.present()

  }

}

