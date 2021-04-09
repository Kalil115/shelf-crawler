import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/common/movie';
import { MovieListService } from 'src/app/services/movie-list.service';
import { MovieService } from 'src/app/services/movie.service';
import { MovieshelfService } from 'src/app/services/movieshelf.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {

  movies: Movie[];

  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;

  isAdmin = false;

  movieForm: FormGroup;
  editingMovie: Movie;

  constructor(private tokenStorageService: TokenStorageService,
    private movieService: MovieService,
    private movieshelfService: MovieshelfService,
    private movieListService: MovieListService,
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
  
      this.movieForm = this.formBuilder.group({
        'id': ['', Validators.required],
        'title': [''],
        'description': [''],
        'director': [''],
        'cast': [''],
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
    this.movieService.getAllMovie(this.pageNumber - 1, this.pageSize).subscribe(this.processResult());
  }

  addToList(movie: Movie) {
    this.movieListService.addToMovieTodoList(movie);
  }

  openEditMovieModal(movie: Movie) {
    this.editingMovie = movie;
    this.movieForm.patchValue(movie);
  }

  updateMovie() {
    const formValue = this.movieForm.value;
    
    this.editingMovie.title = formValue.title;
    this.editingMovie.director = formValue.director;
    this.editingMovie.cast = formValue.cast;
    this.editingMovie.year = formValue.year;
    this.editingMovie.description = formValue.description;

    this.movieService.updateMovie(this.editingMovie).subscribe();
  }

  processResult() {
    return data => {
      this.movies = data.content;
      this.pageNumber = data.number + 1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
    }
  }
}
