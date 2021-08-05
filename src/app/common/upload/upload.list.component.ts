import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonFile } from './upload.interface';

@Component({
  selector: 'cq-upload-list',
  templateUrl: './upload.list.component.html',
  styleUrls: ['./upload.css', './upload.list.component.scss']
})
export class CqUploadListComponent {

  @Input() files: CommonFile[] = [];
  @Input() elDisabled = false;
  @Input('list-type') listType!: string;
  @Output() remove: EventEmitter<CommonFile> = new EventEmitter<CommonFile>();
  @Output() preview: EventEmitter<CommonFile> = new EventEmitter<CommonFile>();

  clickHandle(file: CommonFile): void {

  }

  removeHandle(file: CommonFile): void {
    this.remove.emit(file);
  }


  previewHandle(file: CommonFile): void {
    this.preview.emit(file);
  }

}

