import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TripCategory } from 'src/app/models/tripcategory.model';
import { selectCurrentTripCategory } from 'src/app/state/app.selectors';
import { IAppState } from 'src/app/state/app.state';
import * as Actions from '../../state/app.actions';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-home',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  category$: Observable<TripCategory>;
  currentCategory: TripCategory  = new TripCategory();
  categoryName!: string;



  constructor(private store: Store<IAppState>, private activatedRoute: ActivatedRoute, public validationService: ValidationService, private router: Router){

    this.category$ = this.store.pipe(select(selectCurrentTripCategory));
  }

  ngOnInit(): void{
    this.activatedRoute.paramMap.subscribe(params => {
      if(params){
        this.categoryName = params.get("tripcategory")!;
        this.store.dispatch(Actions.getTripCategoryRequest({categoryName: this.categoryName}));
      }
    });

    this.category$.subscribe(category => {
      this.currentCategory = category;
      console.log("current category: " + JSON.stringify(category));
    })
  }

  goToTrip(id: number){
    this.router.navigate(["trips/"+id])
  }
}
