import { Component } from '@angular/core';
import * as Actions from '../../state/app.actions';
import { Trip } from 'src/app/models/trip.model';
import { selectTripDetails } from 'src/app/state/app.selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';
import { ModalService } from '../_modal';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  trip$: Observable<Trip>;
  trip: Trip  = new Trip();
  tripId!: number;
  loading: boolean = false;

  constructor(private store: Store<IAppState>, private activatedRoute: ActivatedRoute, public validationService: ValidationService, private serviceModal: ModalService, private router: Router, private adminService: AdminService, public storageService: StorageService){
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.tripId = Number(params['id']);
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
  
  openModal(name: string){
    this.serviceModal.open(name);
  }

  closeModal(name: string){
    this.serviceModal.close(name);
  }

  deleteTrip(){
    this.loading = true;
    this.adminService.deleteTrip(this.tripId).subscribe(
      {
      next: data => {
        let id = data.body;
        this.loading = false;
        this.router.navigate([""])
        .then(() => {
          window.location.reload();
        });
      },
      error: err => {
        this.loading = false;
        console.error("error: " + err);
        this.serviceModal.open("addtrip-failed-modal");
      }
    });
  }

}
