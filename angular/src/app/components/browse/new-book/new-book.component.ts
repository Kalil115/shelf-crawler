import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BookListService } from 'src/app/services/book-list.service';
import { BookService } from 'src/app/services/book.service';
import { BookshelfService } from 'src/app/services/bookshelf.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  books: Book[];

  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;

  isAdmin = false;

  addBookForm: FormGroup;

  bookForm: FormGroup;
  editingBook: Book;

  constructor(private tokenStorageService: TokenStorageService,
    private bookService: BookService,
    private bookshelfService: BookshelfService,
    private bookListService: BookListService,
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

    this.addBookForm = this.formBuilder.group({
      'isbn': [''],
      'title': ['', Validators.required],
      'description': [''],
      'author': [''],
      'published': [''],
      'image_url': ['']
    });

    this.bookForm = this.formBuilder.group({
      'id': ['', Validators.required],
      'isbn': [''],
      'title': [''],
      'description': [''],
      'author': [''],
      'published': [''],
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
    this.bookService.getAllBook(this.pageNumber - 1, this.pageSize).subscribe(this.processResult());
  }

  addToList(book: Book) {
    this.bookListService.addToBookTodoList(book);
  }

  addBook() {
    if(this.addBookForm.valid){
    const formValue = this.addBookForm.value
    
    let newBook: Book = new Book();
    newBook.isbn = formValue.isbn;
    newBook.title = formValue.title;
    newBook.author = formValue.author;
    newBook.published = formValue.published;
    newBook.description = formValue.description;
    let filename = formValue.image_url.substring(12);
    newBook.imageUrl = "assets/images/books/" + filename;
    this.bookService.addBook(newBook).subscribe();

    }else{
      console.log('not valid');
    }
    
  }

  openEditBookModal(book: Book) {
    this.editingBook = book;
    this.bookForm.patchValue(book);
  }

  updateBook() {
    const formValue = this.bookForm.value;
    
    this.editingBook.title = formValue.title;
    this.editingBook.author = formValue.author;
    this.editingBook.published = formValue.published;
    this.editingBook.description = formValue.description;

    this.bookService.updateBook(this.editingBook).subscribe();

  }

  processResult() {
    return data => {
      this.books = data.content;
      this.pageNumber = data.number + 1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
    }
  }
}
