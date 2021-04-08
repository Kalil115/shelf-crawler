import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { User } from 'src/app/common/user';
import { BookListService } from 'src/app/services/book-list.service';
import { GameListService } from 'src/app/services/game-list.service';
import { MovieListService } from 'src/app/services/movie-list.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TvListService } from 'src/app/services/tv-list.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  bookshlefItemListSize: number = 0;
  movieshelfItemListSize: number = 0;
  tvshelfItemListSize: number = 0;
  gameshelfItemListSize: number = 0;

  user: User;

  constructor(private tokenStorageService:TokenStorageService,
     private bookListService: BookListService,
     private movieListService: MovieListService,
     private tvListService: TvListService,
     private gameListService: GameListService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    if(this.user){
      this.bookListService.fetchInitData(this.user.id);
      this.movieListService.fetchInitData(this.user.id);
      this.tvListService.fetchInitData(this.user.id);
      this.gameListService.fetchInitData(this.user.id);
    }

    this.updateAllListSize();
  }

  updateAllListSize() {
    this.bookListService.bookshelfItemListSize.subscribe(data => this.bookshlefItemListSize = data);
    this.movieListService.listingMoviesSize.subscribe(data => this.movieshelfItemListSize = data);
    this.tvListService.tvshelfItemListSize.subscribe(data => this.tvshelfItemListSize = data);
    this.gameListService.gameshelfItemListSize.subscribe(data => this.gameshelfItemListSize = data);
  }

 
}
