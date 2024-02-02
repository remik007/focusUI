import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { CategoryComponent } from './components/category/category.component';
import { ItemComponent } from './components/item/item.component';
import { SubPageComponent } from './components/subpage/subpage.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AddTripComponent } from './components/_admin/addTrip/addTrip.component';
import { AdminGuard } from './services/admin.guard';


const routes: Routes = [
  
  {path: '', component: HomeComponent},
  {path: 'admin/add/trip', component: AddTripComponent},//,  canActivate: [AdminGuard]},
  {path: 'admin/edit/trip/:id', component: AddTripComponent},//,  canActivate: [AdminGuard]},
  {path: 'trip/:id/addreservation', component: AddTripComponent,  canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'kontakt', component: ContactComponent},
  {path: ':subpage', component: SubPageComponent},
  {path: 'wyjazdy/:tripcategory', component: CategoryComponent},
  {path: 'wyjazdy/:tripcategory/:id', component: ItemComponent},
  {path: '*', component: HomeComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
