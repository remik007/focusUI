import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TripCategory } from 'src/app/models/tripcategory.model';
import { selectCurrentTripCategory } from 'src/app/state/app.selectors';
import { IAppState } from 'src/app/state/app.state';
import * as Actions from '../../state/app.actions';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';
import { Search } from 'src/app/models/search.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  category$: Observable<TripCategory>;
  currentCategory: TripCategory  = new TripCategory();

  search: Search = new Search();

  constructor(private store: Store<IAppState>, private activatedRoute: ActivatedRoute, public validationService: ValidationService, private router: Router, private storageService: StorageService){

    this.category$ = this.store.pipe(select(selectCurrentTripCategory));
  }

  ngOnInit(): void{
    this.activatedRoute.paramMap.subscribe(params => {
      if(params){
        this.search.category = params.get("tripcategory")!;
        if(this.search.category !== "Szukaj"){
          this.store.dispatch(Actions.getTripCategoryRequest({search: this.search}));
        }
        else{
          this.activatedRoute.queryParams.subscribe(params => {
            if(params){
              if(this.search.category === "Szukaj"){
                this.search.country = params["country"]!;
                this.search.from = params["from"]!;
                this.search.to = params["to"]!;
                this.search.departureCity = params["departureCity"]!;
                this.search.transportType = params["transportType"]!;
                this.search.isAdmin = this.storageService.isAdmin();
                this.store.dispatch(Actions.getTripCategoryRequest({search: this.search}));
              }
            }
          });
        }
      }
    });



    this.category$.subscribe(category => {
      this.currentCategory = category;
    })
  }

  goToTrip(id: number){
    this.router.navigate(["trips/"+id])
  }
}
