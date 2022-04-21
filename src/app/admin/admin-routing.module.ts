import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySecretFilesComponent } from './my-secret-files/my-secret-files.component';

const routes: Routes = [
  {path: 'files', component: MySecretFilesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
