import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movieshelf } from '../common/movieshelf';

@Injectable({
  providedIn: 'root'
})
export class MovieshelfService{

  private baseUrl = 'http://localhost:8080/movieshelves';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  
  constructor(private httpClient: HttpClient) { }


  getMovieshelfByUserId(userId: number): Observable<Movieshelf[]> {
    const url = this.baseUrl + '/search/findByUserId?id=' + userId;
    return this.httpClient.get<Movieshelf[]>(url);
  }

  getMovieshelfById(shelfId: number): Observable<Movieshelf> {
    const url = this.baseUrl + '/' + shelfId;
    return this.httpClient.get<Movieshelf>(url);
  }

  updateMovieshelfGoal(shelf: Movieshelf): Observable<void> {
    const url = this.baseUrl + "/updateMovieshelfGoal/" + shelf.id;
    return this.httpClient.put<void>(url, shelf, this.httpOptions);
  }

  addMovieshelf(userId:number, movieshelf: Movieshelf): Observable<Movieshelf> {
    return this.httpClient.post<Movieshelf>(this.baseUrl,
    {
      userId,
      movieshelf
    }, 
    this.httpOptions);
  }
  
}
