import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mission } from 'app/classes/mission';

const baseUrl = 'http://localhost:8080/Mission';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Mission[]>(baseUrl);
  }
  get(id) {
    return this.http.get<Mission[]>(`${baseUrl}/${id}`);
  }
  create(data : Mission) {
    console.log("data create ");
    console.log(data);
    
    return this.http.post<Mission>(baseUrl, data);
  }
  update(id, data: Mission){
    return this.http.put<Mission>(`${baseUrl}/${id}`, data);
  }
  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll() {
    return this.http.delete(baseUrl);
  }
}
