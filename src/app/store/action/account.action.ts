import { createAction, props } from "@ngrx/store";
import Account from "src/app/models/account";

export const initAccountAction = createAction('[ACCOUNT] init account');

export const updateAccountAction = createAction(
  '[ACCOUNT] update account',
  props<Account>()
);
export const getAccountDetailsAction = createAction(
  '[ACCOUNT] get account details',
  props<Account>()
);