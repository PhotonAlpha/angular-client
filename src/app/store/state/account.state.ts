import Account from "src/app/models/account";


export default class AccountState {
  account!: Account;
  accountError!: Error;
}

export const initializeState = (): AccountState => {
  return { account: { fullname: '', email: '', mobileNo: '', mobileCountry: '' }, accountError: new Error() }
}