import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TvSeries } from 'src/app/common/tvSeries';
import { Tvshelf } from 'src/app/common/tvshelf';
import { User } from 'src/app/common/user';
import { TvshelfService } from 'src/app/services/tvshelf.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { YearPickerService } from 'src/app/services/year-picker.service';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TvListService } from 'src/app/services/tv-list.service';
import { TodoListStorageService } from 'src/app/services/todo-list-storage.service';
import { TvshelfItem } from 'src/app/common/tvshelf-item';
import { TvshelfItemService } from 'src/app/services/tvshlef-item.service';


@Component({
  selector: 'app-tvshelf',
  templateUrl: './tvshelf.component.html',
  styleUrls: ['./tvshelf.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TvshelfComponent implements OnInit, AfterViewInit {

  createShelf: any = {
    newGoal: null
  }
  editGoalForm: any = {
    newGoal: null
  }
  tvshelfItemForm: FormGroup;

  currentTvshelfItem: TvshelfItem = new TvshelfItem();
  currentTvTitle: string;
  user: User;
  currentYear: number;
  reachRate: number;
  goal: number;
  tvshelf: Tvshelf;
  tvshelfName: string;

  ListingtvshelfItems: any = new MatTableDataSource();
  dataSource: any = new MatTableDataSource();
  columnsToDisplay = ['title', 'rating', 'status'];
  expandedElement: PeriodicElement | null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private yearPickerService: YearPickerService,
    private tvshelfService: TvshelfService,
    private tvshelfItemService: TvshelfItemService,
    private tvListService: TvListService,
    private formBuilder: FormBuilder,
    private todoListStorageService: TodoListStorageService
  ) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    if (this.user == null) {
      this.router.navigate(['login']);
    } else {


      this.yearPickerService.currentYear.subscribe(data => {
        this.currentYear = data;
        this.getTvshelfByUserIdAndTvshelfName(this.user.id, data);
      });

      this.updateListingTvshelfItems();


      this.tvshelfItemForm = this.formBuilder.group({
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

  getTvshelfByUserIdAndTvshelfName(userId: number, tvshelfName: number): void {
    this.tvshelfService.getTvshelfByUserId(userId).subscribe(
      data => {
        const found = data.find(tvshelf => tvshelf.name === tvshelfName.toString());
        if (found) {
          this.tvshelf = found;
          this.tvshelfName = found.name;
          this.reachRate = found.reachRate * 100;
          this.goal = found.goal;
          this.dataSource = new MatTableDataSource(found.tvshelfItems);
          this.dataSource.sort = this.sort;
        } else {
          this.tvshelf = new Tvshelf();
          this.tvshelfName = null;
          this.dataSource = new MatTableDataSource();
          this.reachRate = 0;
          this.goal = 0;
        }
      }
    );
  }

  updateListingTvshelfItems() {
    this.tvListService.tvshelfItemListSubject.subscribe(
      data => this.ListingtvshelfItems = new MatTableDataSource(data)
    );
  }

  editGoal() {
    const newGoal = this.editGoalForm.newGoal;
    if (this.tvshelf.id && newGoal) {
      this.tvshelf.goal = newGoal;
      this.computeReachRate(this.tvshelf);
    }
  }

  computeReachRate(tvshelf: Tvshelf): void {
    const goal = tvshelf.goal;
    let count = 0;
    const element = tvshelf.tvshelfItems;
    for (let i = 0; i < element.length; i++) {
      if (element[i].rating > 0 && element[i].status === 'FINISHED') {

        count++;
      }
    }
    const newReachRate: number = +(count / goal).toFixed(2);
    tvshelf.reachRate = newReachRate;
    this.reachRate = newReachRate * 100;
    this.goal = goal;
    this.tvshelfService.updateTvshelfGoal(tvshelf).subscribe();
  }

  buildShelf() {
    const newGoal = this.createShelf.newGoal;
    if (newGoal) {
      const newTvshelf = new Tvshelf();
      newTvshelf.name = this.currentYear.toString();
      newTvshelf.goal = newGoal;
      newTvshelf.reachRate = 0;
      newTvshelf.tvshelfItems = [];
      this.tvshelfName = newTvshelf.name;
      this.tvshelf = newTvshelf;
      this.goal = newGoal;
      this.reachRate = 0;
      this.tvshelfService.addTvshelf(this.user.id, newTvshelf).subscribe(
        data => this.tvshelf = data
      );
    }
  }

  openEditTvshelfModal(tvshelfItemId: number) {
    this.tvshelfItemService.findTvshelfItemById(tvshelfItemId).subscribe(
      data => {
        this.currentTvshelfItem = data;
        this.currentTvTitle = data.tvSeries.title;
        this.tvshelfItemForm.patchValue(data);
      });
  }

  updateTvshelfItem() {
    const formValue = this.tvshelfItemForm.value;
    const tvshelfItem: TvshelfItem = this.currentTvshelfItem;
    tvshelfItem.id = formValue.id;
    tvshelfItem.rating = formValue.rating;
    tvshelfItem.reason = formValue.reason;
    tvshelfItem.status = formValue.status;
    tvshelfItem.comment = formValue.comment;

    let tvshelfId = undefined;

    if (tvshelfItem.status == 'LISTING') {
      tvshelfId = this.todoListStorageService.getTvshelfId();
    } else {
      tvshelfId = this.tvshelf.id;
    }
    this.tvshelfItemService.updateTvshelfItem(tvshelfId, tvshelfItem).subscribe(
      data => { 
        const newList = data.find(tvshelf => tvshelf.name === 'todo').tvshelfItems;
        this.ListingtvshelfItems = new MatTableDataSource(newList);
        this.tvListService.update(newList);

        const currentTvshelf = data.find(tvshelf => tvshelf.name != 'todo');
        if(currentTvshelf){
          this.tvshelf= currentTvshelf;
          this.computeReachRate(currentTvshelf);
          this.dataSource = new MatTableDataSource(currentTvshelf.tvshelfItems);
        }else {
          const idx = this.tvshelf.tvshelfItems.findIndex(item => item.id == tvshelfItem.id);
          if(idx != -1) {
            this.tvshelf.tvshelfItems.splice(idx, 1);
            this.computeReachRate(this.tvshelf);
            this.dataSource = new MatTableDataSource(this.tvshelf.tvshelfItems);
          }
        }
        
      }
    );
  }

  deleteListingItem() {
    const currentTvshelfItemId = this.tvshelfItemForm.value.id;

    this.tvshelfItemService.deleteListingItem(currentTvshelfItemId).subscribe(
      data => {
      const newList = data.tvshelfItems;
      this.ListingtvshelfItems = new MatTableDataSource(newList);
      this.tvListService.update(newList);
  });
    
  }
}

export interface PeriodicElement {
  id: number,
  tvSeries: TvSeries,
  comment: string,
  rating: number,
  tvshelfItems: TvshelfItem[];
}