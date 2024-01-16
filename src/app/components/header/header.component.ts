import { Component } from '@angular/core';
import { IAppState } from '../../state/app.state';
import { Store, select } from '@ngrx/store';
import { TripCategory } from '../../models/tripcategory.model';
import { Observable } from 'rxjs';
import { selectAccessToken, selectSubPages, selectTripCategories } from '../../state/app.selectors';
import * as Actions from '../../state/app.actions';
import { SubPage } from 'src/app/models/subpage.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public navbarCollapsed = true;
  public isCollapsed = true;
  categories$: Observable<Array<TripCategory>>;
  subPages$: Observable<Array<SubPage>>;
  tripCategories: TripCategory[]  = [];
  subPages: SubPage[] = [];
  accessToken$: Observable<String>;

  constructor(private store: Store<IAppState>){
    this.categories$ = this.store.pipe(select(selectTripCategories));
    this.subPages$ = this.store.pipe(select(selectSubPages));
    this.accessToken$ = this.store.pipe(select(selectAccessToken));
  }

  ngOnInit(): void{
    this.store.dispatch(Actions.getTripCategoriesRequest());
    this.categories$.subscribe(categories => {
      this.tripCategories = categories;
    })
    this.store.dispatch(Actions.getSubPagesRequest());
    this.subPages$.subscribe(subPages => {
      this.subPages = subPages;
    })
  }

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
}
