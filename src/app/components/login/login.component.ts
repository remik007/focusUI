import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { IAppState } from 'src/app/state/app.state';
import { environment } from "src/environment/environment";
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { ModalService } from '../_modal';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  source!: string;
  loading: Boolean = false;
  submitted: Boolean = false;
  form!: FormGroup;
  
  constructor(private store: Store<IAppState>, private formBuilder: FormBuilder, private authService: AuthService, private storageService: StorageService, private router: Router, private modalService: ModalService){
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
      this.authService.login(loginDetails).subscribe(
        {
        next: data => {
          console.log(data.body);
          this.loading = false;
          let jsonObj = JSON.parse(data.body!.toString());
          var user: User = Object.assign(User, jsonObj);
          this.storageService.saveUser(user);
          this.router.navigate(['']);
          this.f['password'].setValue("");
        },
        error: err => {
          this.loading = false;
          this.openModal("login-failed-modal");
        }
      });
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
}
