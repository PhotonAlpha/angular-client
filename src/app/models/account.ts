export class Users {
    id?: number;
    email?: string;
    mobileNo?: string;
    password?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    fullname?: string;
    description?: string;
    createDate?: string;
    createBy?: string;
    constructor() {}
}

export default interface Account {
    fullname: string;
    email: string;
    mobileNo: string;
    mobileCountry: string;
}

