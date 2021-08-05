import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { Users } from '../models/account';

@Injectable()
export class LoginService {

    constructor(private httpClient: HttpClient ) {}
    
    getAuthToken(user: Users) {
        const result = of({ token: 'abc', success: true})
        return merge(
            result.pipe(mapTo({ loaded: 100 }))
        )
        // return this.httpClient.post(AppConfigs.AUTH_URL, user);
    }
    
}
