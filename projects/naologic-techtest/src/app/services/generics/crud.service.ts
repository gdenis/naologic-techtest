import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Generic CRUD service for handling document-based API operations.
 * Unwraps the 'data' property from the document response.
 */
@Injectable()
export abstract class CrudService<T> {
  protected abstract baseUrl: string;
  protected http: HttpClient = inject(HttpClient);

  /**
   * Fetch all records of type T
   */
  getAll(): Observable<T[]> {
    return this.http.get<{ data: T }[]>(this.baseUrl).pipe(
      map((docs) => docs.map((doc) => doc.data))
    );
  }

  /**
   * Fetch a single record by ID
   */
  getById(id: string): Observable<T> {
    return this.http.get<{ data: T }>(`${this.baseUrl}/${id}`).pipe(
      map((doc) => doc.data)
    );
  }

  /**
   * Create a new record
   */
  create(data: T): Observable<T> {
    return this.http.post<{ data: T }>(this.baseUrl, { data }).pipe(
      map((doc) => doc.data)
    );
  }

  /**
   * Update an existing record
   */
  update(id: string, data: T): Observable<T> {
    return this.http.put<{ data: T }>(`${this.baseUrl}/${id}`, { data }).pipe(
      map((doc) => doc.data)
    );
  }

  /**
   * Delete a record by ID
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
