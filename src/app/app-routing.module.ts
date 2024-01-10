import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { CategoryComponent } from './components/category/category.component';
import { ItemComponent } from './components/item/item.component';
import { SubPageComponent } from './components/subpage/subpage.component';


const routes: Routes = [
  
  {path: '', component: HomeComponent},
  {path: 'kontakt', component: ContactComponent},
  {path: ':subpage', component: SubPageComponent},
  {path: 'wyjazdy/:tripcategory', component: CategoryComponent},
  {path: 'wyjazdy/:tripcategory/:tripid', component: ItemComponent},
  {path: '*', component: HomeComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
