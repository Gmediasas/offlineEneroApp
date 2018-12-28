import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { InAppBrowser } from '@ionic-native/in-app-browser';

//Providers
import { DocumentsProvider } from '../../providers/documents/documents';
import { UtilitiesComponent } from '../../components/utilities/utilities'

/**
 * Generated class for the DocumentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-document-detail',
  templateUrl: 'document-detail.html',
})
export class DocumentDetailPage {

  refresher:any
  loader:any
  document_id = null
  documentData: any = {}
  url:any
  document = {
    path: '',
    name: '',
    ext: '',
    icon: '',
    class: ''
  }
  //countdata: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public documentsProvider: DocumentsProvider,
    private iab: InAppBrowser,
    public utilitiesComponent: UtilitiesComponent,
  ) {

  }

  
  ionViewDidLoad() {

    console.log(`DocumentDetailPage run... `)  

    let document_id_param = this.navParams.get('document_id')

    //App: One event
    if (document_id_param === null || document_id_param === undefined) {

      alert("El documento no existe")

    } else {

      this.document_id = document_id_param
      this.presentLoading()
      this.getDocumentDetail()

    }

  }

  //Get Documents in server or storage
    getDocumentDetail(){

      //Get storage
      this.storage.get(`document_detail_${this.document_id}`).then((document) => {

          //No exist item storage
          if( document === null ){

            //Server request
            this.getDocument()

          }else{

            this.documentData= document
            this.getNameDocumentInPath()

            console.log(`documentRes typeof`,typeof document)
            //this.countdata = this.documentData.length
            console.log(`Document Detail(storage): `,this.documentData)
            this.loader.dismiss() //hide loader

          }

      })

    }

  //Get Document in server
    getDocument(){

      this.documentsProvider.getDocument(this.document_id).subscribe(document => {

        this.documentData = document
        this.getNameDocumentInPath()
        //console.log(`documentRes typeof`,typeof documentRes)
        //this.countdata = this.documentData.length
        this.storage.set(`document_detail_${this.document_id}`, this.documentData )
        console.log(`Document Detail(server): `, this.documentData)

        //Pull refresher
        if(this.refresher !== undefined){

          console.log(`Refresher complete...`)
          this.refresher.complete()
          this.refresher = null

        }

        this.loader.dismiss() //hide loader

      })

    }

    getNameDocumentInPath(){
      
      this.document = this.utilitiesComponent.getPath(this.documentData.docFile.split("/") , this.documentData.docFile)

    }

    //Download documents
    download(url){

      window.open(url, '_system', 'location=no')
      
    }
 
  //Pull refresher
    doRefresh(refresher) {

      this.presentLoading() //Show loader
      this.refresher = refresher
      this.getDocument()

    }

  //Show loader
    presentLoading() {

      this.loader = this.loadingCtrl.create({
        content: "Un momento por favor...",
        spinner: 'bubbles'
      })
  
      this.loader.present()

    }

    openWebpage(url) {
      //console.log("url =>",url);
      /*const options:any;
      const options: InAppBrowserOptions = {
        zoom: 'no'
      };*/
      //window.open(url, '_blank');
      // Opening a URL and returning an InAppBrowserObject
      //const browser = this.iab.create(url, '_self', options);
      this.iab.create(url, '_self');

      // Inject scripts, css and more with browser.X
    }

}
