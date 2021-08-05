import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { WarningComponent } from 'src/app/dialog/warning/warning.component';
import { LoginService } from 'src/app/service/login.service';
import { AppConfigs } from '../app-config.module';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(private injector: Injector, private router: Router
        , private dialog: MatDialog, private tokenExtractor: HttpXsrfTokenExtractor
        ) {
    }

    addToken(req: HttpRequest<any>, token: string | null): HttpRequest<any> {
        let xToken = this.tokenExtractor.getToken() as string;
        if(!req.headers.has(AppConfigs.XSRF_TOKEN_HEADER)) {
            req = req.clone({ headers: req.headers.set(AppConfigs.XSRF_TOKEN_HEADER, xToken) })    
        }
        // console.log('addToken', token);
        let authority = '';
        if (token) {
            authority = `Bearer ${token}`;
            return req.clone({setHeaders: { Authorization: authority }});
        }
        return req.clone();
    }

    // tslint:disable-next-line:max-line-length
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = sessionStorage.getItem(AppConfigs.token_key);
        if (this.isRefreshingToken) {
            token = sessionStorage.getItem(AppConfigs.refresh_token_key);
        }
        return next
            .handle(this.addToken(req, token))
            .pipe(
                catchError((error) => {
                    // console.log('errorss', error);
                    if (error instanceof HttpErrorResponse) {
                        switch ((<HttpErrorResponse>error).status) {
                            case 400:
                                return this.handle400Error(error);
                            case 401:
                                return this.handle401Error(req, next);
                            case 500:
                                return this.handle500Error(error);
                            default:
                                this.handleDefaultError(error);
                        }
                    }
                    return throwError(error);
                })
            );
    }

    handle400Error(error: HttpErrorResponse) {
        return throwError(error);
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        if (req.url.includes('refresh')) {
            this.isRefreshingToken = false;
            return this.logoutUser();
        }
        // if (!this.isRefreshingToken) {
        //     this.isRefreshingToken = true;
        //     // reset
        //     this.tokenSubject.next('');
            const authService = this.injector.get(LoginService);
        //     // console.log('error0');
        //     return authService.getRefreshToken().pipe(
        //         switchMap((newToken: string) => {
        //             // console.log('error1');
        //             if (newToken) {
        //                 this.tokenSubject.next(newToken);
        //                 return next.handle(this.addToken(req, newToken));
        //             }
        //             // if dont't get token , logout
        //             return this.logoutUser();
        //         }),
        //         catchError(error => {
        //             // console.log('error', error);
        //             return this.logoutUser();
        //         }),
        //         finalize(() => {
        //             this.isRefreshingToken = false;
        //         })
        //     );
        // } else {
            return this.tokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(token => {
                    return next.handle(this.addToken(req, token));
                }),
                catchError(error => {
                    return this.logoutUser();
                })
            );
        // }
    }

    handle500Error(error: HttpErrorResponse) {
        this.dialog.open(WarningComponent, {
            panelClass: 'custom-dialog-container',
            disableClose: true,
            data: {message: ['Unknow Error.'] }
        });
        return throwError(error);
    }

    handleDefaultError(error: HttpErrorResponse) {
        // if (error) {
        //     this.router.navigate(['/login']);
        // }
        this.dialog.open(WarningComponent, {
            panelClass: 'custom-dialog-container',
            disableClose: true,
            data: {message: ['Unknow Error.'] }
        }).afterClosed().subscribe(temp => {
            sessionStorage.clear();
            this.dialog.closeAll();
            // this.router.navigate(['/welcome']);
        });
    }

    logoutUser() {
        sessionStorage.removeItem(AppConfigs.token_key);
        this.router.navigate(['/welcome']);
        return throwError('');
    }
}
