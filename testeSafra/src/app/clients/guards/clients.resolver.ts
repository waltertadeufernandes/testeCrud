import { ClientsService } from './../services/clients.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Clients } from '../model/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsResolver implements Resolve<Clients> {

  constructor(private service: ClientsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Clients> {
    if(route.params && route.params['id']) {
      return this.service.loadClientId(route.params['id']);
    }
    return of({ _id: '', name: '', lastname: '', cpf: '', dataNascimento: '', rendaMensal: '', email: '', dataCadastro: '' });
  }
}
