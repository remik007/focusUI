import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { selectAccessToken } from 'src/app/state/app.selectors';
import { IAppState } from 'src/app/state/app.state';
import * as Actions from '../../../state/app.actions';
import { environment } from "src/environment/environment";


@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminHomeComponent implements OnInit {
  source!: string;
  loading: Boolean = false;
  submitted: Boolean = false;
  form!: FormGroup;
  accessToken$: Observable<String>;
  
  constructor(private store: Store<IAppState>, private formBuilder: FormBuilder){
    this.source = "";
    this.accessToken$ = this.store.pipe(select(selectAccessToken));
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }
  
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      let loginDetails: Login = {login: this.f['username'].value, password: this.f['password'].value};
      this.store.dispatch(Actions.loginRequest({loginDetails: loginDetails}));
      this.accessToken$.subscribe(accessToken => {
        console.log(accessToken);
        this.loading = false;
      })
  }
  
}
