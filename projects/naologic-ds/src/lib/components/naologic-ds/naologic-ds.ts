import { Component } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'nao-welcome',
  imports: [
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
  templateUrl: './naologic-ds.html',
  styleUrl: './naologic-ds.scss',
})
export class NaologicDs {
  mode = new FormControl('over' as MatDrawerMode);

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  selectedCar: number | undefined = undefined;
}
