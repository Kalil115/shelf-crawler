import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movieshelf } from '../common/movieshelf';

@Injectable({
  providedIn: 'root'
})
export class MovieshelfService{

  private baseUrl = 'http://localhost:8080/movieshelves';

  constructor(private httpClient: HttpClient) { }


  getMovieshelfByUserId(userId: number): Observable<Movieshelf[]> {
    const url = this.baseUrl + '/search/findByUserId?id=' + userId;
    return this.httpClient.get<Movieshelf[]>(url);
  }
}
