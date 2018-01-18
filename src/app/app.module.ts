import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { loginComponent } from './login/login.component';
import { applicationComponent } from './application/application.component';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { applicationQueryComponent } from './application/application.query.component';
import { RouterHashFix } from './utils/router/router.hash.fix';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationService } from './service/application.service';
import { PaginationComponent } from './utils/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    loginComponent,
    applicationComponent,
    applicationQueryComponent,
    RouterHashFix,
    PaginationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,//need import otherwise the ngModel in page will error
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    ApplicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
