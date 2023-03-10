import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModuleModule } from '../shared/app-material-module/app-material-module.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './add-client/add-client.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ListClientsComponent } from './list-clients/list-clients.component';


@NgModule({
  declarations: [
    ClientsComponent,
    AddClientComponent,
    EditClientComponent,
    ListClientsComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    AppMaterialModuleModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ClientsModule { }
