import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TripCategory } from 'src/app/models/tripcategory.model';
import { selectTransportTypes, selectTripCategories, selectTripDetails } from 'src/app/state/app.selectors';
import { IAppState } from 'src/app/state/app.state';
import { environment } from "src/environment/environment";
import * as Actions from '../../../state/app.actions';
import { TransportType } from 'src/app/models/transporttype.model';
import { Trip } from 'src/app/models/trip.model';
import { ModalService } from '../../_modal/modal.service';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';

declare let tinymce: any;

@Component({
  selector: 'app-addtrip',
  templateUrl: './addtrip.component.html',
  styleUrls: ['./addtrip.component.css']
})
export class AddTripComponent {

  tinymceInit!: any;
  tinymceKey: string = environment.tinymceKey;
  tinymceContent: any;
  
  categories$: Observable<Array<TripCategory>>;
  tripCategories: TripCategory[]  = [];
  transports$: Observable<Array<TransportType>>;
  transportTypes: TransportType[]  = [];
  trip$: Observable<Trip>;
  trip!: Trip;
  tripId: number = -1;

  loading: Boolean = false;
  false: boolean = false;
  true: boolean = true;

  constructor(private store: Store<IAppState>, public modalService: ModalService, private adminService: AdminService, private router: Router, private route: ActivatedRoute, private validationService: ValidationService){
    this.categories$ = this.store.pipe(select(selectTripCategories));
    this.trip$ = this.store.pipe(select(selectTripDetails));
    this.transports$ = this.store.pipe(select(selectTransportTypes));
    this.tinymceInit = {
      plugins: 'image',
      toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | image',
      image_advtab: true,
      file_picker_callback: function(cb: any, value: any, meta: any) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.onchange = function () {
          let file: any;
          if(input.files)
            file = input.files[0];
          var reader = new FileReader();
          reader.onload = function () {
            var id = 'blobid' + (new Date()).getTime();
            var blobCache = tinymce.activeEditor.editorUpload.blobCache;
            var base64 = (reader.result as string).split(',')[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);
            cb(blobInfo.blobUri(), { title: file.name });
          };
          reader.readAsDataURL(file);
        };
        input.click();
      }
    }
  }

  ngOnInit(): void{

    this.store.dispatch(Actions.getTripCategoriesRequest());
    this.categories$.subscribe(categories => {
      this.tripCategories = categories;
    })
    this.store.dispatch(Actions.getTransportTypesRequest());
    this.transports$.subscribe(transports => {
      this.transportTypes = transports;
    })
    

    this.route.params.subscribe(params => {
      let stringId = params['id'];
      if(stringId !== undefined && stringId !== null && stringId !== ""){
        this.tripId = parseInt(stringId);
        this.store.dispatch(Actions.getTripAdminRequest({tripId: this.tripId}));
          
      }

      this.trip$.subscribe(tripAdmin => {
        this.trip = tripAdmin;
        this.tinymceContent = this.trip.description;
      });
    });

  }
  
  
  getStringDate(date: Date) : string{
    if(date !== undefined && date !== null){
      return date.toString();
    }
    return "";
}

  saveAnswer(field: string, answer: string){
    (this.trip as any)[field] = answer;
  }

  saveFile(imageName: string, imageContent: string){
    this.trip.imageName = imageName;
    this.trip.imageContent = imageContent;
    console.log(this.trip);
  }

  submit(): void{
    // stop here if form is invalid
    //TODO: add form validation
    if(this.tripId !== -1){
      
      this.loading = true;
      this.trip.description = this.tinymceContent;
      console.log(this.trip);
      this.adminService.updateTrip(this.trip).subscribe(
        {
        next: data => {
          let id = data.body;
          this.loading = false;
          this.router.navigate(["wyjazdy/"+this.trip.tripCategory?.name+"/"+this.trip.id]);
        },
        error: err => {
          this.loading = false;
          console.error("error: " + err);
          this.modalService.open("addtrip-failed-modal");
        }
      });
    }
    else{
      console.log("ID: " + this.trip.id);
      this.loading = true;
      this.trip.description = this.tinymceContent;
      this.adminService.addTrip(this.trip).subscribe(
        {
        next: data => {
          let id = data.body;
          this.loading = false;
          var categoryName = this.tripCategories.filter(x => x.id === this.trip.tripCategoryId).map(x => x.name);
          this.router.navigate(["wyjazdy/"+categoryName[0]+"/"+id]);
        },
        error: err => {
          this.loading = false;
          console.error("error: " + err);
          this.modalService.open("addtrip-failed-modal");
        }
      });
    }
    
}
  
}
