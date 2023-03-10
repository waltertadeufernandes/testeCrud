import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Clients } from '../model/clients';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})
export class ListClientsComponent {
  @Input() clients: Clients[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['name', 'cpf', 'dataCadastro', 'rendaMensal', 'actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  onEditClient(clients: Clients) {
    this.edit.emit(clients);
  }

  onDeleteClient(clients: Clients) {
    this.delete.emit(clients);
  }

  onAddClient() {
    this.add.emit(true);
  }

}
