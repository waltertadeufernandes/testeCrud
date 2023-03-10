import { ActivatedRoute } from '@angular/router';
import { ClientsService } from './../services/clients.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clients } from '../model/clients';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})

export class AddClientComponent implements OnInit {
  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    cpf: ['', [Validators.required, Validators.maxLength(11)]],
    dataNascimento: ['', [Validators.required, Validators.maxLength(11)]],
    rendaMensal: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    dataCadastro: ['']
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: ClientsService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {

   }

  ngOnInit(): void {
    const clients: Clients = this.route.snapshot.data['clients'];
    this.form.setValue({
      _id: clients._id,
      name: clients.name,
      lastname: clients.lastname,
      cpf: clients.cpf,
      dataNascimento: clients.dataNascimento,
      rendaMensal: clients.rendaMensal,
      email: clients.email,
      // Remover
      dataCadastro: 'xx/xx/xxxx'
    });
  }

  onSubmit() {
    this.service.saveClient(this.form.value).subscribe(res => this.onSuccess(), error => this.onError());
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Cliente salvo com sucesso', 'x', {
      duration: 5000
    });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao adicionar cliente.', 'x', {
      duration: 5000
    });
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (this.form.get('name')?.hasError('pattern')) {
      return 'Digite um nome válido'
    }

    return field?.hasError('email') ? 'Digite um e-mail válido' : '';
  }
}
