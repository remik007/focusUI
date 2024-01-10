import { Component } from '@angular/core';
import * as Actions from '../../state/app.actions';
import { Trip } from 'src/app/models/trip.model';
import { selectTripDetails } from 'src/app/state/app.selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  trip$: Observable<Trip>;
  trip: Trip  = new Trip();
  tripId!: number;

  constructor(private store: Store<IAppState>, private activatedRoute: ActivatedRoute){
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.tripId = Number(params['url']);
      }
    )
    this.trip$ = this.store.pipe(select(selectTripDetails));
  }

  ngOnInit(): void{
    this.store.dispatch(Actions.getTripRequest({tripId: this.tripId}));
    this.trip$.subscribe(trip => {
      this.trip = trip;
    })
  }
}
