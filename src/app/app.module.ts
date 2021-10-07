import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { NoteSearchComponent } from './note-search/note-search.component';
import { RouterModule } from '@angular/router';
import { NoteArchiveComponent } from './note-archive/note-archive.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NoteDetailComponent,
    NoteSearchComponent,
    NoteArchiveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
