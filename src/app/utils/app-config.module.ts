import { Injectable } from "@angular/core";

@Injectable()
export class AppConfigs {
  public static apiUrl = window.location.origin;

  public static readonly token_key = 'fc.1';
  public static readonly refresh_token_key = 'fc.1.r';
  public static readonly XSRF_TOKEN_HEADER = 'X-CSRF-TOKEN';
  public static readonly XSRF_TOKEN = 'XSRF-TOKEN';

  public static readonly API_BASE = `${AppConfigs.apiUrl}/v1`;
  public static readonly AUTH_URL = `${AppConfigs.apiUrl}/api/login`;
  public static readonly DETAILS_URL = `${AppConfigs.apiUrl}/api/v1/details`;
}