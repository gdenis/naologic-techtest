import { Component } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'nao-welcome',
  imports: [NgbAlertModule, FormsModule, NgSelectModule, NgSelectComponent],
  templateUrl: './naologic-ds.html',
  styleUrl: './naologic-ds.scss',
})
export class NaologicDs {
   cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];

  selectedCar: number | undefined = undefined;
}
