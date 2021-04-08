import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Movie } from 'src/app/common/movie';
import { Movieshelf } from 'src/app/common/movieshelf';
import { MovieshelfItem } from 'src/app/common/movieshelf-item';
import { User } from 'src/app/common/user';
import { MovieListService } from 'src/app/services/movie-list.service';
import { MovieshelfItemService } from 'src/app/services/movieshelf-item.service';
import { MovieshelfService } from 'src/app/services/movieshelf.service';
import { TodoListStorageService } from 'src/app/services/todo-list-storage.service';
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
  ],
})
export class MovieshelfComponent implements OnInit, AfterViewInit {

  createShelf: any = {
    newGoal: null
  }
  editGoalForm: any = {
    newGoal: null
  }
  shelfItemForm: FormGroup;

  currentShelfItem: MovieshelfItem = new MovieshelfItem();
  currentTitle: string;
  user: User;
  currentYear: number;
  reachRate: number;
  goal: number;
  shelf: Movieshelf;
  shelfName: string;

  ListingDataSource: any = new MatTableDataSource();
  dataSource: any = new MatTableDataSource();
  columnsToDisplay = ['title', 'director', 'rating', 'status'];
  expandedElement: PeriodicElement | null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private yearPickerService: YearPickerService,
    private todoListStorageService: TodoListStorageService,
    private movieshelfService: MovieshelfService,
    private movieshelfItemService: MovieshelfItemService,
    private movieListService: MovieListService
  ) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    if (this.user == null) {
      this.router.navigate(['login']);
    } else {

      this.yearPickerService.currentYear.subscribe(data => {
        this.currentYear = data;
        this.getShelfByUserIdAndShelfName(this.user.id, data);
      });

      this.updateListingItems();

      this.shelfItemForm = this.formBuilder.group({
        'id': ['', Validators.required],
        'rating': [''],
        'reason': [''],
        'status': ['', Validators.required],
        'comment': [],
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getShelfByUserIdAndShelfName(userId: number, shelfName: number): void {
    this.movieshelfService.getMovieshelfByUserId(userId).subscribe(
      data => {
        const found = data.find(shelf => shelf.name === shelfName.toString());
        if (found) {
          this.shelf = found;
          this.shelfName = found.name;
          this.reachRate = found.reachRate * 100;
          this.goal = found.goal;
          this.dataSource = new MatTableDataSource(found.movieshelfItems);
          this.dataSource.sort = this.sort;
        } else {
          this.shelf = new Movieshelf();
          this.shelfName = null;
          this.dataSource = new MatTableDataSource();
          this.reachRate = 0;
          this.goal = 0;
        }
      }
    );
  }

  updateListingItems() {
    this.movieListService.listingMoviesSubject.subscribe(
      data => this.ListingDataSource = new MatTableDataSource(data)
    );
  }

  editGoal() {
    const newGoal = this.editGoalForm.newGoal;
    if (this.shelf.id && newGoal) {
      this.shelf.goal = newGoal;
      this.computeReachRate(this.shelf);
    }
  }

  computeReachRate(shelf: Movieshelf): void {
    const goal = shelf.goal;
    let count = 0;
    const element = shelf.movieshelfItems;
    for (let i = 0; i < element.length; i++) {
      if (element[i].rating > 0 && element[i].status === 'FINISHED') {

        count++;
      }
    }
    const newReachRate: number = +(count / goal).toFixed(2);
    shelf.reachRate = newReachRate;
    this.reachRate = newReachRate * 100;
    this.goal = goal;
    this.movieshelfService.updateMovieshelfGoal(shelf).subscribe();
  }

  buildShelf() {
    const newGoal = this.createShelf.newGoal;
    if (newGoal) {
      const newshelf = new Movieshelf();
      newshelf.name = this.currentYear.toString();
      newshelf.goal = newGoal;
      newshelf.reachRate = 0;
      newshelf.movieshelfItems = [];
      this.shelfName = newshelf.name;
      this.shelf = newshelf;
      this.goal = newGoal;
      this.reachRate = 0;
      this.movieshelfService.addMovieshelf(this.user.id, newshelf).subscribe(
        data => this.shelf = data
      );
    }
  }

  openEditshelfModal(shelfItemId: number) {
    this.movieshelfItemService.findMovieshelfItemById(shelfItemId).subscribe(
      data => {
        this.currentShelfItem = data;
        this.currentTitle = data.movie.title;
        this.shelfItemForm.patchValue(data);
      });
  }

  updateMovieshelfItem() {
    const formValue = this.shelfItemForm.value;
    const shelfItem: MovieshelfItem = this.currentShelfItem;
    shelfItem.id = formValue.id;
    shelfItem.rating = formValue.rating;
    shelfItem.reason = formValue.reason;
    shelfItem.status = formValue.status;
    shelfItem.comment = formValue.comment;

    let shelfId = undefined;

    if (shelfItem.status == 'LISTING') {
      shelfId = this.todoListStorageService.getMovieshelfId();
    } else {
      shelfId = this.shelf.id;
    }
    this.movieshelfItemService.updateMovieshelfItem(shelfId, shelfItem).subscribe(
      data => { 
        const newList = (data.find(shelf => shelf.name === 'todo').movieshelfItems);
        this.ListingDataSource = new MatTableDataSource(newList);
        this.movieListService.update(newList);

        const currentShelf = data.find(shelf => shelf.name != 'todo');
        if(currentShelf){
          this.shelf= currentShelf;
          this.computeReachRate(currentShelf);
          this.dataSource = new MatTableDataSource(currentShelf.movieshelfItems);
        }else {
          const idx = this.shelf.movieshelfItems.findIndex(item => item.id == shelfItem.id);
          if(idx != -1) {
            this.shelf.movieshelfItems.splice(idx, 1);
            this.computeReachRate(this.shelf);
            this.dataSource = new MatTableDataSource(this.shelf.movieshelfItems);
          }
        }
        
      }
    );
  }

  deleteListingItem() {
    const currentShelfItemId = this.shelfItemForm.value.id;

    this.movieshelfItemService.deleteListingItem(currentShelfItemId).subscribe(
      data => {
      const newList = data.movieshelfItems;
      this.ListingDataSource = new MatTableDataSource(newList);
      this.movieListService.update(newList);
  });
    
  }
}

export interface PeriodicElement {
  id: number,
  movie: Movie,
  comment: string,
  rating: number,
  movieshelfItems: MovieshelfItem[];
}