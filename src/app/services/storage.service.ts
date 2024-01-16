import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    localStorage.clear();
  }

  public saveUser(user: User): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    let user = localStorage.getItem(USER_KEY);
    if (user) {
        let jsonObj = JSON.parse(user);
        let obj: User = Object.assign(User, jsonObj);
      return obj;
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}