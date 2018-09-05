import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from 'src/app/service/login.service';
import { GlobalErrorsHandler } from 'src/app/utils/injector/errors.handler';
import { RouterHashFix } from 'src/app/utils/router/router.hash.fix';
import { LoginComponent } from 'src/app/login/login.component';
import { MessageSubscriptionComponent } from 'src/app/message/message-subscription.component';
import { PaginationComponent } from 'src/app/utils/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    RouterHashFix,
    PaginationComponent,
    LoginComponent,
    MessageSubscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    LoginService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorsHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
