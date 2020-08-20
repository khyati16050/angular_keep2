import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  errMessage: string;
  note : Note;
  notes : Note[];

  constructor(private notesService: NotesService) {
    this.note = new Note()
    this.notes = []
    this.errMessage = ''
  }

  ngOnInit(): void {
    this.notesService.getNotes().subscribe(
      element => {
        this.notes = element
      },
      //e2e doubt
      error => {
        this.errMessage = error.message
      }
    );
  }

  addNoteCard(): void {
    if (this.note.title != null && this.note.text != null) {
      this.notesService.addNote(this.note).subscribe(
        element => {
          //push doubt ?
          this.notes.push(element)
        },
        error => {
          this.errMessage = error.message
        }
      )
      this.note = new Note()
      return
    }
    this.errMessage = 'Title and Text both are required fields'
  }

}
