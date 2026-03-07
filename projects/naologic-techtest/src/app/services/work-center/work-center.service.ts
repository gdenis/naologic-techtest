import { Injectable } from '@angular/core';
import { WorkCenterDocument } from 'naologic-ds';
import { CrudService } from '../generics/crud.service';

/**
 * Service for managing work center CRUD operations.
 * Extends CrudService<WorkCenterDocument> to provide generic operations.
 */
@Injectable({
  providedIn: 'root',
})
export class WorkCenterService extends CrudService<WorkCenterDocument> {
  protected baseUrl = 'http://localhost:3000/workCenters';
}
