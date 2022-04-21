import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MySecretFilesComponent } from './my-secret-files/my-secret-files.component';


@NgModule({
  declarations: [
    MySecretFilesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
