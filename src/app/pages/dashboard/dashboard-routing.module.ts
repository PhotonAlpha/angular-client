import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const routingComponents = [
  DashboardComponent
]

const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo: 'home'},
  {
    path:'',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
