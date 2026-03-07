import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { WorkCenterService } from './work-center.service';
import { WorkCenterDocument } from 'naologic-ds';

describe('WorkCenterService', () => {
  let service: WorkCenterService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000/workCenters';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [WorkCenterService, provideHttpClientTesting()],
    });
    service = TestBed.inject(WorkCenterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should fetch all work centers and unwrap data', () => {
      const mockResponse: { data: WorkCenterDocument }[] = [
        {
          data: {
            docId: 'wc-1',
            docType: 'workCenter',
            data: { name: 'Extrusion Line A' },
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
    it('should fetch a single work center by id and unwrap data', () => {
      const id = 'wc-1';
      const mockResponse = {
        data: {
          docId: id,
          docType: 'workCenter',
          data: { name: 'Extrusion Line A' },
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
    it('should create a new work center and unwrap data', () => {
      const newCenter: WorkCenterDocument = {
        docId: 'wc-6',
        docType: 'workCenter',
        data: { name: 'New Line' },
      };

      const mockResponse = { data: newCenter };

      service.create(newCenter).subscribe((result) => {
        expect(result).toEqual(newCenter);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ data: newCenter });
      req.flush(mockResponse);
    });
  });

  describe('update', () => {
    it('should update a work center and unwrap data', () => {
      const id = 'wc-1';
      const updated: WorkCenterDocument = {
        docId: id,
        docType: 'workCenter',
        data: { name: 'Updated Line' },
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
    it('should delete a work center by id', () => {
      const id = 'wc-1';

      service.delete(id).subscribe(() => {
        expect(true).toBeTruthy();
      });

      const req = httpMock.expectOne(`${baseUrl}/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
