import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Observable, of } from 'rxjs';
import { delay, mapTo } from 'rxjs/operators';

@Injectable()
export class CqUploadRequest {

  headers!: HttpHeaders;
  withCredentials!: boolean;
  fileName!: string;
  defaultBody: any;

  constructor(
    private http: HttpClient,
  ) {
  }

  upload(path: string, file: File): Observable<any> {
    const req: HttpRequest<{}> = new HttpRequest('POST', path, file, {
      headers: this.headers,
      reportProgress: true,
      withCredentials: this.withCredentials,
    });
    return this.http.request(req);
  }
  uploadAnimation(path: string, file: File): Observable<any> {
    // console.log('path', path, 'file', file);
    const result = of({ loaded: 0, total: file.size, success: false });
    const message = merge(
      result.pipe(mapTo({ loaded: 1, total: file.size, success: false })),
      result.pipe(mapTo({ loaded: file.size / 3, total: file.size, success: false }), delay(300)),
      result.pipe(mapTo({ loaded: file.size / 2, total: file.size, success: false }), delay(800)),
      result.pipe(mapTo({ loaded: file.size, total: file.size, success: true }), delay(1500))
    );
    return message;
  }

  setHeader(headers: any = {}): CqUploadRequest {
    this.headers = new HttpHeaders(headers);
    return this;
  }

  setCredentials(withCredentials: boolean): CqUploadRequest {
    this.withCredentials = withCredentials;
    return this;
  }

  setFileName(name: string): CqUploadRequest {
    this.fileName = name;
    return this;
  }

  addExtraData(data: any = {}): CqUploadRequest {
    this.defaultBody = data;
    return this;
  }

}

