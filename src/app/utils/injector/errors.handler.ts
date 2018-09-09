import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs';
import { CustomerError } from './customer-error';

@Injectable()
export class GlobalErrorsHandler implements ErrorHandler {
    constructor(private injector: Injector) {}

    handleError(error: any | HttpErrorResponse | CustomerError ): void {
        const notificationService = this.injector.get(MessageService);
        if (error instanceof HttpErrorResponse) {
            console.log(error.status);
        } else if (error instanceof CustomerError) {
            console.log('not http error');
            notificationService.sendMessage(JSON.parse(error.message));
        } else {
            console.log('aaaaaaaaa');
        }
        console.log(error);
    }
}
