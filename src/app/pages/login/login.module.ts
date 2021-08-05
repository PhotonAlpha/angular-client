import { NgModule } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { ShareModule } from '../share.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';



@NgModule({
  imports: [
    LoginRoutingModule,
    
    ShareModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
