import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tvshelf } from '../common/tvshelf';
import { TvshelfItem } from '../common/tvshelf-item';
import { TodoListStorageService } from './todo-list-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TvshelfItemService {

  private baseUrl = 'http://localhost:8080/tvshelfItems';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient,
    private todoListStorageService: TodoListStorageService) { }


  findTvshelfItemById(tvshelfItemId: number): Observable<TvshelfItem> {
    const url = this.baseUrl + "/" + tvshelfItemId;
    return this.httpClient.get<TvshelfItem>(url);
  }


  updateTvshelfItem(tvshelfId: number, tvshelfItem: TvshelfItem): Observable<Tvshelf[]> {
    const url = this.baseUrl + "/" + tvshelfItem.id;
    const todoTvshelfId = this.todoListStorageService.getTvshelfId();
    return this.httpClient.put<Tvshelf[]>(url,
      {
        todoTvshelfId,
        tvshelfId,
        tvshelfItem
      },this.httpOptions);
  }

  addTvshelfItem(tvshelfId: number, tvshelfItem: TvshelfItem):Observable<TvshelfItem> {
    return this.httpClient.post<TvshelfItem>(this.baseUrl, {tvshelfId, tvshelfItem},this.httpOptions);
  }

  deleteListingItem(tvshelfItemId: number) : Observable<Tvshelf> {
    return this.httpClient.delete<Tvshelf>(this.baseUrl + "/" + tvshelfItemId);
  }
}
