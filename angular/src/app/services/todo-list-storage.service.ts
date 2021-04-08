import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoListStorageService {

  private bookKey = "bookTodoListId";
  private movieKey = "movieTodoListId";

  constructor() { }

  public savebookshelfId(bookshelfId: number): void {
    window.sessionStorage.removeItem(this.bookKey);
    window.sessionStorage.setItem(this.bookKey, bookshelfId.toString());
  }

  public getbookshelfId():number | null {
    return +window.sessionStorage.getItem(this.bookKey);
  }


  public saveMovieshelfId(movieshelfId: number): void {
    window.sessionStorage.removeItem(this.movieKey);
    window.sessionStorage.setItem(this.movieKey, movieshelfId.toString());
  }

  public getMovieshelfId():number | null {
    return +window.sessionStorage.getItem(this.movieKey);
  }

}
