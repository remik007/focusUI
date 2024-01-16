import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable, catchError, first, mergeMap, switchMap, throwError } from "rxjs";
import { IAppState } from "../state/app.state";
import { StorageService } from "./storage.service";
import { User } from "../models/user.model";
import { AuthService } from "./auth.service";
import { EventBusService } from "./eventbus.service";
import { EventData } from "../_shared/event.class";
import { Tokens } from "../models/tokens.model";

@Injectable()
export class JwtInterceptor implements HttpInterceptor 
{
    private isRefreshing = false;

    constructor(private store: Store<IAppState>, private storageService: StorageService, private authService: AuthService, private eventBusService: EventBusService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
      let user: User = this.storageService.getUser();
      console.log(JSON.stringify(user));
      if (user.accessToken !== undefined && user.accessToken !== null && user.accessToken !== "")
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });

      return next.handle(request).pipe(
        catchError((error) => {
          if (
            error instanceof HttpErrorResponse &&
            !request.url.includes('admin/login') &&
            error.status === 401
          ) {
            return this.handle401Error(request, next, user.accessToken, user.refreshToken);
          }
  
          return throwError(() => error);
        })
      );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler, accessToken: string, refreshToken: string) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
  
        if (this.storageService.isLoggedIn()) {
          let tokens: Tokens = {accessToken: accessToken, refreshToken: refreshToken};
          return this.authService.refreshToken(tokens).pipe(
            switchMap(() => {
              this.isRefreshing = false;
  
              return next.handle(request);
            }),
            catchError((error) => {
              this.isRefreshing = false;
  
              if (error.status == '403') {
                this.eventBusService.emit(new EventData('logout', null));
              }
  
              return throwError(() => error);
            })
          );
        }
      }
      return next.handle(request);
    }
 }