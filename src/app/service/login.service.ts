import { MessageService } from '../utils/injector/message.service';
import { CustomerError } from '../utils/injector/customer-error';
import { throwError, Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class LoginService {
    constructor(private messageService: MessageService, private httpClient: HttpClient ) {}
    sendMessage(error: CustomerError) {
        this.messageService.clearMessage();
        const obj = JSON.parse(`${error.message}`);
        console.log('sendMessage', obj);
        this.messageService.sendMessage(obj);
    }
    getUserinfo(): Observable<any> {
        return this.httpClient.get('http://localhost:8080/v1/login')
            .pipe(
               map(repo => {
                const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
                const random2 = Math.floor(Math.random() * (999999 - 100000)) + 100000;
                const content = [
                    {errorCode: '400', errorDesc: `${random} A simple secondary alert with an example link. Give it a click if you like.` },
                    {errorCode: '402', errorDesc: `${random2} A simple primary alert .` }
                ];
                const error = JSON.stringify(content);
                throw new CustomerError(`${error}`);
                // return repo;
               }),
               catchError((error: HttpErrorResponse) => {
                    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
                    const random2 = Math.floor(Math.random() * (999999 - 100000)) + 100000;
                    const content = [
                        // tslint:disable-next-line:max-line-length
                        {errorCode: '400', errorDesc: `${random} A simple secondary alert with an example link. Give it a click if you like.` },
                        {errorCode: '402', errorDesc: `${random2} A simple primary alert .` }
                    ];
                    const exception = JSON.stringify(content);
                    throw new CustomerError(`${exception}`);
               })
            );
    }
}
