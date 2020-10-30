import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DummyComponent } from './dummy/dummy.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { PaginationComponent } from './pagination/pagination.component';
import { EmployeeComponent } from './employee/employee.component';
import { ImagesComponent } from './images/images.component';
import { ChartsComponent } from './charts/charts.component';
import { Home1Component } from './home1/home1.component';





const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'Signup', component: SignupComponent },
  { path: 'Dummy', component: DummyComponent },
  { path: 'Employeelist', component: EmployeelistComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'charts', component: ChartsComponent },
  { path: 'home1', component: Home1Component },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
