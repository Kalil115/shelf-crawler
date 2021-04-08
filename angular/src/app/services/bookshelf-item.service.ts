import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../common/book';
import { BookshelfItem } from '../common/bookshelf-items';

@Injectable({
  providedIn: 'root'
})
export class BookshelfItemService {

  private baseUrl = 'http://localhost:8080/bookshelfItems';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }


  findBookshelfItemById(bookshelfItemId: number): Observable<BookshelfItem> {
    const url = this.baseUrl + "/" + bookshelfItemId;
    return this.httpClient.get<BookshelfItem>(url);
  }


  updateBookshelfItem(bookshelfId: number, bookshelfItem: BookshelfItem): Observable<BookshelfItem> {
    const url = this.baseUrl + "/" + bookshelfItem.id;
    return this.httpClient.put<BookshelfItem>(url,
      {
        bookshelfId,
        bookshelfItem
      },this.httpOptions);
  }

  addBookshelfItem(bookshelfId: number, bookshelfItem: BookshelfItem):Observable<BookshelfItem> {
    return this.httpClient.post<BookshelfItem>(this.baseUrl, {bookshelfId, bookshelfItem},this.httpOptions);
  }

}
