import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`p {
    width:200px;
    background:lightgray;
    margin: 100px auto;
    text-align:center;
    padding:20px;
    font-size:1.5em;
  }
  `],
  animations: [
    trigger('myAwesomeAnimation',[
      state('small',style({
        opacity: 1,
        transform: 'none',
        // transform: 'scale(1)',
      })),
      state('large',style({
        opacity: 1,
        transform: 'translate3d(100%,0,0)',
        // transform: 'scale(1.2)',
      })),
      transition('* => small ,* => large',animate('100ms cubic-bezier(0.35,0,0.25,1)',keyframes([
        style({opacity: 0,transform: 'translateY(-75%)',offset: 0}),
        style({opacity: 1,transform: 'translateY(35px)',offset: 0.5}),
        style({opacity: 1,transform: 'translateY(0)',offset: 1.0}),

      ]
      ))),
      // transition('small <=> large', animate('300ms cubic-bezier(0.35,0,0.25,1)', style({
      //   transform: 'translateY(40px)'
      // }))),
    ]),
  ]
})
export class AppComponent implements OnInit{
  title = 'app';
  state: string='small'
  show1: boolean=false;
  show2: boolean=true;
  constructor(private router: Router){}
  ngOnInit(){

  }

  applica(){
    this.state= (this.state === 'small'?'large':'small');

    this.router.navigate(['application']);
  }

  query(){
    this.router.navigate(['application/query'],{queryParams: {currPage: '1'}});
  }

  animateMe(){
    if(this.show1){
      this.show1=false;
      this.show2=true;
    }else{
      this.show1=true;
      this.show2=false;
    }
    this.state= (this.state === 'small'?'large':'small');
  }
}
