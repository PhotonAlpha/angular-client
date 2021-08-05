import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  {path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  // {
  //   path: 'main', component: MainPortalComponent,
  //   children: [
  //     { path: 'header', component: HeaderComponent, canDeactivate: [PortalDeactiveGuard]}
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
