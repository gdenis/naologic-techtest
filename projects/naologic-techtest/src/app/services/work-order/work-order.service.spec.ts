import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WorkOrderService } from './work-order.service';
import { WorkOrderDocument } from 'naologic-ds';

describe('WorkOrderService', () => {
  let service: WorkOrderService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000/workOrders';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorkOrderService],
    });
    service = TestBed.inject(WorkOrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should fetch all work orders and unwrap data', () => {
      const mockResponse: { data: WorkOrderDocument }[] = [
        {
          data: {
            docId: 'wo-1',
            docType: 'workOrder',
            data: {
              name: 'Order A1',
              workCenterId: 'wc-1',
              status: 'open',
              startDate: '2026-03-10',
              endDate: '2026-03-15',
            },
          },
        },
      ];

      service.getAll().subscribe((result) => {
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(mockResponse[0].data);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getById', () => {
    it('should fetch a single work order by id and unwrap data', () => {
      const id = 'wo-1';
      const mockResponse = {
        data: {
          docId: id,
          docType: 'workOrder',
          data: {
            name: 'Order A1',
            workCenterId: 'wc-1',
            status: 'open' as const,
            startDate: '2026-03-10',
            endDate: '2026-03-15',
          },
        },
      };

      service.getById(id).subscribe((result) => {
        expect(result).toEqual(mockResponse.data);
      });

      const req = httpMock.expectOne(`${baseUrl}/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('create', () => {
    it('should create a new work order and unwrap data', () => {
      const newOrder: WorkOrderDocument = {
        docId: 'wo-9',
        docType: 'workOrder',
        data: {
          name: 'New Order',
          workCenterId: 'wc-1',
          status: 'open',
          startDate: '2026-03-30',
          endDate: '2026-04-05',
        },
      };

      const mockResponse = { data: newOrder };

      service.create(newOrder).subscribe((result) => {
        expect(result).toEqual(newOrder);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ data: newOrder });
      req.flush(mockResponse);
    });
  });

  describe('update', () => {
    it('should update a work order and unwrap data', () => {
      const id = 'wo-1';
      const updated: WorkOrderDocument = {
        docId: id,
        docType: 'workOrder',
        data: {
          name: 'Updated Order',
          workCenterId: 'wc-1',
          status: 'in-progress' as const,
          startDate: '2026-03-10',
          endDate: '2026-03-15',
        },
      };

      const mockResponse = { data: updated };

      service.update(id, updated).subscribe((result) => {
        expect(result).toEqual(updated);
      });

      const req = httpMock.expectOne(`${baseUrl}/${id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ data: updated });
      req.flush(mockResponse);
    });
  });

  describe('delete', () => {
    it('should delete a work order by id', () => {
      const id = 'wo-1';

      service.delete(id).subscribe(() => {
        expect(true).toBeTruthy();
      });

      const req = httpMock.expectOne(`${baseUrl}/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
