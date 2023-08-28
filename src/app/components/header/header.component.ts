import { Component } from '@angular/core';
import { IAppState } from '../../state/app.state';
import { Store, select } from '@ngrx/store';
import { TripType } from '../../models/triptype.model';
import { Observable } from 'rxjs';
import { selectTripTypes } from '../../state/app.selectors';
import * as Actions from '../../state/app.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public navbarCollapsed = true;
  public isCollapsed = true;
  categories$: Observable<Array<TripType>>;
  tripTypes: TripType[]  = [];

  constructor(private store: Store<IAppState>){
    this.categories$ = this.store.pipe(select(selectTripTypes));
  }

  ngOnInit(): void{
    this.store.dispatch(Actions.getTripTypesRequest());
    this.categories$.subscribe(categories => {
      this.tripTypes = categories;
    })
  }

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
}
