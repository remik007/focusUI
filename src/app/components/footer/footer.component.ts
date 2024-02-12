import { Component } from '@angular/core';
import * as Actions from '../../state/app.actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { selectContactDetails, selectSubPages, selectTripCategories } from 'src/app/state/app.selectors';
import { IAppState } from 'src/app/state/app.state';
import { TripCategory } from 'src/app/models/tripcategory.model';
import { SubPage } from 'src/app/models/subpage.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  contact$: Observable<Contact>;
  contactDetails: Contact  = new Contact();
  categories$: Observable<Array<TripCategory>>;
  subPages$: Observable<Array<SubPage>>;
  tripCategories: TripCategory[]  = [];
  subPages: SubPage[] = [];
  currentYear: string;

  constructor(private store: Store<IAppState>){
    this.currentYear = new Date().getFullYear().toString();
    this.contact$ = this.store.pipe(select(selectContactDetails));
    this.categories$ = this.store.pipe(select(selectTripCategories));
    this.subPages$ = this.store.pipe(select(selectSubPages));
  }

  ngOnInit(): void{
    
    this.contact$.subscribe(contact => {
      this.contactDetails = contact;
    })
    this.categories$.subscribe(categories => {
      this.tripCategories = categories;
    });
    this.subPages$.subscribe(subPages => {
      this.subPages = subPages;
    });
  }

  public openEmail(): void {
    window.open(`mailto:${this.contactDetails.email};?subject=Zapytanie ze strony`,'_self');
  }
}
