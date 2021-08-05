import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/account';
import { LoginService } from 'src/app/service/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    validateForm!: FormGroup;
    hide = true;
    constructor(
        private fb: FormBuilder, private router: Router,   
        private loginSvc: LoginService
        ) { }

    loading = false;
    totalCount = 0;
    currPage = 1;
    pageSize = 5;
    // pagination: Pagination;

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            username: [, [Validators.required, Validators.email]],
            password: [, Validators.required]
        })
     }

    get username() {
        return this.validateForm.get('username') as FormControl
    }
    get password() {
        return this.validateForm.get('password') as FormControl
    }

    getErrorMessage() {
        if (this.username.hasError('required')) {
            return 'You must enter a value';
        }
        return this.username.hasError('email') ? 'Not a valid email' : '';
    }

    onLoginEvent() {
        this.validateForm.markAllAsTouched();
        this.validateForm.updateValueAndValidity();
        console.log(this.validateForm)
        if(this.validateForm.valid) {
            console.log(this.validateForm.value)
            const user = this.validateForm.value as Users
            this.loginSvc.getAuthToken(user).subscribe((response) => {
                console.log(response)
                this.router.navigate(['/dashboard'])
            },
            (err) => console.error(err),
            () => console.log('finally'))
        }
    }
}
