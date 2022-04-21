import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonRoutingModule } from './common-routing.module';
import { AppComponent } from '../app.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { ManageComponent } from './manage/manage.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    ErrorComponent,
    HomeComponent,
    NavbarComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    CommonRoutingModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CommonComponentsModule { }
