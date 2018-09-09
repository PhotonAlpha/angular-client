import { CanDeactivate } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-herder',
    templateUrl: './herder.component.html',
    styleUrls: ['./herder.component.scss']
})
export class HeaderComponent implements OnInit {
    theamClassName: string;
    options: FormGroup;
    constructor(fb: FormBuilder) {
        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'auto',
        });
    }

    ngOnInit(): void { }

    lightTheam() {
        this.theamClassName = '';
    }
    darkTheam() {
        this.theamClassName = 'unicorn-dark-theme';
    }
    customerTheam() {
        this.theamClassName = 'unicorn-customer-theme';
    }

    canDeactive(): boolean {
        return false;
    }

}
