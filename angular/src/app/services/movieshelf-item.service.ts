import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movieshelf } from '../common/movieshelf';
import { MovieshelfItem } from '../common/movieshelf-item';
import { TodoListStorageService } from './todo-list-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MovieshelfItemService {

  private baseUrl = 'http://localhost:8080/movieshelfItems';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private httpClient: HttpClient,
    private todoListStorageService: TodoListStorageService
  ) { }


  findMovieshelfItemById(movieshelfItemId: number): Observable<MovieshelfItem> {
    const url = this.baseUrl + "/" + movieshelfItemId;
    return this.httpClient.get<MovieshelfItem>(url);
  }


  updateMovieshelfItem(shelfId: number, shelfItem: MovieshelfItem): Observable<Movieshelf[]> {
    const url = this.baseUrl + "/" + shelfItem.id;
    const todoMovieshelfId = this.todoListStorageService.getMovieshelfId();
    return this.httpClient.put<Movieshelf[]>(url,
      {
        todoMovieshelfId,
        shelfId,
        shelfItem
      }, this.httpOptions);
  }

  addMovieshelfItem(shelfId: number, shelfItem: MovieshelfItem): Observable<MovieshelfItem> {
    return this.httpClient.post<MovieshelfItem>(this.baseUrl,
      {
        shelfId,
        shelfItem
      }, this.httpOptions);
  }

  deleteListingItem(shelfItemId: number): Observable<Movieshelf> {
    return this.httpClient.delete<Movieshelf>(this.baseUrl + "/" + shelfItemId);
  }
}
