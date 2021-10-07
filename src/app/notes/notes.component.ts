import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit {
  notes: Note[];

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes()
      .subscribe(notes => this.notes = notes);
  }

  add(task: string): void {
    task = task.trim();
    if (!task) {
      return;
    }
    this.noteService.addNote({task} as Note)
      .subscribe(note => {
        this.notes.push(note);
      });
  }

  delete(note: Note): void {
    this.notes = this.notes.filter(n => n !== note);
    this.noteService.deleteNote(note).subscribe();
  }

  archiveCurrentNote(note): void {
    note.isArchived = !note.isArchived;
    this.noteService.updateNote(note)
      .subscribe(() => {
          this.notes = [...this.notes];
      });
  }
}
