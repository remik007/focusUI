import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TripCategory } from 'src/app/models/tripcategory.model';
import { selectCurrentSubPageDetails, selectCurrentTripCategory, selectSubPages, selectTransportTypes, selectTripCategories, selectTripDetails } from 'src/app/state/app.selectors';
import { IAppState } from 'src/app/state/app.state';
import { environment } from "src/environment/environment";
import * as Actions from '../../../state/app.actions';
import { TransportType } from 'src/app/models/transporttype.model';
import { Trip } from 'src/app/models/trip.model';
import { ModalService } from '../../_modal/modal.service';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';
import { Search } from 'src/app/models/search.model';

declare let tinymce: any;

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddCategoryComponent {

  tinymceInit!: any;
  tinymceKey: string = environment.tinymceKey;
  tinymceContent: any;

  category$: Observable<TripCategory>;
  category!: TripCategory;
  categoryName: string = "";

  loading: Boolean = false;
  false: boolean = false;
  true: boolean = true;

  constructor(private store: Store<IAppState>, public modalService: ModalService, private adminService: AdminService, private router: Router, private route: ActivatedRoute, private validationService: ValidationService){
    this.category$ = this.store.pipe(select(selectCurrentTripCategory));
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
    this.route.params.subscribe(params => {
      let stringId = params['category'];
      if(stringId !== undefined && stringId !== null && stringId !== ""){
        this.categoryName = stringId;
        var search: Search = new Search();
        search.category = this.categoryName;
        this.store.dispatch(Actions.getTripCategoryRequest({search: search}));      
      }
      this.category$.subscribe(category => {
        this.category = category;
        console.log(category);
      });
    });
  }
  
  getStringDate(date: Date) : string{
    if(date !== undefined && date !== null){
      console.log(date);
      return date.toString();
    }
    return "";
}

  saveAnswer(field: string, answer: string){
    console.log(answer);
    (this.category as any)[field] = answer;
  }

  submit(): void{
    // stop here if form is invalid
    //TODO: add form validation
    if(this.categoryName !== ""){
      
      this.loading = true;
      this.adminService.updateCategory(this.category).subscribe(
        {
        next: data => {
          this.loading = false;
          this.router.navigate(["wyjazdy/"+this.categoryName]);
        },
        error: err => {
          this.loading = false;
          console.error("error: " + err);
          this.modalService.open("addtrip-failed-modal");
        }
      });
    }
    else{

      this.loading = true;
      this.adminService.addCategory(this.category).subscribe(
        {
        next: data => {
          this.loading = false;
          this.router.navigate(["wyjazdy/" + this.category.name]);
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
