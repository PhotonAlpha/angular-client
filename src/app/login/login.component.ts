import { MessageService } from '../utils/injector/message.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Pagination } from '../models/applications';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(private messageSvc: MessageService, private loginService: LoginService) { }

    loading = false;
    totalCount = 0;
    currPage = 1;
    pageSize = 5;
    pagination: Pagination;

    ngOnInit(): void { }

    send() {
        let isSucess = false;
        this.loginService.getUserinfo().subscribe(repo => {
            isSucess = true;
            console.log('getUserinfo', repo);
        },
        (error) => this.loginService.sendMessage(error),
        () => {
            console.log('final', isSucess);
        });
    }
    clear() {
        this.messageSvc.clearMessage();
    }


    search(): void {
        this.loading = true;
        this.pagination = new Pagination();
        console.log('currPage' + this.currPage);
        this.pagination.pageSize = this.pageSize;
        console.log(this.loading);
    }

    prevPage() {
        this.currPage--;
        this.search();
    }

    nextPage() {
        this.currPage++;
        this.search();
    }

    goToPage(n: number) {
        this.currPage = n;
        this.search();
    }
}
