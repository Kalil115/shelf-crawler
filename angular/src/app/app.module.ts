import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookshelfComponent } from './components/shelves/bookshelf/bookshelf.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/nav-bar/profile/profile.component';

import { authInterceptorProviders } from 'src/app/helpers/auth.interceptor';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
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
import { ListingTableComponent } from './components/listing-table/listing-table.component';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: RegisterComponent},
  {path:'logout', component: LogoutComponent},
  {path:'forget', component: ForgetComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'admin', component: BoardAdminComponent},
  {path:'users/:username/profile', component: ProfileComponent},
  {path:'users/:username', component: BoardUserComponent},
  {path:'books', component:BookshelfComponent},
  {path:'movies', component:MovieshelfComponent},
  {path:'', component: DashboardComponent},
  {path:'**', redirectTo:'', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    BookshelfComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    SidebarComponent,
    DashboardComponent,
    LogoutComponent,
    ForgetComponent,
    NavBarComponent,
    LoginStatusComponent,
    SearchComponent,
    YearPickerComponent,
    MovieshelfComponent,
    ListingTableComponent
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
