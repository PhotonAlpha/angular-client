import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
    title: string;
    message: Array<any>;
    conform: string;
    cancel: string;
}

@Component({
    selector: 'app-overview-dialog',
    templateUrl: './overview-dialog.component.html',
    styleUrls: ['./overview-dialog.component.scss']
})
export class OverviewDialogComponent {
    constructor(public dialogRef: MatDialogRef<OverviewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
            this.dialogBind = { ...data };
    }
    event: boolean;
    dialogBind: DialogData;
    successEvent() {
        this.dialogRef.close( true );
    }
    failureEvent() {
        this.dialogRef.close( false );
    }
}

/**
 * dialog useage
 * this.dialog.open(OverviewDialogComponent, {
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
 */
