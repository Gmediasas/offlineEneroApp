import { Component } from '@angular/core'
import { IonicPage, NavController, AlertController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { LoadingController } from 'ionic-angular'
import { AddNotePage } from '../add-note/add-note'
import { NoteServiceProvider } from '../../providers/note-service/note-service'
import { Note } from './note.model'
import { ViewNotePage } from '../view-note/view-note'

/**
 * Generated class for the FastNotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fast-notes',
  templateUrl: 'fast-notes.html',
})
export class FastNotesPage {

  loader: any
  evento_id = null
  private notes: Promise<Note[]>
  private note: Note

  constructor(
    public navCtrl: NavController,
    private noteService: NoteServiceProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {


  }

  addNote() {

    this.navCtrl.push(AddNotePage, {
      current_event: this.evento_id
    })

  }

  getNote(action, createDate: number) {

    this.noteService.getNote(this.evento_id, createDate).then((n) => {

      this.note = n

      switch (action) {

        case 'view':
          this.navCtrl.push(ViewNotePage, { note: this.note })
          break;

        case 'edit':

          this.navCtrl.push(AddNotePage, {
            current_event: this.evento_id,
            note: this.note
          }
          )

          break;

      }


    })
  }

  deleteNote(note: Note) {

    this.noteService.deleteNote(note.event_id, note.createDate)

    setTimeout(() => {
      // console.log( "after delete(2): ", this.noteService.getAllNotes( this.evento_id ) )
      this.notes = this.noteService.getAllNotes(this.evento_id)
    }, 200);

  }

  getAllNotes() {

    this.loader.dismiss() //hide loader 
    return this.noteService.getAllNotes(this.evento_id)

  }

  //Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

  }


  ionViewWillEnter() {

    this.presentLoading() //Show loader

    //Get storage
    this.storage.get('current_event').then((current_event) => {

      //No exist item storage
      if (current_event !== null) {

        this.evento_id = current_event
        this.notes = this.getAllNotes()

      } else {

        this.loader.dismiss() //hide loader
        alert("el evento no existe")

      }

    }, error => {
      this.loader.dismiss();
      this.alertPresent("Error", "Se ha producido un error");
      console.log(error);
    })

  }

  /**
   * Metodo Alerta
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad FastNotesPage')
  }

}
