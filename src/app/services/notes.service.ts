import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn : 'root'
})
export class NotesService {

  private apiURL: string

  constructor (private httpClient: HttpClient, private authService: AuthenticationService) {
    this.apiURL = 'http://localhost:3000/api/v1/notes'
  }

  getNotes(): Observable<Array<Note>> {
    return this.httpClient.get<Note[]>(this.apiURL, {
      headers: new HttpHeaders().set(
        'Authorization', `Bearer ${this.authService.getBearerToken()}`
      )
    });
  }

  addNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>(this.apiURL, {
      headers: new HttpHeaders().set(
        'Authorization', `Bearer ${this.authService.getBearerToken()}`
      ).set(
        'date',`${note}`
      )
    });
  }

}
