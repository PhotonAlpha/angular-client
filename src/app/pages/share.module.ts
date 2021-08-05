import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { CqUploadModule } from "../common/upload/upload.module";
import { WarningComponent } from "../dialog/warning/warning.component";
import { AlphaNumericDirective } from "../utils/directive/alphanumeric.directive";
import { HttpInterceptorService } from "../utils/injector/request-interceptor";
import { TranslationLazyLoadedModule } from "../utils/translation/translation-lazy-loaded.module";

const ngModules = [
  HttpClientModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,

  CqUploadModule,

  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatListModule
]

@NgModule({
  imports: [
    
  ],
  exports: [
    ngModules,
    AlphaNumericDirective,
    //一定要导出，否则无法导入
    TranslationLazyLoadedModule
  ],
  declarations: [
    WarningComponent,
    AlphaNumericDirective
  ],
  entryComponents: [
    WarningComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ]
})
export class ShareModule{}