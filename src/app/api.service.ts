import { Injectable } from '@angular/core';
import { person } from './person';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = 'http://localhost/ubi/Ad/api';
  constructor(private httpClient: HttpClient) {}
  readBmi(): Observable<person[]> {
    return this.httpClient.get<person[]>(`${this.PHP_API_SERVER}/index.php`);
  }
  createBmi(bmi: person): Observable<person> {
    return this.httpClient.post<person>(`${this.PHP_API_SERVER}/create_bmi.php`, bmi);
  }
}
