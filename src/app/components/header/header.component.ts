import { Component } from '@angular/core';
import { IAppState } from '../../state/app.state';
import { Store, select } from '@ngrx/store';
import { TripCategory } from '../../models/tripcategory.model';
import { Observable } from 'rxjs';
import { selectTripCategories } from '../../state/app.selectors';
import * as Actions from '../../state/app.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public navbarCollapsed = true;
  public isCollapsed = true;
  categories$: Observable<Array<TripCategory>>;
  tripCategories: TripCategory[]  = [];

  constructor(private store: Store<IAppState>){
    this.categories$ = this.store.pipe(select(selectTripCategories));
  }

  ngOnInit(): void{
    this.store.dispatch(Actions.getTripCategoriesRequest());
    this.categories$.subscribe(categories => {
      this.tripCategories = categories;
    })
  }

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
}
