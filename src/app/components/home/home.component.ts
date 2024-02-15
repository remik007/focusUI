import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/models/trip.model';
import { IAppState } from 'src/app/state/app.state';
import * as Actions from '../../state/app.actions';
import { selectHighlightedImages, selectHighlightedTrips } from 'src/app/state/app.selectors';
import { ValidationService } from 'src/app/services/validation.service';
import { Router } from '@angular/router';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  highlightedTrips$: Observable<Array<Trip>>;
  highlightedTrips!: Array<Trip>;
  images$: Observable<Array<Image>>;
  images!: Array<Image>;

  responsiveOptions : any[]=[
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    }
]

  constructor(private store: Store<IAppState>, public validationService: ValidationService, private router: Router){
    this.highlightedTrips$ = this.store.pipe(select(selectHighlightedTrips));
    this.images$ = this.store.pipe(select(selectHighlightedImages));
  }

  ngOnInit(){
    this.store.dispatch(Actions.getHighlightedTripsRequest());
    this.highlightedTrips$.subscribe(highlightedTrips => {
      this.highlightedTrips = highlightedTrips;
    });
    this.store.dispatch(Actions.getHighlightedImagesRequest());
    this.images$.subscribe(images => {
      this.images = images;
    });
  }
  
  goToTrip(categoryName: string, id: number){
    this.router.navigate(["wyjazdy/"+categoryName+"/"+id])
  }

  getImageContent(id: number) : string{
    var image = this.images.filter(x => x.id === id);
    if(image.length > 0){
      if(image[0].imageContent !== undefined && image[0].imageContent !== null && image[0].imageContent !== ''){
        return image[0].imageContent;
      }
    }
    return "";
  }

  isImageAvailable(id: number): boolean{
    return this.images.filter(x => x.id === id).length > 0;
  }
  
}
