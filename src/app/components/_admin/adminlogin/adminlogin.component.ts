import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { IAppState } from 'src/app/state/app.state';
import { environment } from "src/environment/environment";
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminLoginComponent implements OnInit {
  source!: string;
  loading: Boolean = false;
  submitted: Boolean = false;
  form!: FormGroup;
  
  constructor(private store: Store<IAppState>, private formBuilder: FormBuilder, private authService: AuthService){
    this.source = "";
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
      this.authService.login(loginDetails).subscribe(userObj => {
        console.log(userObj);
        this.loading = false;
      });
  }
  
}
