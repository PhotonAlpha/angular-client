import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from './../service/application.service';
import { Pagination } from './../models/pagination';
import { NgModule, Component, OnInit } from '@angular/core';
import { Applications } from '../models/applications';

@Component({
    selector: 'applications',
    templateUrl: './application.query.component.html',
    styleUrls: ['./application.component.css']
})

export class applicationQueryComponent implements  OnInit {
    applicationList: Array<Applications> =[];
    app: Applications;
    pagination: Pagination;

    loading = false;
    totalCount = 0;
    currPage = 1;
    pageSize = 5;

    ngOnInit(){

    }
    constructor(private appService: ApplicationService,private router: Router,private route: ActivatedRoute){
        this.app=new Applications();
        this.route.queryParams.subscribe(params=>{
            console.log(params['currPage'])
        this.currPage= +params['currPage'] || 1;
        })
        this.search();
    }

    reset(){

    }
    
    search(): void {
        this.loading = true;
        this.pagination = new Pagination();
        console.log('currPage'+this.currPage);
        this.pagination.pageSize=this.pageSize;
        
        this.pagination.currPage= +this.currPage;
        let newObj = Object.assign({},this.pagination,this.app);
        this.appService.query(newObj).subscribe(tmepagination=>{
            console.log(tmepagination);
            this.pagination=tmepagination;
            this.applicationList = tmepagination.results;

            this.totalCount=tmepagination.totalCount;
            this.currPage=tmepagination.currPage;
            this.pageSize=tmepagination.pageSize;
            this.router.navigate(['application/query'],{queryParams: {currPage: this.pagination.currPage}});

           // this.messages = res.messages;
            this.loading = false;
        })

        console.log(this.loading);
    }        
    prevPage(){
        this.currPage--;
        this.search();
    }

    nextPage(){
        this.currPage++;
        this.search();
    }

    goToPage(n: number){
        this.currPage=n;
        this.search();
    }
}