import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
@Injectable()
export class AuthGuard {
  constructor(public storageService: StorageService, public router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.storageService.isLoggedIn()){
        return true;
      }else{
        this.router.navigate(['login']);
        return false;
      }
  }
}