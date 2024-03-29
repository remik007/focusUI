import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { ModalService } from '../components/_modal';
@Injectable()
export class AuthGuard {
  constructor(public storageService: StorageService, public router: Router, private modalService: ModalService) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.storageService.isLoggedIn()){
        return true;
      }else{
        this.modalService.open("login-modal");
        return false;
      }
  }
}