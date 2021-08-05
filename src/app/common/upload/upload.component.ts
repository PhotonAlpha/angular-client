import { HttpResponse } from '@angular/common/http';
import {
  Component, ContentChild, ElementRef, OnInit, TemplateRef,
  ViewChild
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonFile, UploadFile } from './upload.interface';
import { CqUploadProps } from './upload.props';
import { CqUploadRequest } from './upload.request';

@Component({
  selector: 'cq-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.css', './upload.component.scss']
})
export class CqUploadComponent extends CqUploadProps implements OnInit {

  /**
   * status: success -> success description
   * status: failure -> failure description
   * status: oversize -> oversize description
   */
  @ContentChild('trigger', { static: false }) trigger!: TemplateRef<any>;
  @ContentChild('dragger', { static: false }) dragger!: TemplateRef<any>;
  @ContentChild('tip', { static: false }) tip!: TemplateRef<any>;
  @ViewChild('input', { static: false }) input!: ElementRef;

  files: CommonFile[] = [];

  static generateID(): string {
    return Math.random().toString(16).substr(2, 8);
  }
  static updatePercentage(response: any): number {
    const { loaded, total } = response;
    if (loaded === undefined || !total) { return 0; }
    return Math.round(loaded / total * 100);
  }

  constructor(
    private request: CqUploadRequest,
    private sanitizer: DomSanitizer,
  ) {
    super();
  }

  clickHandle(): void {
    console.log(this.elDisabled);
    if (this.elDisabled) { return; }
    this.input.nativeElement.click();
  }

  changeHandle(event: Event): void {
    console.log(event);
    const files = ( event.target as HTMLInputElement).files;
    if (!files || !files.length) { return; }
    const checkedFiles: File[] = this.multiple ? Array.from(files) : [files[0]];
    this.input.nativeElement.value = null;
    checkedFiles.forEach((file: File) => {
      const next = {
        id: CqUploadComponent.generateID(),
        name: file.name,
        status: 'ready',
        size: file.size,
        percentage: 0,
        raw: file,
        url: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))
      };
      this.files.push(next);
      this.updateFile(next);

      const filter = this.uploadFilter(file);
      const { success, description } = filter;
      if (success === false) {
        // next.raw = null;
        this.lifecycle.success(Object.assign(next, { status: 'oversize', description }), event);
        // remove the oversize file if needed
        // this.removeHandle(next);
      } else {
        const beforeUpload = this.beforeUpload(file);
        if (beforeUpload) {
          this.upload(next);
        } else {
          // show mock demo
          this.uploadAnimationOnly(next);
        }
      }
    });
  }

  upload(file: CommonFile): void {
    file.status = 'uploading';
    this.updateFile(file);
    this.request.upload(this.action, file.raw as File)
      .subscribe((event: any) => {
        console.log('event', event);
        file.percentage = CqUploadComponent.updatePercentage(event);
        file.percentage && this.lifecycle.progress(file, file.percentage);
        if (event instanceof HttpResponse) {
          this.lifecycle.success(Object.assign(file, { status: 'success' }), event);
        }
        this.updateFile(file);
      }, err => {
        file.status = 'failure';
        this.lifecycle.error(file, err);
        this.removeHandle(file);
      });
  }
  uploadAnimationOnly(file: CommonFile): void {
    file.status = 'uploading';
    this.updateFile(file);
    this.request.uploadAnimation(this.action, file.raw as File)
      .subscribe((event: any) => {
        // console.log('event', event);
        file.percentage = CqUploadComponent.updatePercentage(event);
        file.percentage && this.lifecycle.progress(file, file.percentage);
        const { success } = event;
        if (success) {
          this.lifecycle.success(Object.assign(file, { status: 'success' }), event);
        }
        this.updateFile(file);
      }, err => {
        file.status = 'failure';
        this.lifecycle.error(file, err);
        this.removeHandle(file);
      });
  }

  removeHandle(file: CommonFile): void {
    this.lifecycle.remove(file);
    const index = this.files.findIndex(({ id }) => file.id === id);
    this.files.splice(index, 1);
  }

  updateFile(file: CommonFile): void {
    const index = this.files.findIndex(({ id }) => file.id === id);
    if (!index) { return; }
    this.files[index] = file;
  }

  ngOnInit(): void {
    this.request
      .setHeader(this.headers)
      .setCredentials(this.withCredentials)
      .setFileName(this.name)
      .addExtraData(this.data);
    this.fileList.forEach((file: UploadFile) => {
      this.files.push({
        id: CqUploadComponent.generateID(),
        name: file.name,
        status: 'success',
        raw: null, 
        size: 0,
        url: this.sanitizer.bypassSecurityTrustUrl(file.url),
      });
    });
  }

}
