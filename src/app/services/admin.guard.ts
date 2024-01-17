import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { ModalService } from '../components/_modal';
@Injectable()
export class AdminGuard {
  constructor(public storageService: StorageService, public router: Router, private modalService: ModalService) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.storageService.isAdmin()){
        return true;
      }else{
        this.router.navigate([''])
        return false;
      }
  }
}