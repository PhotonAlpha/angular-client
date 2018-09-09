import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../utils/injector/message.service';

@Component({
    selector: 'app-message-subscription',
    templateUrl: './message-subscription.component.html',
    styleUrls: ['./message-subscription.component.css']
})
export class MessageSubscriptionComponent implements OnDestroy {
    message: Array<Object>;
    subscription: Subscription;

    constructor(private messageService: MessageService) {
        this.subscription = this.messageService.getMessage().subscribe(message => this.message = message);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
