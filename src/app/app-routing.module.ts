import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { WorkshopsComponent } from './components/workshops/workshops.component';
import { ContactComponent } from './components/contact/contact.component';
import { CategoryComponent } from './components/category/category.component';
import { ItemComponent } from './components/item/item.component';

const routes: Routes = [
  
  {path: '', component: HomeComponent},
  {path: 'o-nas', component: AboutComponent},
  {path: 'szkolenia', component: WorkshopsComponent},
  {path: 'kontakt', component: ContactComponent},
  {path: 'wyjazdy/:triptype', component: CategoryComponent},
  {path: 'wyjazdy/:triptype/:tripid', component: ItemComponent},
  {path: '*', component: HomeComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
