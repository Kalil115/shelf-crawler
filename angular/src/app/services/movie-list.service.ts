import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Movie } from '../common/movie';
import { MovieshelfItem } from '../common/movieshelf-item';
import { MovieshelfItemService } from './movieshelf-item.service';
import { MovieshelfService } from './movieshelf.service';
import { TodoListStorageService } from './todo-list-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  listingMoviesSubject: Subject<MovieshelfItem[]> = new BehaviorSubject<MovieshelfItem[]>([]);
  listingMoviesSize: Subject<number> = new BehaviorSubject<number>(0);

  listingMovies: MovieshelfItem[] = [];


  constructor(
    private todoListStorageService:TodoListStorageService,
    private movieshelfItemService: MovieshelfItemService,
    private movieshelfService: MovieshelfService
    ) { }

  fetchInitData(userId: number) {
    this.movieshelfService.getMovieshelfByUserId(userId).subscribe(
      data => {
        const found = data.find(shelf => shelf.name === "todo");
        if (found) {
          this.todoListStorageService.saveMovieshelfId(found.id);
          this.listingMovies = found.movieshelfItems;
          this.refresh();
        }
      });
  }


    // add a new movie from browse component
    addToMovieTodoList(newMovie: Movie) {

      let newMovieshelfItem: MovieshelfItem = new MovieshelfItem();
      newMovieshelfItem.movie = newMovie;
      newMovieshelfItem.status = "LISTING";
  
      let duplicate: MovieshelfItem = undefined;
  
      if (this.listingMovies.length > 0) {
        duplicate = this.listingMovies.find(item => item.movie.id == newMovieshelfItem.movie.id);
      }
  
      if (duplicate == undefined) {
      const todoShelfId = this.todoListStorageService.getMovieshelfId();
  
        this.movieshelfItemService.addMovieshelfItem(todoShelfId, newMovieshelfItem).subscribe(
          data => {
            this.listingMovies.push(data);
            this.refresh();
          });
      }
    }
  
    remove(movieshelfItem: MovieshelfItem) {
      const idx = this.listingMovies.findIndex(item => item.id == movieshelfItem.id);
      if (idx > -1) {
        this.listingMovies.splice(idx, 1);
        this.refresh();
      }
    }
  
    refresh() {
      this.listingMoviesSubject.next(this.listingMovies);
      this.listingMoviesSize.next(this.listingMovies.length);
    }
  
    update(movieshelfItems: MovieshelfItem[]){
      this.listingMovies = movieshelfItems;
      this.refresh();
    }
  

}
