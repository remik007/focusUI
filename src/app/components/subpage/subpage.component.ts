import { Component } from '@angular/core';
import * as Actions from '../../state/app.actions';
import { SubPage } from 'src/app/models/subpage.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentSubPageDetails, selectCurrentSubPageImage } from 'src/app/state/app.selectors';
import { IAppState } from 'src/app/state/app.state';
import { SanitizeHtmlPipe } from 'src/app/services/sanitizehtml.pipe';
import { ModalService } from '../_modal';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-home',
  templateUrl: './subpage.component.html',
  styleUrls: ['./subpage.component.css']
})
export class SubPageComponent {
  subPage$: Observable<SubPage>;
  currentsubPage: SubPage  = new SubPage();
  subPageName!: string;
  image$: Observable<Image>;
  image: Image = new Image();
  loading: boolean = false;

  constructor(private store: Store<IAppState>, private activatedRoute: ActivatedRoute, private serviceModal: ModalService, public storageService: StorageService, private adminService: AdminService, private router: Router){
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.subPageName = params['subpage'];
      }
    )
    this.subPage$ = this.store.pipe(select(selectCurrentSubPageDetails));
    this.image$ = this.store.pipe(select(selectCurrentSubPageImage));
  }

  ngOnInit(): void{
    this.store.dispatch(Actions.getSubPageDetailsRequest({subPageName: this.subPageName}));
    this.subPage$.subscribe(subPage => {
      this.currentsubPage = subPage;
    })
    
    this.store.dispatch(Actions.getSubPageImageRequest({name: this.subPageName}));
    this.image$.subscribe(image => {
      this.image = image;
    })
  }

  openModal(name: string){
    this.serviceModal.open(name);
  }

  closeModal(name: string){
    this.serviceModal.close(name);
  }

  deleteSubpage(){
    this.loading = true;
    this.adminService.deleteSubpage(this.subPageName).subscribe(
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
