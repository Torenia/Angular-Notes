import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NoteSearchComponent } from './note-search.component';
import { NoteService } from '../note.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const mockData = [
  {id: 1, task: 'The first task', isArchived: false},
  {id: 2, task: 'The second task', isArchived: false},
  {id: 3, task: 'The third task', isArchived: false}
];

describe('Test for NoteSearchComponent', () => {
    let noteSearchComponent: NoteSearchComponent;
    let fixture: ComponentFixture<NoteSearchComponent>;
    let noteService: NoteService;
    let debugElement: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, HttpClientTestingModule, RouterTestingModule, FormsModule],
            declarations: [NoteSearchComponent],
            providers: [
                { provide: NoteService, useValue: mockData },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        noteService = TestBed.get(NoteService);
        fixture = TestBed.createComponent(NoteSearchComponent);
        debugElement = fixture.debugElement;
        noteSearchComponent = fixture.componentInstance;
    });

    it('should create', () => {
        expect(noteSearchComponent).toBeTruthy();
    });

    describe('When the component starts', () => {
        it('should the notes variable be undefined', () => {
            expect(noteSearchComponent.notes$).toBeUndefined();
        });
        it('should the searchTerms variable be defined', () => {
            expect(noteSearchComponent['searchTerms']).toBeDefined();
        });
    });

    describe('When the ngOninit method starts', () => {
        it('should the notes variable be defined', () => {
            fixture.detectChanges();
            expect(noteSearchComponent.notes$).toBeDefined();
        });
    });

    describe('When user writes at search input text', () => {
        it('should call function search with search term', () => {
            spyOn(noteSearchComponent, 'search')
            const term = 'task';
            fixture.detectChanges();
            const input = debugElement.query(By.css('#search-box'));
            input.nativeElement.value = term;
            input.triggerEventHandler('keyup', null);
            expect(noteSearchComponent.search).toHaveBeenCalled();
            expect(noteSearchComponent.search).toHaveBeenCalledTimes(1);
            expect(noteSearchComponent.search).toHaveBeenCalledWith(term);
        });

        it('should call function next of the searchTerms with search term', () => {
            const term = 'task';
            spyOn(noteSearchComponent['searchTerms'], 'next');
            fixture.detectChanges();
            noteSearchComponent.search(term);
            expect(noteSearchComponent['searchTerms'].next).toHaveBeenCalled();
            expect(noteSearchComponent['searchTerms'].next).toHaveBeenCalledTimes(1);
            expect(noteSearchComponent['searchTerms'].next).toHaveBeenCalledWith(term);
        });

        it('should with the correct search term, the variable notes have at least a note', fakeAsync(() => {
            spyOn(noteService, 'searchNotes').and.callThrough();
            fixture.detectChanges();

            const input = fixture.debugElement.query(By.css('#search-box'));
            input.nativeElement.value = 'task';
            input.triggerEventHandler('keyup', null);

            tick(600);
            fixture.detectChanges();

            expect(noteService.searchNotes).toHaveBeenCalled();
        }));
    });
});
