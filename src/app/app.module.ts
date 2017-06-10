import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {FeedComponent} from './components/feed/feed.component';
import {DetailsComponent} from './components/details/details.component';
import {LoginComponent} from './components/login/login.component';
import {PostComponent} from './components/post/post.component';
import {RegisterComponent} from './components/register/register.component';
import {ProfileComponent} from './components/profile/profile.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    DetailsComponent,
    LoginComponent,
    PostComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'post',
        component: PostComponent
      },
      {
        path: 'feed',
        component: FeedComponent
      },
      {
        path: 'details/:id',
        component: DetailsComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
