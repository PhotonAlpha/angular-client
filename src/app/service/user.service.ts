import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Users } from "../models/Users";

@Injectable()
export class UserService{
    constructor(private http: HttpClient){}
    
    auth(user: Users): Promise<Users>{
       let us =new Users();
        us.username='test';
        us.password='pwd';
        console.log(us);
       
        return Promise.resolve(us);
    }

}