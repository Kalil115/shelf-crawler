import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tvshelf } from '../common/tvshelf';

@Injectable({
  providedIn: 'root'
})
export class TvshelfService {

  private baseUrl = 'http://localhost:8080/tvshelves';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  getTvshelfByUserId(userId: number): Observable<Tvshelf[]> {
    const url = this.baseUrl + '/search/findByUserId?id=' + userId;
    return this.httpClient.get<Tvshelf[]>(url);
  }

  getTvshelfById(tvshelfId: number): Observable<Tvshelf> {
    const url = this.baseUrl + '/' + tvshelfId;
    return this.httpClient.get<Tvshelf>(url);
  }

  updateTvshelfGoal(tvshelf: Tvshelf): Observable<void> {
    const url = this.baseUrl + "/updateTvshelfGoal/" + tvshelf.id;
    return this.httpClient.put<void>(url, tvshelf, this.httpOptions);
  }

  addTvshelf(userId:number, tvshelf: Tvshelf): Observable<Tvshelf> {
    return this.httpClient.post<Tvshelf>(this.baseUrl,
    {
      userId,
      tvshelf
    }, 
    this.httpOptions);
  }
}
