import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

import { authInterceptorProviders } from 'src/app/helpers/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { ForgetComponent } from './components/auth/forget/forget.component';

const routes: Routes = [
  {path:'dashboard', component: DashboardComponent},
  {path:'admin', component: BoardAdminComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component: RegisterComponent},
  {path:'logout', component: LogoutComponent},
  {path:'forget', component: ForgetComponent},
  {path:'users/:username/profile', component: ProfileComponent},
  {path:'users/:username', component: BoardUserComponent},
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
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    NavBarComponent,
    SidebarComponent,
    DashboardComponent,
    LogoutComponent,
    ForgetComponent,
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
