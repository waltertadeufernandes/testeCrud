import { ClientsResolver } from './guards/clients.resolver';
import { EditClientComponent } from './edit-client/edit-client.component';
import { AddClientComponent } from './add-client/add-client.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent } from './clients/clients.component';

const routes: Routes = [
  { path: '', component: ClientsComponent },
  { path: 'new', component: AddClientComponent, resolve: { clients: ClientsResolver} },
  { path: 'edit/:id', component: AddClientComponent, resolve: { clients: ClientsResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
