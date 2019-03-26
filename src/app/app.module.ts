import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { BloggersComponent } from './bloggers/bloggers.component';
import { PostsComponent } from './posts/posts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SigninComponent } from './auth/signin/signin.component';
import { PostService } from './post.service';
import { GuardService } from './guard.service';
import { BloggerService } from './blogger.service';
import { AuthService } from './auth.service';
import { SignupComponent } from './auth/signup/signup.component';
import { FilterPipe } from './filter.pipe';

const appRoutes: Routes = [
  {path: '', component: PocetnaComponent, canActivate: [GuardService]},
  {path: 'bloggers', component: BloggersComponent, canActivate: [GuardService]},
  {path: 'posts', component: PostsComponent, canActivate: [GuardService]},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'pagenotfound', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/pagenotfound'}
];

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    BloggersComponent,
    PostsComponent,
    PageNotFoundComponent,
    SigninComponent,
    SignupComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PostService, GuardService, BloggerService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
