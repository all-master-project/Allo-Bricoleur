import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SousService } from 'app/classes/sous-service';

const baseUrl = 'http://localhost:8080/SousService?projection=sous-services-view';
const baseUrl_2 = 'http://localhost:8080/SousService';
@Injectable({
  providedIn: 'root'
})
export class SousServiceService {

  
 
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<SousService[]>(baseUrl);
  }
  get(id) {
    return this.http.get<SousService[]>(`${baseUrl}/${id}`);
  }
  create(data: SousService) {
    console.log("data create ");
    console.log(data);

    return this.http.post<SousService>(baseUrl, data);
  }
  update(id, data: SousService) {
    return this.http.put<SousService>(`${baseUrl}/${id}`, data);
  }
  delete(id) {
    return this.http.delete(`${baseUrl_2}/${id}`);
  }
  deleteAll() {
    return this.http.delete(baseUrl);
  }
}
