import { Component, inject, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NaologicDs, WorkCenterDocument, WorkOrderStatus } from 'naologic-ds';
import { JsonPipe } from '@angular/common';
import { WorkCenterService } from './services/work-center/work-center.service';
import { WorkOrderService } from './services/work-order/work-order.service';
import {toSignal} from '@angular/core/rxjs-interop';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NaologicDs, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('naologic-techtest');
  workCenterService = inject(WorkCenterService);
  workOrderService = inject(WorkOrderService);


  // Test import: using WorkOrderStatus type
  testStatus = signal<WorkOrderStatus>('open');

  workCenterList: Signal<WorkCenterDocument[]> = toSignal(this.workCenterService.getAll(), {initialValue: []});

}
