import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor() {}

  private http = inject(HttpClient);

  getProfile() {
    return this.http.get('/api/profile');
  }
}
