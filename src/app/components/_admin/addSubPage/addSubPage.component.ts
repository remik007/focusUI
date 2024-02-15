import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TripCategory } from 'src/app/models/tripcategory.model';
import { selectCurrentSubPageDetails, selectSubPages, selectTransportTypes, selectTripCategories, selectTripDetails } from 'src/app/state/app.selectors';
import { IAppState } from 'src/app/state/app.state';
import { environment } from "src/environment/environment";
import * as Actions from '../../../state/app.actions';
import { TransportType } from 'src/app/models/transporttype.model';
import { Trip } from 'src/app/models/trip.model';
import { ModalService } from '../../_modal/modal.service';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';
import { SubPage } from 'src/app/models/subpage.model';

declare let tinymce: any;

@Component({
  selector: 'app-addsubpage',
  templateUrl: './addsubpage.component.html',
  styleUrls: ['./addsubpage.component.css']
})
export class AddSubPageComponent {

  tinymceInit!: any;
  tinymceKey: string = environment.tinymceKey;
  tinymceContent: any;

  subpage$: Observable<SubPage>;
  subpage!: SubPage;
  subpageName: string = "";

  loading: Boolean = false;
  false: boolean = false;
  true: boolean = true;

  constructor(private store: Store<IAppState>, public modalService: ModalService, private adminService: AdminService, private router: Router, private route: ActivatedRoute, private validationService: ValidationService){
    this.subpage$ = this.store.pipe(select(selectCurrentSubPageDetails));
    this.tinymceInit = {
      plugins: 'image advlist anchor autolink autoresize autosave charmap code codesample directionality emoticons fullscreen help image importcss insertdatetime link linkchecker lists media nonbreaking pagebreak preview quickbars save searchreplace table template tinydrive visualblocks visualchars',
      toolbar1: 'undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image ',
      toolbar2: 'table tableinsertdialog | link image | print preview media | forecolor backcolor emoticons',
      toolbar3: 'table tablecellprops tablecopyrow tablecutrow tabledelete tabledeletecol tabledeleterow tableinsertdialog tableinsertcolafter tableinsertcolbefore tableinsertrowafter tableinsertrowbefore tablemergecells tablepasterowafter tablepasterowbefore tableprops tablerowprops tablesplitcells tableclass tablecellclass tablecellvalign tablecellborderwidth tablecellborderstyle tablecaption tablecellbackgroundcolor tablecellbordercolor tablerowheader tablecolheader',
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
      let stringId = params['subpage'];
      if(stringId !== undefined && stringId !== null && stringId !== ""){
        this.subpageName = stringId;
        this.store.dispatch(Actions.getSubPageDetailsAdminRequest({subPageName: this.subpageName}));      
      }
      this.subpage$.subscribe(subpage => {
        this.subpage = subpage;
        console.log(subpage);
        this.tinymceContent = this.subpage.description;
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
    console.log(answer);
    (this.subpage as any)[field] = answer;
  }

  saveFile(imageName: string, imageContent: string){
    console.log(imageName + ": " + imageContent);
    this.subpage.imageName = imageName;
    this.subpage.imageContent = imageContent;
  }

  submit(): void{
    // stop here if form is invalid
    //TODO: add form validation
    if(this.subpageName !== ""){
      
      this.loading = true;
      this.subpage.description = this.tinymceContent;
      this.adminService.updateSubPage(this.subpage).subscribe(
        {
        next: data => {
          this.loading = false;
          this.router.navigate([this.subpageName]);
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
      this.subpage.description = this.tinymceContent;
      this.adminService.addSubPage(this.subpage).subscribe(
        {
        next: data => {
          this.loading = false;
          this.router.navigate([this.subpage.name]).then(() => {
            window.location.reload();
          });
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
