import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

import { authInterceptorProviders } from 'src/app/helpers/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: RegisterComponent},
  // {path:'', redirectTo:'/products', pathMatch: 'full'},
  // {path:'**', redirectTo:'/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    BookshelfComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule
  ],
  providers: [
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
