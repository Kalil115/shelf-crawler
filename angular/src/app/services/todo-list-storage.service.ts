import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoListStorageService {

  private bookTodoListKey = "booktodoListId";

  constructor() { }

  public savebookshelfId(bookshelfId: number): void {
    window.sessionStorage.removeItem(this.bookTodoListKey);
    window.sessionStorage.setItem(this.bookTodoListKey, bookshelfId.toString());
  }

  public getbookshelfId():number | null {
    return +window.sessionStorage.getItem(this.bookTodoListKey);
  }

}
