import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { NoteServiceProvider } from '../../providers/note-service/note-service'
import { Note } from '../../pages/fast-notes/note.model'

/**
 * Generated class for the ViewNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-note',
  templateUrl: 'view-note.html',
})
export class ViewNotePage {

  note: Note

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private noteService: NoteServiceProvider
  ){
      this.note = this.navParams.get('note')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewNotePage')
  }

  deleteNote(note: Note) {
    this.noteService.deleteNote( note.event_id, note.createDate )
    this.navCtrl.pop()
  }

}
