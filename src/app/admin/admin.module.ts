import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MySecretFilesComponent } from './my-secret-files/my-secret-files.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    MySecretFilesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
