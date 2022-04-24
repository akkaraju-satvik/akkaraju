import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonRoutingModule } from './common-routing.module';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { ConfirmationPopupComponent, UploadPopupComponent } from './popup/popup.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ErrorComponent,
    HomeComponent,
    NavbarComponent,
    UploadPopupComponent,
    ConfirmationPopupComponent
  ],
  imports: [
    CommonModule,
    CommonRoutingModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CommonComponentsModule { }
