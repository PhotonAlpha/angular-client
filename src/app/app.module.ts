import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './service/login.service';
import { GlobalErrorsHandler } from './utils/injector/errors.handler';
import { RouterHashFix } from './utils/router/router.hash.fix';
import { LoginComponent } from './login/login.component';
import { MessageSubscriptionComponent } from './message/message-subscription.component';
import { PaginationComponent } from './utils/pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/herder.component';
import { MainPortalComponent } from './components/main/main-portal.component';
import { MatButtonModule, MatCheckboxModule, MatRadioModule,
  MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const matModules = [
  MatButtonModule, MatCheckboxModule, MatRadioModule, MatFormFieldModule, MatInputModule,
  MatOptionModule, MatSelectModule, MatIconModule
];

@NgModule({
  declarations: [
    AppComponent,
    RouterHashFix,
    PaginationComponent,
    LoginComponent,
    MessageSubscriptionComponent,
    MainPortalComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    matModules
  ],
  providers: [
    LoginService,
    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorsHandler
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
