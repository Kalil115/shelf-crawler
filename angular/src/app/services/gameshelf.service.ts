import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gameshelf } from '../common/gameshelf';

@Injectable({
  providedIn: 'root'
})
export class GameshelfService {
  
  private baseUrl = 'http://localhost:8080/gameshelves';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  getGameshelfByUserId(userId: number): Observable<Gameshelf[]> {
    const url = this.baseUrl + '/search/findByUserId?id=' + userId;
    return this.httpClient.get<Gameshelf[]>(url);
  }

  getGameshelfById(gameshelfId: number): Observable<Gameshelf> {
    const url = this.baseUrl + '/' + gameshelfId;
    return this.httpClient.get<Gameshelf>(url);
  }

  updateGameshelfGoal(gameshelf: Gameshelf): Observable<void> {
    const url = this.baseUrl + "/updateGameshelfGoal/" + gameshelf.id;
    return this.httpClient.put<void>(url, gameshelf, this.httpOptions);
  }

  addGameshelf(userId:number, gameshelf: Gameshelf): Observable<Gameshelf> {
    return this.httpClient.post<Gameshelf>(this.baseUrl,
    {
      userId,
      gameshelf
    }, 
    this.httpOptions);
  }
}