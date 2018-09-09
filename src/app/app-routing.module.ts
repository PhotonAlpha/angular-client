import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPortalComponent } from './components/main/main-portal.component';
import { HeaderComponent } from './components/header/herder.component';
import { PortalDeactiveGuard } from 'src/app/utils/guard/deactive-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: LoginComponent },
  {
    path: 'main', component: MainPortalComponent,
    children: [
      { path: 'header', component: HeaderComponent, canDeactivate: [PortalDeactiveGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
