import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TripCategory } from 'src/app/models/tripcategory.model';
import { selectContactDetails, selectCurrentSubPageDetails, selectCurrentTripCategory, selectSubPages, selectTransportTypes, selectTripCategories, selectTripDetails } from 'src/app/state/app.selectors';
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
import { Contact } from 'src/app/models/contact.model';

declare let tinymce: any;

@Component({
  selector: 'app-editcontact',
  templateUrl: './editcontact.component.html',
  styleUrls: ['./editcontact.component.css']
})
export class EditContactComponent {


  contact$: Observable<Contact>;
  contactDetails!: Contact;

  loading: Boolean = false;
  false: boolean = false;
  true: boolean = true;

  constructor(private store: Store<IAppState>, public modalService: ModalService, private adminService: AdminService, private router: Router, private route: ActivatedRoute, private validationService: ValidationService){
    this.contact$ = this.store.pipe(select(selectContactDetails));
  }

  ngOnInit(): void{
    this.contact$.subscribe(contact => {
      this.contactDetails = contact;
    })
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
    (this.contactDetails as any)[field] = answer;
  }

  submit(): void{
    // stop here if form is invalid
    //TODO: add form validation
    this.adminService.updateContactDetails(this.contactDetails).subscribe(
      {
      next: data => {
        this.loading = false;
        this.router.navigate(["kontakt"]);
      },
      error: err => {
        this.loading = false;
        console.error("error: " + err);
        this.modalService.open("addtrip-failed-modal");
      }
    });
    
}
  
}
