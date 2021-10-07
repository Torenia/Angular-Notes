import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { Note } from '../note';

@Component({
  selector: 'app-note-archive',
  templateUrl: './note-archive.component.html',
  styleUrls: ['./note-archive.component.css']
})
export class NoteArchiveComponent implements OnInit {

  notes: Note[] = [];

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
    this.noteService.getNotes()
    .subscribe(notes => this.notes = notes);
  }

  unArchiveCurrentNote(note): void {
    note.isArchived = !note.isArchived;
    this.noteService.updateNote(note)
      .subscribe();
  }
}
