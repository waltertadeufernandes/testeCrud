import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Clients } from '../model/clients';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss'],
})
export class ListClientsComponent implements AfterViewInit {
  @Input() clients: Clients[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource!: MatTableDataSource<Clients>;

  readonly displayedColumns: string[] = [
    'name',
    'lastname',
    'cpf',
    'dataCadastro',
    'rendaMensal',
    'actions',
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Clients>(this.clients);
    this.paginator._intl.itemsPerPageLabel = 'Registros por páginas:';
    this.dataSource.paginator = this.paginator;
  }

  onEditClient(clients: Clients) {
    this.edit.emit(clients);
  }

  onDeleteClient(clients: Clients) {
    this.delete.emit(clients);
  }

  onAddClient() {
    this.add.emit(true);
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
