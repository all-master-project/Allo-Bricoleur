import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from 'app/classes/service';

const baseUrl = 'http://localhost:8080/Service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

 
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Service[]>(baseUrl);
  }
  get(id) {
    return this.http.get<Service[]>(`${baseUrl}/${id}`);
  }
  create(data: Service) {
    console.log("data create ");
    console.log(data);

    return this.http.post<Service>(baseUrl, data);
  }
  update(id, data: Service) {
    return this.http.put<Service>(`${baseUrl}/${id}`, data);
  }
  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll() {
    return this.http.delete(baseUrl);
  }
}
