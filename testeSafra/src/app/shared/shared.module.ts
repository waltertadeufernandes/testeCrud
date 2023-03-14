import { AppMaterialModuleModule } from './app-material-module/app-material-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';



@NgModule({
  declarations: [
    ErrorDisplayComponent,
    DialogConfirmComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModuleModule
  ],
  exports: [
    ErrorDisplayComponent,
    DialogConfirmComponent
  ]
})
export class SharedModule { }
