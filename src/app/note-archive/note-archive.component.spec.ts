import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { NoteArchiveComponent } from './note-archive.component';
import { NoteService } from '../note.service';

describe('NoteDetailComponent', () => {
  let component: NoteArchiveComponent;
  let fixture: ComponentFixture<NoteArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoteArchiveComponent
      ],
      providers: [
        NoteService
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
