import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colis } from '../model/Colis';

@Injectable({
  providedIn: 'root',
})
export class ColisService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getColisList(): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiUrl}/list-colis`);
  }

  addColis(colis: Colis): Observable<Colis> {
    return this.http.post<Colis>(`${this.apiUrl}/add-colis`, colis);
  }
  updateColis(colis: Colis): Observable<Colis> {
    return this.http.put<Colis>(`${this.apiUrl}/update-colis/${colis.id}`, colis);
  }
}
