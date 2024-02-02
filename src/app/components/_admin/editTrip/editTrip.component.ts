import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TripCategory } from 'src/app/models/tripcategory.model';
import { selectTransportTypes, selectTripCategories } from 'src/app/state/app.selectors';
import { IAppState } from 'src/app/state/app.state';
import { environment } from "src/environment/environment";
import * as Actions from '../../../state/app.actions';
import { TransportType } from 'src/app/models/transporttype.model';
import { Trip } from 'src/app/models/trip.model';
import { ModalService } from '../../_modal/modal.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

declare let tinymce: any;

@Component({
  selector: 'app-edittrip',
  templateUrl: './edittrip.component.html',
  styleUrls: ['./edittrip.component.css']
})
export class EditTripComponent {

  tinymceInit!: any;
  tinymceKey: string = environment.tinymceKey;
  tinymceContent: any;

  
  categories$: Observable<Array<TripCategory>>;
  tripCategories: TripCategory[]  = [];
  transports$: Observable<Array<TransportType>>;
  transportTypes: TransportType[]  = [];

  trip: Trip = new Trip();

  loading: Boolean = false;
  false: boolean = false;
  true: boolean = true;

  constructor(private store: Store<IAppState>, public modalService: ModalService, private adminService: AdminService, private router: Router){
    this.categories$ = this.store.pipe(select(selectTripCategories));
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
  }
  
  saveAnswer(field: string, answer: string){
    console.log(answer);
    (this.trip as any)[field] = answer;
  }

  saveFile(imageName: string, imageContent: string){
    console.log(imageName);
    console.log(imageContent);
    (this.trip as any)[imageName] = imageName;
    (this.trip as any)[imageContent] = imageContent;
  }

  submit(): void{
    // stop here if form is invalid
    //TODO: add form validation
    console.log(this.trip.toString());
    this.loading = true;
    this.trip.description = this.tinymceContent;
    this.adminService.addTrip(this.trip).subscribe(
      {
      next: data => {
        let id = data.body;
        this.loading = false;
        this.router.navigate(['admin/trips/'+id]);
      },
      error: err => {
        this.loading = false;
        console.error("error: " + err);
        this.modalService.open("addtrip-failed-modal");
      }
    });
}
  
}
