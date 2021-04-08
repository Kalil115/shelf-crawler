import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Game } from 'src/app/common/game';
import { Gameshelf } from 'src/app/common/gameshelf';
import { GameshelfItem } from 'src/app/common/gameshelf-item';
import { User } from 'src/app/common/user';
import { GameListService } from 'src/app/services/game-list.service';
import { GameshelfItemService } from 'src/app/services/gameshelf-item.service';
import { GameshelfService } from 'src/app/services/gameshelf.service';
import { TodoListStorageService } from 'src/app/services/todo-list-storage.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { YearPickerService } from 'src/app/services/year-picker.service';

@Component({
  selector: 'app-gameshelf',
  templateUrl: './gameshelf.component.html',
  styleUrls: ['./gameshelf.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GameshelfComponent implements OnInit, AfterViewInit {

  createShelf: any = {
    newGoal: null
  }
  editGoalForm: any = {
    newGoal: null
  }
  gameshelfItemForm: FormGroup;

  currentGameshelfItem: GameshelfItem = new GameshelfItem();
  currentGameTitle: string;
  user: User;
  currentYear: number;
  reachRate: number;
  goal: number;
  gameshelf: Gameshelf;
  gameshelfName: string;

  ListinggameshelfItems: any = new MatTableDataSource();
  dataSource: any = new MatTableDataSource();
  columnsToDisplay = ['title', 'platform', 'rating', 'status'];
  expandedElement: PeriodicElement | null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private yearPickerService: YearPickerService,
    private gameshelfService: GameshelfService,
    private gameshelfItemService: GameshelfItemService,
    private gameListService: GameListService,
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
        this.getGameshelfByUserIdAndGameshelfName(this.user.id, data);
      });

      this.updateListingGameshelfItems();


      this.gameshelfItemForm = this.formBuilder.group({
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

  getGameshelfByUserIdAndGameshelfName(userId: number, gameshelfName: number): void {
    this.gameshelfService.getGameshelfByUserId(userId).subscribe(
      data => {
        const found = data.find(gameshelf => gameshelf.name === gameshelfName.toString());
        if (found) {
          this.gameshelf = found;
          this.gameshelfName = found.name;
          this.reachRate = found.reachRate * 100;
          this.goal = found.goal;
          this.dataSource = new MatTableDataSource(found.gameshelfItems);
          this.dataSource.sort = this.sort;
        } else {
          this.gameshelf = new Gameshelf();
          this.gameshelfName = null;
          this.dataSource = new MatTableDataSource();
          this.reachRate = 0;
          this.goal = 0;
        }
      }
    );
  }

  updateListingGameshelfItems() {
    this.gameListService.gameshelfItemListSubject.subscribe(
      data => this.ListinggameshelfItems = new MatTableDataSource(data)
    );
  }

  editGoal() {
    const newGoal = this.editGoalForm.newGoal;
    if (this.gameshelf.id && newGoal) {
      this.gameshelf.goal = newGoal;
      this.computeReachRate(this.gameshelf);
    }
  }

  computeReachRate(gameshelf: Gameshelf): void {
    const goal = gameshelf.goal;
    let count = 0;
    const element = gameshelf.gameshelfItems;
    for (let i = 0; i < element.length; i++) {
      if (element[i].rating > 0 && element[i].status === 'FINISHED') {

        count++;
      }
    }
    const newReachRate: number = +(count / goal).toFixed(2);
    gameshelf.reachRate = newReachRate;
    this.reachRate = newReachRate * 100;
    this.goal = goal;
    this.gameshelfService.updateGameshelfGoal(gameshelf).subscribe();
  }

  buildShelf() {
    const newGoal = this.createShelf.newGoal;
    if (newGoal) {
      const newGameshelf = new Gameshelf();
      newGameshelf.name = this.currentYear.toString();
      newGameshelf.goal = newGoal;
      newGameshelf.reachRate = 0;
      newGameshelf.gameshelfItems = [];
      this.gameshelfName = newGameshelf.name;
      this.gameshelf = newGameshelf;
      this.goal = newGoal;
      this.reachRate = 0;
      this.gameshelfService.addGameshelf(this.user.id, newGameshelf).subscribe(
        data => this.gameshelf = data
      );
    }
  }

  openEditGameshelfModal(gameshelfItemId: number) {
    this.gameshelfItemService.findGameshelfItemById(gameshelfItemId).subscribe(
      data => {
        this.currentGameshelfItem = data;
        this.currentGameTitle = data.game.title;
        this.gameshelfItemForm.patchValue(data);
      });
  }

  updateGameshelfItem() {
    const formValue = this.gameshelfItemForm.value;
    const gameshelfItem: GameshelfItem = this.currentGameshelfItem;
    gameshelfItem.id = formValue.id;
    gameshelfItem.rating = formValue.rating;
    gameshelfItem.reason = formValue.reason;
    gameshelfItem.status = formValue.status;
    gameshelfItem.comment = formValue.comment;

    let gameshelfId = undefined;

    if (gameshelfItem.status == 'LISTING') {
      gameshelfId = this.todoListStorageService.getGameshelfId();
    } else {
      gameshelfId = this.gameshelf.id;
    }
    this.gameshelfItemService.updateGameshelfItem(gameshelfId, gameshelfItem).subscribe(
      data => { 
        const newList = data.find(gameshelf => gameshelf.name === 'todo').gameshelfItems;
        this.ListinggameshelfItems = new MatTableDataSource(newList);
        this.gameListService.update(newList);

        const currentGameshelf = data.find(gameshelf => gameshelf.name != 'todo');
        if(currentGameshelf){
          this.gameshelf= currentGameshelf;
          this.computeReachRate(currentGameshelf);
          this.dataSource = new MatTableDataSource(currentGameshelf.gameshelfItems);
        }else {
          const idx = this.gameshelf.gameshelfItems.findIndex(item => item.id == gameshelfItem.id);
          if(idx != -1) {
            this.gameshelf.gameshelfItems.splice(idx, 1);
            this.computeReachRate(this.gameshelf);
            this.dataSource = new MatTableDataSource(this.gameshelf.gameshelfItems);
          }
        }
        
      }
    );
  }

  deleteListingItem() {
    const currentGameshelfItemId = this.gameshelfItemForm.value.id;

    this.gameshelfItemService.deleteListingItem(currentGameshelfItemId).subscribe(
      data => {
      const newList = data.gameshelfItems;
      this.ListinggameshelfItems = new MatTableDataSource(newList);
      this.gameListService.update(newList);
  });
    
  }
}

export interface PeriodicElement {
  id: number,
  game: Game,
  comment: string,
  rating: number,
  gameshelfItems: GameshelfItem[];
}