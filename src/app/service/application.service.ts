import { Applications } from './../models/applications';
import { Observable } from 'rxjs/Rx';
import { Pagination } from './../models/pagination';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigs } from '../app.configs';

@Injectable()
export class ApplicationService implements OnInit{
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    constructor(private http: HttpClient){}

    query(pagination: Pagination): Observable<Pagination>{
        return this.http.post(AppConfigs.API_APPLICATION_QUERY,pagination)
        .map((tempPagination: Pagination)=>{
            return tempPagination;
        })
        .catch(ApplicationService.handError);
        
    }
    private static  handError(error: any){
        const errorMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : `Server error`;
      return Observable.throw(errorMsg);
    }
}