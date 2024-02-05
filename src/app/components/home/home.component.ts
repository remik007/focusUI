import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/models/trip.model';
import { IAppState } from 'src/app/state/app.state';
import { environment } from "src/environment/environment";
import * as Actions from '../../state/app.actions';
import { selectHighlightedTrips } from 'src/app/state/app.selectors';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  highlightedTrips$: Observable<Array<Trip>>;
  highlightedTrips!: Array<Trip>;

  responsiveOptions : any[]=[
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    }
]

  constructor(private store: Store<IAppState>, public validationService: ValidationService){
    this.highlightedTrips$ = this.store.pipe(select(selectHighlightedTrips));
  }

  ngOnInit(){
    this.store.dispatch(Actions.getHighlightedTripsRequest());
    this.highlightedTrips$.subscribe(highlightedTrips => {
      this.highlightedTrips = highlightedTrips;
    });
  }
  
  
}
