import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bricoleur } from 'app/classes/bricoleur';


const baseUrl = 'http://localhost:8080/Bricoleur?projection=Bricoleur-view';
const baseUrl_2 = 'http://localhost:8080/Bricoleur';

@Injectable({
  providedIn: 'root'
})
export class BricoleurService {

  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Bricoleur[]>(baseUrl);
  }
  get(id) {
    return this.http.get<Bricoleur[]>(`${baseUrl}/${id}`);
  }
  create(data: Bricoleur) {
    console.log("data create ");
    console.log(data);

    return this.http.post<Bricoleur>(baseUrl, data);
  }
  update(id, data: Bricoleur) {

    return this.http.put<Bricoleur>(`${baseUrl}/${id}`, data);
  }
  delete(id) {
    console.log("`${baseUrl}/${id}`");
    console.log(`${baseUrl_2}/${id}`);
    
    
    return this.http.delete(`${baseUrl_2}/${id}`);
  }
  
  deleteAll() {
    return this.http.delete(baseUrl);
  }

}
