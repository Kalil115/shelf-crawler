import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookshelfComponent } from './components/shelves/bookshelf/bookshelf.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/nav-bar/profile/profile.component';

import { authInterceptorProviders } from 'src/app/helpers/auth.interceptor';
import { RouterModule, Routes } from '@angular/router';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { ForgetComponent } from './components/auth/forget/forget.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginStatusComponent } from './components/nav-bar/login-status/login-status.component';
import { SearchComponent } from './components/nav-bar/search/search.component';
import { YearPickerComponent } from './components/nav-bar/year-picker/year-picker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieshelfComponent } from './components/shelves/movieshelf/movieshelf.component';
import { NewBookComponent } from './components/browse/new-book/new-book.component';
import { NewMovieComponent } from './components/browse/new-movie/new-movie.component';
import { TvshelfComponent } from './components/shelves/tvshelf/tvshelf.component';
import { NewTvSeriesComponent } from './components/browse/new-tv-series/new-tv-series.component';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: RegisterComponent},
  {path:'logout', component: LogoutComponent},
  {path:'forget', component: ForgetComponent},
  {path:'browse/books', component: NewBookComponent},
  {path:'browse/movies', component: NewMovieComponent},
  {path:'browse/tvseries', component:NewTvSeriesComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'users/:username/profile', component: ProfileComponent},
  {path:'bookshelf', component:BookshelfComponent},
  {path:'movieshelf', component:MovieshelfComponent},
  {path:'tvshelf', component:TvshelfComponent},
  {path:'search/:keyword', component: NewBookComponent},
  {path:'', component: NewBookComponent},
  {path:'**', redirectTo:'', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    ForgetComponent,
    RegisterComponent,
    LoginStatusComponent,
    ProfileComponent,
    SidebarComponent,
    DashboardComponent,
    NavBarComponent,
    SearchComponent,
    YearPickerComponent,
    BookshelfComponent,
    MovieshelfComponent,
    TvshelfComponent,
    NewBookComponent,
    NewMovieComponent,
    NewTvSeriesComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
