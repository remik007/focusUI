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
import { AddSubPageComponent } from './components/_admin/addSubPage/addSubPage.component';
import { AddCategoryComponent } from './components/_admin/addCategory/addCategory.component';


const routes: Routes = [
  
  {path: '', component: HomeComponent},
  {path: 'admin/dodaj/wyjazd', component: AddTripComponent},//,  canActivate: [AdminGuard]},
  {path: 'admin/edytuj/wyjazd/:id', component: AddTripComponent},//,  canActivate: [AdminGuard]},
  {path: 'admin/dodaj/podstrona', component: AddSubPageComponent},//,  canActivate: [AdminGuard]},
  {path: 'admin/edytuj/podstrona/:subpage', component: AddSubPageComponent},//,  canActivate: [AdminGuard]},
  {path: 'admin/dodaj/kategoria', component: AddCategoryComponent},//,  canActivate: [AdminGuard]},
  {path: 'admin/edytuj/kategoria/:category', component: AddCategoryComponent},//,  canActivate: [AdminGuard]},
  //{path: 'wyjazd/:id/addreservation', component: AddTripComponent,  canActivate: [AuthGuard]},
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
