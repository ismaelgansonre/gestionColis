import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColisService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getColisList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list-colis`);
  }

  addColis(colis: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-colis`, colis);
  }
  updateColis(colis: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-colis/${colis.id}`, colis);
  }
}
