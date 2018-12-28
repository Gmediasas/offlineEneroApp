import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
//Pages
import { DocumentDetailPage } from '../document-detail/document-detail'
//Providers
import { DocumentsProvider } from '../../providers/documents/documents'
import { UtilitiesComponent } from '../../components/utilities/utilities'
/**
 * Generated class for the DocumentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
})
export class DocumentsPage {

  loader: any
  refresher: any
  evento_id = null
  documents: any
  countdata: any
  url: any

  //Sort
  //Input component data
  direction: number //Asc or Desc
  search_key: string //Key for search in records
  sort_component: any //Component for records sort
  test_options = [{
    label: "Nombre",
    value: "name"
  }]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public documentsProvider: DocumentsProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public utilitiesComponent: UtilitiesComponent,
    public alertCtrl: AlertController
  ) {

    this.initSort()

  }

  ionViewDidLoad() {


    this.presentLoading() //Show loader

    //Get storage
    this.storage.get('current_event').then((current_event) => {

      //No exist item storage
      if (current_event !== null) {

        this.evento_id = current_event
        this.getSocialDocumentDetail()

      } else {

        this.loader.dismiss() //hide loader
        this.alertPresent("", "el evento no existe");
      }

    }, error => {
      this.loader.dismiss();
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })


  }

  //Get all Social networs in server or storage
  getSocialDocumentDetail() {

    //Get storage
    this.storage.get(`documents_${this.evento_id}`).then((documents) => {

      //No exist item storage
      if (documents === null) {

        //Server request
        this.getDocuments()

      } else {

        console.log(`Storage request: all Documents in event(${this.evento_id}) ...`)
        this.documents = documents

        this.countdata = documents.length
        console.log(`Documents(storage): `, this.documents)
        this.loader.dismiss() //hide loader

      }

    })

  }

  //Get all Documents in server
  getDocuments() {

    console.log(`Server request: all Documents in event(${this.evento_id}) ...`)

    this.documentsProvider.getDocuments(this.evento_id).subscribe(documents => {

      this.documents = documents
      this.documents = this.getNameDocumentInPath()

      this.countdata = documents.length
      this.storage.set(`documents_${this.evento_id}`, this.documents)
      console.log(`Documents(server):`, this.documents)

      //Pull refresher
      if (this.refresher !== undefined) {

        console.log(`Refresher complete...`)
        this.refresher.complete()
        this.refresher = null

      }

      this.loader.dismiss() //hide loader

    })

  }

  getNameDocumentInPath() {

    let documents = []

    this.documents.forEach(document => {

      documents.push(this.utilitiesComponent.getPath(document.docFile.split("/"), document.docFile))
      documents[documents.length - 1].docUID = document.docUID
      documents[documents.length - 1].docName = document.docName
      console.log(`document: `, document)

    })

    return documents

  }

  initSort() {

    this.search_key = 'docName' //Name field default sort
    this.direction = 1 //Default direcion in sort

    //Options select sort
    this.sort_component = {
      label: "Ordenar por",
      options: this.test_options,
      sort_by: this.test_options[0].value, //Option default select sort_by in component
      sort_by_direction: this.direction === 1 ? 'asc' : 'desc' //Direction default select sort_by in component
    }

  }

  sortBy(sort_by_ouput) {

    switch (sort_by_ouput) {

      case 'name':
        this.search_key = 'docName'
        break
    }

  }

  sortByDirection(sort_by_direction_output) {


    switch (sort_by_direction_output) {

      case 'asc':
        this.direction = 1
        break

      case 'desc':
        this.direction = -1
        break

    }

  }

  openWebpage(url) {

    // const browser = this.iab.create(url, '_self')

    window.open(url, '_blank', 'location=yes');

  }

  //Pull refresher
  doRefresh(refresher) {

    this.presentLoading() //Show loader
    this.refresher = refresher
    this.getDocuments()

  }

  //Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

  }

  goToDeatil(document_id) {

    this.navCtrl.push(DocumentDetailPage, {
      document_id: document_id
    })

  }

  /**
 * Mensaje alerta
 * @param title 
 * @param subTitle 
 */
  alertPresent(title, subTitle) {

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK'],
      cssClass: 'alertPersonalizada'
    })

    alert.present()

  }

}
