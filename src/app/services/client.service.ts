import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'app/classes/client';

const baseUrl = 'http://localhost:8080/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Client[]>(baseUrl);
  }
  get(id) {
    return this.http.get<Client[]>(`${baseUrl}/${id}`);
  }
  create(data : Client) {
    console.log("data create ");
    console.log(data);
    
    return this.http.post<Client>(baseUrl, data);
  }
  update(id, data: Client){
    return this.http.put<Client>(`${baseUrl}/${id}`, data);
  }
  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll() {
    return this.http.delete(baseUrl);
  }
}
