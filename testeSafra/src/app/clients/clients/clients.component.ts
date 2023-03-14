import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorDisplayComponent } from './../../shared/components/error-display/error-display.component';
import { ClientsService } from './../services/clients.service';
import { Component } from '@angular/core';
import { Clients } from '../model/clients';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

  clients$: Observable<Clients[]> | null = null;

  constructor(
    private clientsService: ClientsService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.loadListClients();
  }

  loadListClients() {
    this.clients$ = this.clientsService.listClients().pipe(
      catchError(error => {
        this.errorDisplay('Erro ao carregar clientes!');
        return of([]);
      })
    );
  }

  errorDisplay(errorMsg: string) {
    this.dialog.open(ErrorDisplayComponent, {
      data: errorMsg
    });
  }

  onAddClient() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEditClient(client: Clients) {
    this.router.navigate(['edit', client._id], { relativeTo: this.route });
  }

  onDeleteClient(client: Clients) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: 'Tem certeza de deseja remover esse registro?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.clientsService.deleteClient(client._id).subscribe(
          () => {
            this.loadListClients();
            this.snackBar.open('Cliente removido com sucesso', 'x', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.errorDisplay('Erro ao tentar excluir registro.')
        );
      }
    });
  }

}
