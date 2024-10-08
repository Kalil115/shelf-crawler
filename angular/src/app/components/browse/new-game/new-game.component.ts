import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/common/game';
import { GameListService } from 'src/app/services/game-list.service';
import { GameService } from 'src/app/services/game.service';
import { GameshelfService } from 'src/app/services/gameshelf.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  games: Game[];

  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;

  isAdmin = false;

  gameForm: FormGroup;
  editingGame: Game;

  constructor(private tokenStorageService: TokenStorageService,
    private gameService: GameService,
    private gameshelfService: GameshelfService,
    private gameListService: GameListService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    if (user == null) {
      this.router.navigate(['/login']);
    }

    if(user.roles.includes('ADMIN')){
      this.isAdmin= true;
    }

    this.route.paramMap.subscribe(() => this.listItems());

    this.gameForm = this.formBuilder.group({
      'id': ['', Validators.required],
      'title': [''],
      'description': [''],
      'platform': [''],
      'year': [''],
      'image_url': ['']
    });
  }

  listItems() {
    // if(this.route.snapshot.paramMap.has("keyword")) {
    //   const keyword = this.route.snapshot.paramMap.get("keyword");
    //   this.searchItems(keyword);
    // }else if(this.route.snapshot.paramMap.has("cat"))  {
    //   const category = this.route.snapshot.paramMap.get("cat");
    //   this.handleListProductByCategory(category);
    // } else{
    this.handleListAll();
    // }
  }

  // searchItems(keyword: string) {
  //   this.productSrevice.searchProduct(keyword).subscribe(
  //     data => this.products = data;
  //   )
  // }

  // handleItemByCategory(category: string) {
  //   this.itemService.getItemListPaginate(this.pageNumber-1, this.pageSize, this.category).subscribe(this.processResult());
  // }

  handleListAll() {
    this.gameService.getAllGame(this.pageNumber - 1, this.pageSize).subscribe(this.processResult());
  }

  addToList(game: Game) {
    this.gameListService.addToGameTodoList(game);
  }

  openEditGameModal(game: Game) {
    this.editingGame = game;
    this.gameForm.patchValue(game);
  }

  updateGame() {
    const formValue = this.gameForm.value;
    
    this.editingGame.title = formValue.title;
    this.editingGame.platform = formValue.platform;
    this.editingGame.year = formValue.year;
    this.editingGame.description = formValue.description;

    this.gameService.updateGame(this.editingGame).subscribe();

  }

  processResult() {
    return data => {
      this.games = data.content;
      this.pageNumber = data.number + 1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
    }
  }
}

