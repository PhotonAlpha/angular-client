import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShareModule } from '../share.module';
import { DashboardRoutingModule, routingComponents } from './dashboard-routing.module';



@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,

    ShareModule,
  ],
  declarations: [
    routingComponents
  ],
  exports: [
    
  ]
})
export class DashboardModule { }
