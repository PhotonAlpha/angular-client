import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CqUploadComponent } from './upload.component';
import { CqUploadDraggerComponent } from './upload.dragger.component';
import { CqUploadListComponent } from './upload.list.component';
import { CqUploadRequest } from './upload.request';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    MatProgressBarModule
  ],
  exports: [CqUploadComponent],
  declarations: [
    CqUploadComponent, CqUploadListComponent, CqUploadDraggerComponent
  ],
  entryComponents:[
    CqUploadComponent
  ],
  providers: [
    CqUploadRequest
  ],
})
export class CqUploadModule {
  static forRoot(): ModuleWithProviders<any> {
    return { ngModule: CqUploadModule, providers: [CqUploadRequest] }
  }
 }
