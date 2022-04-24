import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MySecretFilesComponent } from './my-secret-files/my-secret-files.component';
import { AdminGuard } from './services/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, data: {path: 'dashboard'}, canActivate: [AdminGuard] },
  {path: 'files', data: {path: 'files'}, component: MySecretFilesComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
