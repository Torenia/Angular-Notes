import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NoteService } from './note.service';
import { Note } from './note';

const mockData = [
  {id: 1, task: 'The first task', isArchived: false},
  {id: 2, task: 'The second task', isArchived: false},
  {id: 3, task: 'The third task', isArchived: false}
] as Note[];

const mockNotes = [...mockData];
const mockNote = mockNotes[0];
const mockId = mockNote.id;

describe('Note Service', () => {

  let noteService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [NoteService]
    });
    httpTestingController = TestBed.get(HttpTestingController);

    noteService = TestBed.get(NoteService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(noteService).toBeTruthy();
  });

  describe('getNotes', () => {
    it('should return mock notes', () => {
      spyOn(noteService, 'handleError').and.callThrough();

      noteService.getNotes().subscribe(
        notes => expect(notes.length).toEqual(mockNotes.length),
        fail
      );

      const req = httpTestingController.expectOne(noteService.notesUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(mockNotes);
    });

    it('should turn 404 into an error', () => {
      spyOn(noteService, 'handleError').and.callThrough();

      noteService.getNotes().subscribe(
        notes => expect(notes).toEqual([]),
        fail
      );

      const req = httpTestingController.expectOne(noteService.notesUrl);
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(noteService.handleError).toHaveBeenCalledTimes(1);
    });
  });

  describe('getNoteNo404', () => {

    it('should return a single mock note', () => {
      spyOn(noteService, 'handleError').and.callThrough();

      noteService.getNoteNo404(mockId).subscribe(
        response => expect(response).toEqual(mockNote),
        fail
      );

      const req = httpTestingController.expectOne(`${noteService.notesUrl}/?id=${mockId}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockNotes);
    });

    it('should fail with undefined when id not found', () => {
      spyOn(noteService, 'handleError').and.callThrough();

      noteService.getNoteNo404(mockId).subscribe(
        response => expect(response).toBeUndefined(),
        fail
      );

      const req = httpTestingController.expectOne(`${noteService.notesUrl}/?id=${mockId}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockNote);
    });

    it('should fail on error', () => {
      spyOn(noteService, 'handleError').and.callThrough();

      noteService.getNoteNo404(mockId).subscribe(
        notes => expect(notes).toBeUndefined(),
        fail
      );

      const req = httpTestingController.expectOne(`${noteService.notesUrl}/?id=${mockId}`);
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(noteService.handleError).toHaveBeenCalledTimes(1);
    });
  });

  describe('getNote', () => {

    it('should return a single mock note', () => {
      spyOn(noteService, 'handleError').and.callThrough();

      noteService.getNote(mockId).subscribe(
        response => expect(response).toEqual(mockNote),
        fail
      );

      const req = httpTestingController.expectOne(`${noteService.notesUrl}/${mockId}`);
      expect(req.request.method).toEqual('GET');

      req.flush(mockNote);
    });

    it('should fail on error', () => {
      spyOn(noteService, 'handleError').and.callThrough();

      noteService.getNote(mockId).subscribe(
        response => expect(response).toBeUndefined(),
        fail
      );

      const req = httpTestingController.expectOne(`${noteService.notesUrl}/${mockId}`);
      expect(req.request.method).toEqual('GET');

      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(noteService.handleError).toHaveBeenCalledTimes(1);
    });
  });

  describe('searchNote', () => {
    it('should find notes matching the search criteria', () => {
      const searchTerm = 'task';
      spyOn(noteService, 'handleError').and.callThrough();

      noteService.searchNotes(searchTerm).subscribe(
        response => expect(response).toEqual([mockNotes[1], mockNotes[2]]),
        fail
      );

      const req = httpTestingController.expectOne(`${noteService.notesUrl}/?task=${searchTerm}`);
      expect(req.request.method).toEqual('GET');
      req.flush([mockNotes[1], mockNotes[2]]);
    });

    it('should not find notes matching the search criteria', () => {
      const searchTerm = 'task';
      spyOn(noteService, 'handleError').and.callThrough();

      noteService.searchNotes(searchTerm).subscribe(
        response => expect(response).toEqual([]),
        fail
      );

      const req = httpTestingController.expectOne(`${noteService.notesUrl}/?task=${searchTerm}`);
      expect(req.request.method).toEqual('GET');
      req.flush([]);
    });


    it('should return an empty array when passing an empty search string', () => {
      const searchTerm = '';
      spyOn(noteService, 'handleError').and.callThrough();

      noteService.searchNotes(searchTerm).subscribe(
        response => expect(response).toEqual([]),
        fail
      );

      expect(noteService.handleError).not.toHaveBeenCalled();
    });

    it('should fail on error', () => {
      const searchTerm = 'task';

      noteService.searchNotes(searchTerm).subscribe(
        response => expect(response).toEqual([]),
        fail
      );

      const req = httpTestingController.expectOne(`${noteService.notesUrl}/?task=${searchTerm}`);
      expect(req.request.method).toEqual('GET');
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });
    });
  });

  describe('addNote', () => {

    it('should add a single Note', () => {
      spyOn(noteService, 'handleError').and.callThrough();

      noteService.addNote(mockNote).subscribe(
        response => expect(response).toEqual(mockNote),
        fail
      );

      const req = httpTestingController.expectOne(`${noteService.notesUrl}`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockNote);
    });

    it('should fail on error', () => {
      spyOn(noteService, 'handleError').and.callThrough();

      noteService.addNote(mockNote).subscribe(
        response => expect(response).toBeUndefined(),
        fail
      );

      const req = httpTestingController.expectOne(`${noteService.notesUrl}`);
      expect(req.request.method).toEqual('POST');
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(noteService.handleError).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteNote', () => {

    it('should delete note using id', () => {
      spyOn(noteService, 'handleError').and.callThrough();

      noteService.deleteNote(mockId).subscribe(
        response => expect(response).toEqual(mockId),
        fail
      );

      const req = httpTestingController.expectOne(`${noteService.notesUrl}/${mockId}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockId);
    });

    it('should delete note using note object', () => {
      spyOn(noteService, 'handleError').and.callThrough();

      noteService.deleteNote(mockNote).subscribe(
        response => expect(response).toEqual(mockId),
        fail
      );

      const req = httpTestingController.expectOne(`${noteService.notesUrl}/${mockId}`);
      expect(req.request.method).toEqual('DELETE');

      req.flush(mockId);
    });
  });

  describe('updateNote', () => {
    it('should update note', () => {
      spyOn(noteService, 'handleError').and.callThrough();

      noteService.updateNote(mockNote).subscribe(
        response => expect(response).toBeUndefined(),
        fail
      );

      const req = httpTestingController.expectOne(noteService.notesUrl);
      expect(req.request.method).toEqual('PUT');
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(noteService.handleError).toHaveBeenCalledTimes(1);
    });

    it('should fail on error', () => {
      spyOn(noteService, 'handleError').and.callThrough();

      noteService.updateNote(mockNote).subscribe(
        response => expect(response).toEqual(mockNote),
        fail
      );

      const req = httpTestingController.expectOne(noteService.notesUrl);
      expect(req.request.method).toEqual('PUT');
      req.flush(mockNote);
    });
  });

  describe('handleError', () => {
    it('should handle error', () => {

      spyOn(noteService, 'handleError').and.callThrough();
      spyOn(console, 'error');

      noteService.getNote(mockId).subscribe(
        response => expect(response).toBeUndefined(),
        fail
      );

      const req = httpTestingController.expectOne(`${noteService.notesUrl}/${mockId}`);
      expect(req.request.method).toEqual('GET');
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(noteService.handleError).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });
});
