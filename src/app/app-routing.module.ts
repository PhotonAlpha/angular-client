import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginComponent } from './login/login.component';
import { applicationComponent } from './application/application.component';
import { applicationQueryComponent } from './application/application.query.component';

const routes: Routes=[
    {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {path: 'welcome', component: loginComponent},
    {path: 'application', component: applicationComponent},
    {path: 'application/query', component: applicationQueryComponent}
]

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(routes,{useHash: false})

    ]
})

export class AppRoutingModule{}
