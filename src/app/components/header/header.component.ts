import { Component } from '@angular/core';
import { IAppState } from '../../state/app.state';
import { Store, select } from '@ngrx/store';
import { TripCategory } from '../../models/tripcategory.model';
import { Observable } from 'rxjs';
import { selectCountries, selectDepartureCities, selectSubPages, selectTransportTypes, selectTripCategories } from '../../state/app.selectors';
import * as Actions from '../../state/app.actions';
import { SubPage } from 'src/app/models/subpage.model';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/models/login.model';
import { User } from 'src/app/models/user.model';
import { ModalService } from '../_modal/modal.service';
import { TransportType } from 'src/app/models/transporttype.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public navbarCollapsed = true;
  public isCollapsed = true;
  categories$: Observable<Array<TripCategory>>;
  transportTypes$: Observable<Array<TransportType>>;
  subPages$: Observable<Array<SubPage>>;
  countries$: Observable<Array<string>>;
  departureCities$: Observable<Array<string>>;
  tripCategories: TripCategory[]  = [];
  transportTypes: TransportType[]  = [];
  subPages: SubPage[] = [];
  countries: string[] = [];
  departureCities: string[] = [];
  
  _storageService: StorageService;
  loading: Boolean = false;
  submitted: Boolean = false;
  form!: FormGroup;
  loginFailed: boolean = false;

  country: string = "";
  from: string = "";
  to: string = "";
  departureCity: string = "";
  transportType: string = "";

  constructor(private store: Store<IAppState>, private formBuilder: FormBuilder, private storageService: StorageService, private authService: AuthService, private router: Router, private modalService: ModalService){
    this.categories$ = this.store.pipe(select(selectTripCategories));
    this.subPages$ = this.store.pipe(select(selectSubPages));
    this.transportTypes$ = this.store.pipe(select(selectTransportTypes));
    this.countries$ = this.store.pipe(select(selectCountries));
    this.departureCities$ = this.store.pipe(select(selectDepartureCities));
    this._storageService = storageService;
  }

  ngOnInit(): void{
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.store.dispatch(Actions.getHeaderDataRequest());
    this.categories$.subscribe(categories => {
      this.tripCategories = categories;
    });
    this.subPages$.subscribe(subPages => {
      this.subPages = subPages;
    });
    this.transportTypes$.subscribe(transportTypes => {
      this.transportTypes = transportTypes;
    });
    this.countries$.subscribe(countries => {
      this.countries = countries;
    });
    this.departureCities$.subscribe(departureCities => {
      this.departureCities = departureCities;
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;
      this.loginFailed = false;
      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      let loginDetails: Login = {login: this.f['username'].value, password: this.f['password'].value};
      this.authService.login(loginDetails).subscribe(
        {
        next: data => {
          this.loading = false;
          var user: User = JSON.parse(data.body!.toString());
          this.storageService.saveUser(user);
          this.closeModal("login-modal");
          this.f['password'].setValue("");
        },
        error: err => {
          this.loading = false;
          this.loginFailed = true;
        }
      });
  }

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout(){
    this.storageService.clean();
    window.location.reload();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  openModel(id: string) {
    this.modalService.open(id);
  }
}
