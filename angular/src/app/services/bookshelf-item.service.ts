import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookshelfItem } from '../common/bookshelf-items';

@Injectable({
  providedIn: 'root'
})
export class BookshelfItemService {

  private baseUrl = 'http://localhost:8080/bookshelfItems';

  constructor(private httpClient: HttpClient) { }


  findBookshelfItemById(bookshelfItemId: number): Observable<BookshelfItem> {
    const url = this.baseUrl + "/" + bookshelfItemId;
    return this.httpClient.get<BookshelfItem>(url);
  }
}
