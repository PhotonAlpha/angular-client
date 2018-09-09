import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OverviewDialogComponent } from 'src/app/components/dialog/overview-dialog.component';

export interface CanComponentDeactive {
    canDeactive: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class PortalDeactiveGuard implements CanDeactivate<CanComponentDeactive> {
    constructor(private dialog: MatDialog) {

    }

    canDeactivate(component: CanComponentDeactive,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            return component.canDeactive() ? true : new Promise((resolve, reject) => {
                this.dialog.open(OverviewDialogComponent, {
                    disableClose: true,
                    width: '450px',
                    'data' : {
                        title: 'Do you want to leave?',
                        message: ['Changes you may not be saved.'],
                        conform: 'Leave',
                        cancel: 'Cancel'
                    }
                }).afterClosed().toPromise()
                    .then((result: boolean) => {
                        resolve(result);
                    });
            });
        }


}
