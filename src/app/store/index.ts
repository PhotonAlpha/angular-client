import { ActionReducer } from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";
import { Accountreducer } from "./reducer/account.reducer";


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  //放入key中的reducer会被写入localStorage
  return localStorageSync({ keys: ['account'], rehydrate: true, storage: sessionStorage })(reducer)
}

export const reducers = {
  account: Accountreducer
}