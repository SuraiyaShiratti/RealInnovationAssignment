import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateEmpComponent } from './pages/create-emp/create-emp.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route to Home
  { path: 'create-emp', component: CreateEmpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
