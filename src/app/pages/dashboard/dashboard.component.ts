import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import Account from 'src/app/models/account';
import * as AccountAction from "src/app/store/action/account.action";
import AccountState from 'src/app/store/state/account.state';
import { validateAlphaNumeric } from 'src/app/utils/validators/common-validators';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {
  fileList: File[] = []
  accountForm!: FormGroup
  account!: Account;
  accountStatus$!: Observable<AccountState>;
  accountStatusSubscription!: Subscription;
  constructor(private store: Store<{account: AccountState}>, private fb: FormBuilder) { 
    this.accountStatus$ = store.pipe(select('account'));
  }
  ngOnDestroy(): void {
    if(this.accountStatusSubscription) {
      this.accountStatusSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      fullname: [, validateAlphaNumeric()],
      email: [],
      mobileNo: [],
      mobileCountry: []
    })
    
    this.accountStatus$.subscribe(data => {
      console.log('account', data)
      this.account = data.account
    })
    
  }
  get fullname() {
    return this.accountForm.get('fullname')
  }
  get email() {
    return this.accountForm.get('email')
  }
  get mobileNo() {
    return this.accountForm.get('mobileNo')
  }
  get mobileCountry() {
    return this.accountForm.get('mobileCountry')
  }

  onSendEvent() {
    const payload = this.accountForm.value as Account;
    payload.mobileCountry = '+81'
    this.store.dispatch(AccountAction.updateAccountAction(payload))
  }


  limit(file: File) {
    if(file.size > 100* 1000) {
      console.log('file more than 2MB')
      return { success: false, description: `Can't exceed maximun upload size of 2MB`}
    } else {
      return { success: true, description: '' }
    }
  }
  beforeUpload(file: File): boolean {
    const limitResult = this.limit(file);
    if(limitResult.success) {
      this.fileList.concat(file)
    }
    return false;
  }
  successHandle(file: any) {
    console.log('success', file)
  }
  errorHandle(file: any) {
    console.log('error', file)
  }

}
