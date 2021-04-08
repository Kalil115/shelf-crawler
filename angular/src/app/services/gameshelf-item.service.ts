import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gameshelf } from '../common/gameshelf';
import { GameshelfItem } from '../common/gameshelf-item';
import { TodoListStorageService } from './todo-list-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GameshelfItemService {

  private baseUrl = 'http://localhost:8080/gameshelfItems';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient,
    private todoListStorageService: TodoListStorageService) { }


  findGameshelfItemById(gameshelfItemId: number): Observable<GameshelfItem> {
    const url = this.baseUrl + "/" + gameshelfItemId;
    return this.httpClient.get<GameshelfItem>(url);
  }


  updateGameshelfItem(gameshelfId: number, gameshelfItem: GameshelfItem): Observable<Gameshelf[]> {
    const url = this.baseUrl + "/" + gameshelfItem.id;
    const todoGameshelfId = this.todoListStorageService.getGameshelfId();
    return this.httpClient.put<Gameshelf[]>(url,
      {
        todoGameshelfId,
        gameshelfId,
        gameshelfItem
      },this.httpOptions);
  }

  addGameshelfItem(gameshelfId: number, gameshelfItem: GameshelfItem):Observable<GameshelfItem> {
    return this.httpClient.post<GameshelfItem>(this.baseUrl, {gameshelfId, gameshelfItem},this.httpOptions);
  }

  deleteListingItem(gameshelfItemId: number) : Observable<Gameshelf> {
    return this.httpClient.delete<Gameshelf>(this.baseUrl + "/" + gameshelfItemId);
  }

}
