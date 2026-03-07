import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaologicDs } from './naologic-ds';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule, NgSelectComponent } from '@ng-select/ng-select';

/// <reference types="@angular/localize" />

describe('NaologicDs', () => {
  let component: NaologicDs;
  let fixture: ComponentFixture<NaologicDs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NaologicDs,
        NgbAlertModule,
        FormsModule,
        NgSelectModule,
        NgSelectComponent,
        MatSidenavModule,
        MatButtonModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NaologicDs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
