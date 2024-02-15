import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TripCategory } from 'src/app/models/tripcategory.model';
import { selectCategoryImages, selectCurrentTripCategory } from 'src/app/state/app.selectors';
import { IAppState } from 'src/app/state/app.state';
import * as Actions from '../../state/app.actions';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';
import { Search } from 'src/app/models/search.model';
import { StorageService } from 'src/app/services/storage.service';
import { AdminService } from 'src/app/services/admin.service';
import { ModalService } from '../_modal';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-home',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  category$: Observable<TripCategory>;
  currentCategory: TripCategory  = new TripCategory();
  search: Search = new Search();
  loading: boolean = false;

  images$: Observable<Array<Image>>;
  images!: Array<Image>;

  constructor(private store: Store<IAppState>, private activatedRoute: ActivatedRoute, public validationService: ValidationService, private router: Router, public storageService: StorageService, private serviceModal: ModalService, private adminService: AdminService){

    this.category$ = this.store.pipe(select(selectCurrentTripCategory));
    this.images$ = this.store.pipe(select(selectCategoryImages));
  }

  ngOnInit(): void{
  
    this.images$.subscribe(images => {
      this.images = images;
    });
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
        this.store.dispatch(Actions.getCategoryImagesRequest({search: this.search}));
      }
    });

    this.category$.subscribe(category => {
      this.currentCategory = category;
    })
  }

  goToTripUrl(id: number) : string{
    return this.router.url+"/"+id;
  }

  openModal(name: string){
    this.serviceModal.open(name);
  }

  closeModal(name: string){
    this.serviceModal.close(name);
  }

  deleteCategory(){
    this.loading = true;
    this.adminService.deleteCategory(this.search.category).subscribe(
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

  getImageContent(id: number | undefined) : string{
    var image = this.images.filter(x => x.id === id);
    if(image.length > 0){
      if(image[0].imageContent !== undefined && image[0].imageContent !== null && image[0].imageContent !== ''){
        return image[0].imageContent;
      }
    }
    return "";
  }

}
