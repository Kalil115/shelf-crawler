import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/common/book';
import { Bookshelf } from 'src/app/common/bookshelf';
import { BookshelfItem } from 'src/app/common/bookshelf-items';
import { User } from 'src/app/common/user';
import { BookshelfService } from 'src/app/services/bookshelf.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { YearPickerService } from 'src/app/services/year-picker.service';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { BookshelfItemService } from 'src/app/services/bookshelf-item.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookListService } from 'src/app/services/book-list.service';
import { TodoListStorageService } from 'src/app/services/todo-list-storage.service';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BookshelfComponent implements OnInit, AfterViewInit {

  createShelf: any = {
    newGoal: null
  }
  editGoalForm: any = {
    newGoal: null
  }
  bookshelfItemForm: FormGroup;

  currentBookshelfItem: BookshelfItem = new BookshelfItem();
  currentBookTitle: string;
  user: User;
  currentYear: number;
  reachRate: number;
  goal: number;
  bookshelf: Bookshelf;
  bookshelfName: string;

  ListingbookshelfItems: any = new MatTableDataSource();
  dataSource: any = new MatTableDataSource();
  columnsToDisplay = ['title', 'author', 'rating', 'status'];
  expandedElement: PeriodicElement | null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private yearPickerService: YearPickerService,
    private bookshelfService: BookshelfService,
    private bookshelfItemService: BookshelfItemService,
    private bookListService: BookListService,
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
        this.getBookshelfByUserIdAndBookshelfName(this.user.id, data);
      });

      this.updateListingBookshelfItems();


      this.bookshelfItemForm = this.formBuilder.group({
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

  getBookshelfByUserIdAndBookshelfName(userId: number, bookshelfName: number): void {
    this.bookshelfService.getBookshelfByUserId(userId).subscribe(
      data => {
        const found = data.find(bookshelf => bookshelf.name === bookshelfName.toString());
        if (found) {
          this.bookshelf = found;
          this.bookshelfName = found.name;
          this.reachRate = found.reachRate * 100;
          this.goal = found.goal;
          this.dataSource = new MatTableDataSource(found.bookshelfItems);
          this.dataSource.sort = this.sort;
        } else {
          this.bookshelf = new Bookshelf();
          this.bookshelfName = null;
          this.dataSource = new MatTableDataSource();
          this.reachRate = 0;
          this.goal = 0;
        }
      }
    );
  }

  updateListingBookshelfItems() {
    this.bookListService.bookshelfItemListSubject.subscribe(
      data => this.ListingbookshelfItems = new MatTableDataSource(data)
    );
  }

  editGoal() {
    const newGoal = this.editGoalForm.newGoal;
    if (this.bookshelf.id && newGoal) {
      this.bookshelf.goal = newGoal;
      this.computeReachRate(this.bookshelf);
    }
  }

  computeReachRate(bookshelf: Bookshelf): void {
    const goal = bookshelf.goal;
    let count = 0;
    const element = bookshelf.bookshelfItems;
    for (let i = 0; i < element.length; i++) {
      if (element[i].rating > 0 && element[i].status === 'FINISHED') {

        count++;
      }
    }
    const newReachRate: number = +(count / goal).toFixed(2);
    bookshelf.reachRate = newReachRate;
    this.reachRate = newReachRate * 100;
    this.goal = goal;
    this.bookshelfService.updateBookshelfGoal(bookshelf).subscribe();
  }

  buildShelf() {
    const newGoal = this.createShelf.newGoal;
    if (newGoal) {
      const newBookshelf = new Bookshelf();
      newBookshelf.name = this.currentYear.toString();
      newBookshelf.goal = newGoal;
      newBookshelf.reachRate = 0;
      newBookshelf.bookshelfItems = [];
      this.bookshelfName = newBookshelf.name;
      this.bookshelf = newBookshelf;
      this.bookshelfService.addBookshelf(this.user.id, newBookshelf).subscribe(
        data => this.bookshelf = data
      );
    }
  }

  openEditBookshelfModal(bookshelfItemId: number) {
    this.bookshelfItemService.findBookshelfItemById(bookshelfItemId).subscribe(
      data => {
        this.currentBookshelfItem = data;
        this.currentBookTitle = data.book.title;
        this.bookshelfItemForm.patchValue(data);
      });
  }

  updateBookshelfItem() {
    const formValue = this.bookshelfItemForm.value;
    const bookshelfItem: BookshelfItem = this.currentBookshelfItem;
    bookshelfItem.id = formValue.id;
    bookshelfItem.rating = formValue.rating;
    bookshelfItem.reason = formValue.reason;
    bookshelfItem.status = formValue.status;
    bookshelfItem.comment = formValue.comment;

    let bookshelfId = undefined;

    if (bookshelfItem.status == 'LISTING') {
      bookshelfId = this.todoListStorageService.getbookshelfId();
    } else {
      bookshelfId = this.bookshelf.id;
    }
    this.bookshelfItemService.updateBookshelfItem(bookshelfId, bookshelfItem).subscribe(
      data => { 
        const newList = (data.find(bookshelf => bookshelf.name === 'todo').bookshelfItems);
        this.ListingbookshelfItems = new MatTableDataSource(newList);
        this.bookListService.update(newList);

        const currentBookshelf = data.find(bookshelf => bookshelf.name != 'todo');
        if(currentBookshelf){
          this.bookshelf= currentBookshelf;
          this.computeReachRate(currentBookshelf);
          this.dataSource = new MatTableDataSource(currentBookshelf.bookshelfItems);
        }else {
          const idx = this.bookshelf.bookshelfItems.findIndex(item => item.id == bookshelfItem.id);
          if(idx != -1) {
            this.bookshelf.bookshelfItems.splice(idx, 1);
            this.computeReachRate(this.bookshelf);
            this.dataSource = new MatTableDataSource(this.bookshelf.bookshelfItems);
          }
        }
        
      }
    );
  }

  deleteListingItem() {
    const currentBookshelfItemId = this.bookshelfItemForm.value.id;

    this.bookshelfItemService.deleteListingItem(currentBookshelfItemId).subscribe(
      data => {
      const newList = data.bookshelfItems;
      this.ListingbookshelfItems = new MatTableDataSource(newList);
      this.bookListService.update(newList);
  });
    
  }
}

export interface PeriodicElement {
  id: number,
  book: Book,
  comment: string,
  rating: number,
  bookshelfItems: BookshelfItem[];
}