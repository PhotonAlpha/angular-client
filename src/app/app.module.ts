import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { localStorageSyncReducer, reducers } from './store';
import { AccountEffect } from './store/effect/account.effect';

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN'
    }),

    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([AccountEffect])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



