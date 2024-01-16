import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable, first, mergeMap } from "rxjs";
import { IAppState } from "../state/app.state";
import { selectAccessToken } from "../state/app.selectors";

@Injectable()
export class JwtInterceptor implements HttpInterceptor 
{
    constructor(private store: Store<IAppState>){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        return this.store.select(selectAccessToken).pipe(
            first(),
            mergeMap(token => {
                request = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${token}`
                    }
                  });
                return next.handle(request);
            }),
        );
    }
 }