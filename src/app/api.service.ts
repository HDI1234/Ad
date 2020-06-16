import { Injectable } from '@angular/core';
import { bmi } from './bmi';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://localhost/bmi_api/api";
  constructor(private httpClient: HttpClient) {}
  readBmi(): Observable<bmi[]>{
    return this.httpClient.get<bmi[]>(`${this.PHP_API_SERVER}/index.php`);
  }
  createBmi(bmi: bmi): Observable<bmi>{
    return this.httpClient.post<bmi>(`${this.PHP_API_SERVER}/create_bmi.php`, bmi);
  }
}
