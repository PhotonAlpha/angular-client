import { HttpResponse } from '@angular/common/http';
import { SafeUrl } from '@angular/platform-browser';

export interface UploadFile {
  url: string;
  name: string;
  raw?: File;
}

export interface Lifecycle {
  [key: string]: (...params: any[]) => void;
}

export interface CommonFile {
  id: string;
  size: number;
  status: string;
  description?: string;
  name: string;
  raw: File | null;
  url?: SafeUrl;
  percentage?: number;
}

export interface FilterEvent {
  file?: CommonFile;
  reject: Function;
  next: Function;
}

export interface UploadResponse<T> {
  commonFile: CommonFile;
  response?: HttpResponse<T>;
  error?: any;
  percentage?: number;
}

