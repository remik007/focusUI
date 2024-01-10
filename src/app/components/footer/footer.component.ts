import { Component } from '@angular/core';
import * as Actions from '../../state/app.actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { selectContactDetails } from 'src/app/state/app.selectors';
import { IAppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  contact$: Observable<Contact>;
  contactDetails: Contact  = new Contact();

  constructor(private store: Store<IAppState>){
    this.contact$ = this.store.pipe(select(selectContactDetails));
  }

  ngOnInit(): void{
    this.store.dispatch(Actions.getContactDetailsRequest());
    this.contact$.subscribe(contact => {
      this.contactDetails = contact;
    })
  }
}
