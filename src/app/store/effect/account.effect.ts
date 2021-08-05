import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import Account from 'src/app/models/account';
import { AppConfigs } from 'src/app/utils/app-config.module';
import * as AccountAction from "../action/account.action";

@Injectable()
export class AccountEffect {
  constructor(private httpClient: HttpClient, private actions$: Actions) { }
  
  getAccountDetails$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(AccountAction.getAccountDetailsAction),
        mergeMap(action =>{
          console.log('action', action)
          return this.httpClient.post(AppConfigs.DETAILS_URL, {})
            .pipe(
              map(response => {
                return AccountAction.getAccountDetailsAction(response as Account)
              })
            )
      })
    )
  })
}