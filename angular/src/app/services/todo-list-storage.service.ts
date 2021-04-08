import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoListStorageService {

  private bookKey = "bookTodoListId";
  private movieKey = "movieTodoListId";
  private tvKey = "tvTodoListId";
  private gameKey = "gameTodoListId";

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

  public saveTvshelfId(tvshelfId: number): void {
    window.sessionStorage.removeItem(this.tvKey);
    window.sessionStorage.setItem(this.tvKey, tvshelfId.toString());
  }

  public getTvshelfId():number | null {
    return +window.sessionStorage.getItem(this.tvKey);
  }

  public saveGameshelfId(gameshelfId: number): void {
    window.sessionStorage.removeItem(this.gameKey);
    window.sessionStorage.setItem(this.gameKey, gameshelfId.toString());
  }

  public getGameshelfId():number | null {
    return +window.sessionStorage.getItem(this.gameKey);
  }
}
