import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/common/movie';
import { MovieshelfItem } from 'src/app/common/movieshelf-item';
import { User } from 'src/app/common/user';
import { MovieshelfService } from 'src/app/services/movieshelf.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { YearPickerService } from 'src/app/services/year-picker.service';

@Component({
  selector: 'app-movieshelf',
  templateUrl: './movieshelf.component.html',
  styleUrls: ['./movieshelf.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MovieshelfComponent implements OnInit {

  user: User;
  currentYear: number;
  movieshelfItems: MovieshelfItem[];
  columnsToDisplay = ['title', 'director', 'rating', 'status'];
  expandedElement: PeriodicElement | null;

  constructor(private tokenStorageService:TokenStorageService,
              private router: Router,
              private yearPickerService: YearPickerService,
              private movieshelfService: MovieshelfService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    if(this.user == null) {
      this.router.navigate(['login']);
    }

    this.yearPickerService.currentYear.subscribe(data => {
      this.currentYear = data;
      this.getMovieshelfByUserIdAndMovieshelfName(this.user.id, data);
    });
    
  }

  getMovieshelfByUserIdAndMovieshelfName(userId: number, movieshelfName: number): void {
    this.movieshelfService.getMovieshelfByUserId(userId).subscribe(
      data => {
        const found = data.find(movieshelf => movieshelf.name === movieshelfName.toString());
        if(found){
          this.movieshelfItems = found.movieshelfItems;
        }else{
          this.movieshelfItems = null;
        }
      }
    );
  }

}

export interface PeriodicElement {
  id: number,
  movie: Movie,
  comment: string,
  rating: number,
  movieshelfItems: MovieshelfItem[];
}

