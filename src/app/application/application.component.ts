import { Applications, DBDetail } from './../models/applications';
import { NgModule, Component, OnInit } from '@angular/core';
import { AgentType } from '../models/agenttype';

@Component({
    selector: 'applications',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.css']
})

export class applicationComponent implements  OnInit {
    application: Applications = new Applications();
    agentType :any = AgentType;

    currentMode :any = AgentType.VIEW;

    ngOnInit(){
        let db=new DBDetail();
        db.dbInstanceName='dbInstanceName';
        db.dbJdbcUrl='dbJdbcUrl';
        db.dbPassword='dbPassword';
        db.dbPoolName='dbPoolName';
        let dbArray=new Array<DBDetail>();
        dbArray.push(db);
        this.application.dbDetailArray=dbArray;
        
    }
    constructor(){
    }


    remove(index: number,obj: any){
        switch (obj){
            case AgentType.DB:
                this.application.dbDetailArray.splice(index,1);
                break;
            default:
        }
    }

    addup(obj: any){
        switch (obj){
            case AgentType.DB:
                if(!this.application.dbDetailArray){
                    console.log('~~~~')
                    this.application.dbDetailArray=new Array<DBDetail>();
                }
                this.application.dbDetailArray.push(new DBDetail());
                break;
            default:
        }
        console.log(this.application.dbDetailArray)
    }

    createSwitch(){
        this.currentMode=AgentType.CREATE;
    }
    editSwitch(){
        this.currentMode=AgentType.EDIT;
    }
    viewSwitch(){
        this.currentMode=AgentType.VIEW;
    }
}