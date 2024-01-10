import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TripCategory } from 'src/app/models/tripcategory.model';
import { selectCurrentTripCategory } from 'src/app/state/app.selectors';
import { IAppState } from 'src/app/state/app.state';
import * as Actions from '../../state/app.actions';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  category$: Observable<TripCategory>;
  currentCategory: TripCategory  = new TripCategory();
  categoryName!: string;

  constructor(private store: Store<IAppState>, private activatedRoute: ActivatedRoute){
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.categoryName = params['url'];
      }
    )
    this.category$ = this.store.pipe(select(selectCurrentTripCategory));
  }

  ngOnInit(): void{
    this.store.dispatch(Actions.getTripCategoryRequest({categoryName: this.categoryName}));
    this.category$.subscribe(category => {
      this.currentCategory = category;
    })
  }
}
