import { CustomerError } from './../utils/injector/customer-error';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
    getUserinfo() {
        const content = [
            {errorCode: '400', errorDesc: 'A simple secondary alert with an example link. Give it a click if you like.'},
            {errorCode: '402', errorDesc: 'A simple primary alert .'}
        ];
        const error = JSON.stringify(content);
        console.log(error);
        throw new CustomerError(`${error}`);
    }
}
