import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../common/book';
import { Bookshelf } from '../common/bookshelf';
import { BookshelfItem } from '../common/bookshelf-items';
import { TodoListStorageService } from './todo-list-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BookshelfItemService {

  private baseUrl = 'http://localhost:8080/bookshelfItems';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient,
    private todoListStorageService: TodoListStorageService) { }


  findBookshelfItemById(bookshelfItemId: number): Observable<BookshelfItem> {
    const url = this.baseUrl + "/" + bookshelfItemId;
    return this.httpClient.get<BookshelfItem>(url);
  }


  updateBookshelfItem(bookshelfId: number, bookshelfItem: BookshelfItem): Observable<Bookshelf[]> {
    const url = this.baseUrl + "/" + bookshelfItem.id;
    const todoBookshelfId = this.todoListStorageService.getbookshelfId();
    return this.httpClient.put<Bookshelf[]>(url,
      {
        todoBookshelfId,
        bookshelfId,
        bookshelfItem
      },this.httpOptions);
  }

  addBookshelfItem(bookshelfId: number, bookshelfItem: BookshelfItem):Observable<BookshelfItem> {
    return this.httpClient.post<BookshelfItem>(this.baseUrl, {bookshelfId, bookshelfItem},this.httpOptions);
  }

  deleteListingItem(bookshelfItemId: number) : Observable<Bookshelf> {
    return this.httpClient.delete<Bookshelf>(this.baseUrl + "/" + bookshelfItemId);
  }

}
