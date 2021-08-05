import { Action, createReducer, on } from "@ngrx/store";
import Account from "src/app/models/account";
import * as AccountAction from "../action/account.action";
import AccuntState, { initializeState } from "../state/account.state";

export const initialState = initializeState()

const reducer = createReducer(
  initialState,
  on(AccountAction.initAccountAction, (state: AccuntState) => {
     return {...state}
  }),
  on(AccountAction.updateAccountAction, (state: AccuntState, payload: Account) => {
    return { ...state, account: payload }
  }),
  on(AccountAction.getAccountDetailsAction, (state: AccuntState, payload: Account) => {
    return { ...state, account: payload }
  }),
);

export function Accountreducer(state: AccuntState | undefined, action: Action) {
  return reducer(state, action);
}