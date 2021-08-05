import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonFile, Lifecycle, UploadFile, UploadResponse } from './upload.interface';

export interface Message {
  success: boolean;
  description: string;
}

@Component({
  template: ''
})
export abstract class CqUploadProps {

  @Input() elDisabled = false;
  @Input() data: any = {};
  @Input() name = 'file';
  @Input() action!: string;
  @Input() accept!: string;
  @Input() drag = false;
  @Input() multiple = false;
  @Input() headers?: any = {};

  @Input('with-credentials') withCredentials = false;
  @Input('show-file-list') showFileList = true;
  @Input('list-type') listType = 'text';
  // @Input('auto-upload') autoUpload: boolean = true
  @Input('file-list') fileList: UploadFile[] = [];

  // lifecycle event
  @Output() preview: EventEmitter<CommonFile> = new EventEmitter<CommonFile>();
  @Output() remove: EventEmitter<CommonFile> = new EventEmitter<CommonFile>();
  @Output() progress: EventEmitter<UploadResponse<any>> = new EventEmitter<UploadResponse<any>>();
  // about http event
  @Output() success: EventEmitter<UploadResponse<any>> = new EventEmitter<UploadResponse<any>>();
  @Output() error: EventEmitter<UploadResponse<any>> = new EventEmitter<UploadResponse<any>>();

  @Input('upload-filter') uploadFilter: (f: File) => Message = f => {
    return { success: false, description: 'Can’t exceed maximum upload size of 2MB'};
  }
  @Input() beforeUpload: (f: File) => boolean = f => true;

  public get lifecycle(): Lifecycle {
    return {
      preview: (f: CommonFile) => this.preview.emit(f),
      remove: (f: CommonFile) => this.remove.emit(f),
      success: (f: CommonFile, res: HttpResponse<any>) => this.success.emit({ commonFile: f, response: res }),
      error: (f: CommonFile, err: any) => this.error.emit({ commonFile: f, error: err }),
      progress: (f: CommonFile, percentage: number) => this.progress.emit({ commonFile: f, percentage }),
    };
  }
}


