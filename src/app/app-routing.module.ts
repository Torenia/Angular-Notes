import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteArchiveComponent } from './note-archive/note-archive.component';

const routes: Routes = [
  {path: 'notes', component: NotesComponent},
  {path: '', redirectTo: '/notes', pathMatch: 'full'},
  {path: 'detail/:id', component: NoteDetailComponent},
  {path: 'archive', component: NoteArchiveComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
