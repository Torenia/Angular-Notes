import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { NotesComponent } from './notes.component';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({ selector: 'app-note-detail', template: '' })
class NoteDetailStubComponent {
  @Input() note: Note;
}

@Component({ selector: 'app-note-search', template: '' })
class NoteSearchStubComponent {
}

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotesComponent,
        NoteDetailStubComponent,
        NoteSearchStubComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        NoteService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
