import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NaologicDs, WorkOrderStatus } from 'naologic-ds';
import { BackendService } from './services/backend.service';
import { AsyncPipe, JsonPipe } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NaologicDs, AsyncPipe, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('naologic-techtest');
  dbService = inject(BackendService);

  profile = this.dbService.getProfile();

  // Test import: using WorkOrderStatus type
  testStatus = signal<WorkOrderStatus>('open');

}
