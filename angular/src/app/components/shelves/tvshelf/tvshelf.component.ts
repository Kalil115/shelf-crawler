import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Tv } from 'src/app/common/tv';
import { Tvshelf } from 'src/app/common/tvshelf';
import { TvshelfItem } from 'src/app/common/tvshelf-item';
import { User } from 'src/app/common/user';
import { TodoListStorageService } from 'src/app/services/todo-list-storage.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { YearPickerService } from 'src/app/services/year-picker.service';

@Component({
  selector: 'app-tvshelf',
  templateUrl: './tvshelf.component.html',
  styleUrls: ['./tvshelf.component.css']
})
export class TvshelfComponent implements OnInit {

  createShelf: any = {
    newGoal: null
  }
  editGoalForm: any = {
    newGoal: null
  }
  shelfItemForm: FormGroup;

  currentShelfItem: TvshelfItem = new TvshelfItem();
  currentTitle: string;
  user: User;
  currentYear: number;
  reachRate: number;
  goal: number;
  shelf: Tvshelf;
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
    private tvshelfService: TvshelfService,
    private tvshelfItemService: TvshelfItemService,
    private tvListService: TvListService
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
    this.tvshelfService.getTvshelfByUserId(userId).subscribe(
      data => {
        const found = data.find(shelf => shelf.name === shelfName.toString());
        if (found) {
          this.shelf = found;
          this.shelfName = found.name;
          this.reachRate = found.reachRate * 100;
          this.goal = found.goal;
          this.dataSource = new MatTableDataSource(found.tvshelfItems);
          this.dataSource.sort = this.sort;
        } else {
          this.shelf = new Tvshelf();
          this.shelfName = null;
          this.dataSource = new MatTableDataSource();
          this.reachRate = 0;
          this.goal = 0;
        }
      }
    );
  }

  updateListingItems() {
    this.tvListService.listingTvsSubject.subscribe(
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

  computeReachRate(shelf: Tvshelf): void {
    const goal = shelf.goal;
    let count = 0;
    const element = shelf.tvshelfItems;
    for (let i = 0; i < element.length; i++) {
      if (element[i].rating > 0 && element[i].status === 'FINISHED') {

        count++;
      }
    }
    const newReachRate: number = +(count / goal).toFixed(2);
    shelf.reachRate = newReachRate;
    this.reachRate = newReachRate * 100;
    this.goal = goal;
    this.tvshelfService.updateTvshelfGoal(shelf).subscribe();
  }

  buildShelf() {
    const newGoal = this.createShelf.newGoal;
    if (newGoal) {
      const newshelf = new Tvshelf();
      newshelf.name = this.currentYear.toString();
      newshelf.goal = newGoal;
      newshelf.reachRate = 0;
      newshelf.tvshelfItems = [];
      this.shelfName = newshelf.name;
      this.shelf = newshelf;
      this.tvshelfService.addTvshelf(this.user.id, newshelf).subscribe(
        data => this.shelf = data
      );
    }
  }

  openEditshelfModal(shelfItemId: number) {
    this.tvshelfItemService.findTvshelfItemById(shelfItemId).subscribe(
      data => {
        this.currentShelfItem = data;
        this.currentTitle = data.tv.title;
        this.shelfItemForm.patchValue(data);
      });
  }

  updateTvshelfItem() {
    const formValue = this.shelfItemForm.value;
    const shelfItem: TvshelfItem = this.currentShelfItem;
    shelfItem.id = formValue.id;
    shelfItem.rating = formValue.rating;
    shelfItem.reason = formValue.reason;
    shelfItem.status = formValue.status;
    shelfItem.comment = formValue.comment;

    let shelfId = undefined;

    if (shelfItem.status == 'LISTING') {
      shelfId = this.todoListStorageService.getTvshelfId();
    } else {
      shelfId = this.shelf.id;
    }
    this.tvshelfItemService.updateTvshelfItem(shelfId, shelfItem).subscribe(
      data => { 
        const newList = (data.find(shelf => shelf.name === 'todo').tvshelfItems);
        this.ListingDataSource = new MatTableDataSource(newList);
        this.tvListService.update(newList);

        const currentShelf = data.find(shelf => shelf.name != 'todo');
        if(currentShelf){
          this.shelf= currentShelf;
          this.computeReachRate(currentShelf);
          this.dataSource = new MatTableDataSource(currentShelf.tvshelfItems);
        }else {
          const idx = this.shelf.tvshelfItems.findIndex(item => item.id == shelfItem.id);
          if(idx != -1) {
            this.shelf.tvshelfItems.splice(idx, 1);
            this.computeReachRate(this.shelf);
            this.dataSource = new MatTableDataSource(this.shelf.tvshelfItems);
          }
        }
        
      }
    );
  }

  deleteListingItem() {
    const currentShelfItemId = this.shelfItemForm.value.id;

    this.tvshelfItemService.deleteListingItem(currentShelfItemId).subscribe(
      data => {
      const newList = data.tvshelfItems;
      this.ListingDataSource = new MatTableDataSource(newList);
      this.tvListService.update(newList);
  });
    
  }
}

export interface PeriodicElement {
  id: number,
  tv: Tv,
  comment: string,
  rating: number,
  tvshelfItems: TvshelfItem[];
}