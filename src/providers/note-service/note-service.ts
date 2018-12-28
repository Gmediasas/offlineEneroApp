import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Note } from '../../pages/fast-notes/note.model';


/*
  Generated class for the NoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NoteServiceProvider {

  private notes: Note[]= [];
  private note: Note;

  constructor(public storage: Storage) {  }

  saveNote(note: Note) {
    
    note.createDate = Date.now();
    this.notes.push(note);

    //Save notes for event
    // console.log("Notas del evento ",note)
    this.storage.set(`notes_${note.event_id}`, this.notes);


  }

  updateNote(note: Note) {
   
    //Delete note
    this.deleteNote( note.event_id, note.createDate)
    //Create note
    this.saveNote(note)

  }

  getAllNotes( event_id ) {

    return this.storage.get(`notes_${event_id}`).then(
      (notes) => {
        this.notes = notes == null ? [] : notes;
        return [...this.notes];
      }
    )

  }

  getNote(event_id ,createDate: number) {

    return this.storage.get(`notes_${event_id}`).then((notes) => {
      this.note = [...notes].find(r => r.createDate === createDate);
      return this.note;
    });

  }

  deleteNote( event_id, createDate: number) {

    this.notes = this.notes.filter((note) => {
      return note.createDate !== createDate
    });

    this.storage.set(`notes_${event_id}`, this.notes)
 
  }

}
