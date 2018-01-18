import { NgModule, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../models/Users';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class loginComponent implements  OnInit {
    constructor(private router: Router,private userService: UserService){}
    user: Users;

    ngOnInit(){
        console.log('init');
        this.user= new Users();
    }

    onLogin(){
        console.log(this.user);
        // this.userService.auth(this.user).subscribe(tempUser=>{
        //     console.log(tempUser);
        //     this.router.navigate(['console-devops']);
        // })
        this.userService.auth(this.user).then(tempUser=>{
            console.log(tempUser);
            this.router.navigate(['application']);
        });
    }
}