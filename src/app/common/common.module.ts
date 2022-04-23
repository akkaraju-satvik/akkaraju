import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonRoutingModule } from './common-routing.module';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { ManageComponent } from './manage/manage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    ErrorComponent,
    HomeComponent,
    NavbarComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    CommonRoutingModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CommonComponentsModule { }
