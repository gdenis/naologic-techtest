import { Injectable } from '@angular/core';
import { WorkOrderDocument } from 'naologic-ds';
import { CrudService } from '../generics/crud.service';

/**
 * Service for managing work order CRUD operations.
 * Extends CrudService<WorkOrderDocument> to provide generic operations.
 */
@Injectable({
  providedIn: 'root',
})
export class WorkOrderService extends CrudService<WorkOrderDocument> {
  protected baseUrl = 'http://localhost:3000/workOrders';
  // protected override http = inject(HttpClient);
}
