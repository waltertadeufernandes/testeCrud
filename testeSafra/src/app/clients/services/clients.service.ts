import { Clients } from './../model/clients';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private readonly API = 'api/clients';

  constructor(private httpClient: HttpClient) { }

  listClients() {
    return this.httpClient.get<Clients[]>(this.API).pipe(
      first(),
      delay(1000),
      tap(clients => console.log(clients))
    );
  }

  loadClientId(id: string) {
    return this.httpClient.get<Clients>(`${this.API}/${id}`);
  }

  saveClient(rec: Partial<Clients>) {
    if(rec._id) {
      return this.update(rec);
    }
    return this.create(rec);
  }


  deleteClient(id: string) {
    return  this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

  private create(rec: Partial<Clients>) {
    return  this.httpClient.post<Clients>(this.API, rec).pipe(first());
  }

  private update(rec: Partial<Clients>) {
    return  this.httpClient.put<Clients>(`${this.API}/${rec._id}`, rec).pipe(first());
  }
}
