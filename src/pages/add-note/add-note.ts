import { Component,ViewChild,ElementRef } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { FormGroup, FormControl } from '@angular/forms'
import { NoteServiceProvider } from '../../providers/note-service/note-service'
import { Note } from '../../pages/fast-notes/note.model'

/**
 * Generated class for the AddNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html',
})
export class AddNotePage {

  event_id = null
  action:string = 'create'
  formGroup: FormGroup
  note: Note
  date: Date = new Date()
  createDate:any = null
  title: string = ''
  content: string = ''

  @ViewChild('noteContent', { read: ElementRef }) noteContent: ElementRef

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private NoteService: NoteServiceProvider
  ){

    this.event_id = this.navParams.get('current_event')
    console.log(`Notes for event: ${this.event_id}`)

    //Edit note :::::::::::::::::::::::::::::::::::::::

      let note = this.navParams.get('note')
      console.log("editar->",note)
      if( note !== null && note !== undefined ){

        this.action = "edit"
        this.title = note.title
        this.content = note.content
        this.createDate = note.createDate


      }

    //////////////////////////////////////////////////
  
    this.formGroup = new FormGroup({
      title: new FormControl(),
      content: new FormControl(),
      event_id: new FormControl()
    })

  }

  saveNote(action, note: Note) {

    switch (action) {

      case 'create':

        this.NoteService.saveNote(note)

        break

      case 'edit':

        note.event_id = this.event_id
        note.createDate = this.createDate
        this.NoteService.updateNote(note)

        break

    }

    this.navCtrl.pop()

  }

  resize() {

    // console.log(this.noteContent.nativeElement.style)
    this.noteContent.nativeElement.style.height = this.noteContent.nativeElement.scrollHeight + 'px'

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotePage')
  }



}
