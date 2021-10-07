import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Note } from './note';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const notes = [
      {id: 1, task: 'The first task', isArchived: false},
      {id: 2, task: 'The second task', isArchived: false},
      {id: 3, task: 'The third task', isArchived: false},
      {id: 4, task: 'The fourth task', isArchived: false},
      {id: 5, task: 'The fifth task', isArchived: false},
      {id: 6, task: 'The sixth task', isArchived: false},
      {id: 7, task: 'The seventh task', isArchived: false},
      {id: 8, task: 'The eighth task', isArchived: false},
      {id: 9, task: 'The ninth task', isArchived: false},
      {id: 10, task: 'The tenth task', isArchived: false}
    ];
    return {notes};
  }

  genId(notes: Note[]): number {
    return notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 11;
  }
}
