import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AppActions from './app.actions';
import { exhaustMap, map, tap } from "rxjs";
import { HttpService } from "../services/http.service";
import { TripCategory } from "../models/tripcategory.model";
import { ModalService } from "../components/_modal/modal.service";
import { SubPage } from "../models/subpage.model";
import { Contact } from "../models/contact.model";
import { Trip } from "../models/trip.model";
import { AuthService } from "../services/auth.service";
import { User } from "../models/user.model";
import { StorageService } from "../services/storage.service";

@Injectable()
export class AppEffects {

    getTripCategoriesRequest$ = createEffect(() => {
        
        return this.actions$.pipe(
            ofType(AppActions.getTripCategoriesRequest),
            exhaustMap((/*parameter*/) => {
                return this.httpService
                .getTripCategories()
                .pipe(map((getTripCategoriesResponse) =>{
                    if(getTripCategoriesResponse.status == 200){
                        try{
                            if(getTripCategoriesResponse.body){
                                let tripCategoriesJson = JSON.parse(getTripCategoriesResponse.body.toString());
                                let tripCategories: TripCategory[] = Object.assign(new Array<TripCategory>(), tripCategoriesJson);
                                return AppActions.getTripCategoriesSuccess({tripCategories: tripCategories});
                            }
                        } catch (error){
                            console.log(error);
                        }
                    }
                    console.log("Get trip categories request failed.");
                    return AppActions.getTripCategoriesFailure({error: "Get trip categories request failed."});
                }))
            })
        )
    })

    getTripCategoriesFailure$ = createEffect(() =>
    this.actions$.pipe(
            ofType(AppActions.getTripCategoriesFailure),
            tap(({error}) => {
                console.log(error);
                this.modalService.open('bad-request-modal');
            })
        ),
        {dispatch: false}
    );


    getSubPagesRequest$ = createEffect(() => {
        
        return this.actions$.pipe(
            ofType(AppActions.getSubPagesRequest),
            exhaustMap((/*parameter*/) => {
                return this.httpService
                .getSubPages()
                .pipe(map((httpResponse) =>{
                    if(httpResponse.status == 200){
                        try{
                            if(httpResponse.body){
                                let jsonObj = JSON.parse(httpResponse.body.toString());
                                let obj: SubPage[] = Object.assign(new Array<SubPage>(), jsonObj);
                                return AppActions.getSubPagesRequestSuccess({subPages: obj});
                            }
                        } catch (error){
                            console.log(error);
                        }
                    }
                    console.log("Get sub page request failed.");
                    return AppActions.getSubPagesRequestFailure({error: "Get sub page request failed."});
                }))
            })
        )
    })

    getSubPagesFailure$ = createEffect(() =>
    this.actions$.pipe(
            ofType(AppActions.getSubPagesRequestFailure),
            tap(({error}) => {
                console.log(error);
                this.modalService.open('bad-request-modal');
            })
        ),
        {dispatch: false}
    );

    
    getContactDetailsRequest$ = createEffect(() => {
        
        return this.actions$.pipe(
            ofType(AppActions.getContactDetailsRequest),
            exhaustMap((/*parameter*/) => {
                return this.httpService
                .getContactDetails()
                .pipe(map((httpResponse) =>{
                    if(httpResponse.status == 200){
                        try{
                            if(httpResponse.body){
                                let jsonObj = JSON.parse(httpResponse.body.toString());
                                let obj: Contact = Object.assign(new Contact(), jsonObj);
                                return AppActions.getContactDetailsRequestSuccess({contact: obj});
                            }
                        } catch (error){
                            console.log(error);
                        }
                    }
                    console.log("Get contact details request failed.");
                    return AppActions.getTripCategoriesFailure({error: "Get contact details request failed."});
                }))
            })
        )
    })

    getContactDetailsFailure$ = createEffect(() =>
    this.actions$.pipe(
            ofType(AppActions.getContactDetailsRequestFailure),
            tap(({error}) => {
                console.log(error);
                this.modalService.open('bad-request-modal');
            })
        ),
        {dispatch: false}
    );

    getTripCategoryRequest$ = createEffect(() => {
        
        return this.actions$.pipe(
            ofType(AppActions.getTripCategoryRequest),
            exhaustMap((action) => {
                return this.httpService
                .getTripCategory(action.categoryName)
                .pipe(map((httpResponse) =>{
                    if(httpResponse.status == 200){
                        try{
                            if(httpResponse.body){
                                let jsonObj = JSON.parse(httpResponse.body.toString());
                                let obj: TripCategory = Object.assign(new Array<TripCategory>(), jsonObj);
                                return AppActions.getTripCategoryRequestSuccess({tripCategory: obj});
                            }
                        } catch (error){
                            console.log(error);
                        }
                    }
                    console.log("Get trip category request failed.");
                    return AppActions.getTripCategoryRequestFailure({error: "Get trip category request failed."});
                }))
            })
        )
    })

    getTripCategoryFailure$ = createEffect(() =>
    this.actions$.pipe(
            ofType(AppActions.getTripCategoryRequestFailure),
            tap(({error}) => {
                console.log(error);
                this.modalService.open('bad-request-modal');
            })
        ),
        {dispatch: false}
    );


    getTripRequest$ = createEffect(() => {
        
        return this.actions$.pipe(
            ofType(AppActions.getTripRequest),
            exhaustMap((action) => {
                return this.httpService
                .getTrip(action.tripId)
                .pipe(map((httpResponse) =>{
                    if(httpResponse.status == 200){
                        try{
                            if(httpResponse.body){
                                let jsonObj = JSON.parse(httpResponse.body.toString());
                                let obj: Trip = Object.assign(Trip, jsonObj);
                                return AppActions.getTripRequestSuccess({trip: obj});
                            }
                        } catch (error){
                            console.log(error);
                        }
                    }
                    console.log("Get trip request failed.");
                    return AppActions.getTripRequestFailure({error: "Get trip request failed."});
                }))
            })
        )
    })

    getTripFailure$ = createEffect(() =>
    this.actions$.pipe(
            ofType(AppActions.getTripRequestFailure),
            tap(({error}) => {
                console.log(error);
                this.modalService.open('bad-request-modal');
            })
        ),
        {dispatch: false}
    );

    
    getSubPageRequest$ = createEffect(() => {
        
        return this.actions$.pipe(
            ofType(AppActions.getSubPageDetailsRequest),
            exhaustMap((action) => {
                return this.httpService
                .getSubPage(action.subPageName)
                .pipe(map((httpResponse) =>{
                    if(httpResponse.status == 200){
                        try{
                            if(httpResponse.body){
                                let jsonObj = JSON.parse(httpResponse.body.toString());
                                let obj: SubPage = Object.assign(SubPage, jsonObj);
                                return AppActions.getSubPageDetailsRequestSuccess({subPage: obj});
                            }
                        } catch (error){
                            console.log(error);
                        }
                    }
                    console.log("Get sub page request failed.");
                    return AppActions.getSubPageDetailsRequestFailure({error: "Get sub page request failed."});
                }))
            })
        )
    })

    getSubPageFailure$ = createEffect(() =>
    this.actions$.pipe(
            ofType(AppActions.getSubPageDetailsRequestFailure),
            tap(({error}) => {
                console.log(error);
                this.modalService.open('bad-request-modal');
            })
        ),
        {dispatch: false}
    );

    loginRequest$ = createEffect(() => {
        
        return this.actions$.pipe(
            ofType(AppActions.loginRequest),
            exhaustMap((action) => {
                return this.authService
                .login(action.loginDetails)
                .pipe(map((httpResponse) =>{
                    if(httpResponse.status == 200){
                        try{
                            if(httpResponse.body){
                                console.log("hello2");
                                let jsonObj = JSON.parse(httpResponse.body.toString());
                                let obj: User = Object.assign(User, jsonObj);
                                console.log("hello3");
                                return AppActions.loginRequestSuccess({user: obj});
                            }
                        } catch (error){
                            console.log(error);
                        }
                    }
                    console.log("Login failed.");
                    return AppActions.loginRequestFailure({error: "Login failed."});
                }))
            })
        )
    })

    loginRequestSuccess$ = createEffect(() =>
    this.actions$.pipe(
            ofType(AppActions.loginRequestSuccess),
            tap(({user}) => {
                console.log("hello");
                console.log(user);
                this.storageService.saveUser(user);
            })
        ),
        {dispatch: false}
    );

    loginRequestFailure$ = createEffect(() =>
    this.actions$.pipe(
            ofType(AppActions.loginRequestFailure),
            tap(({error}) => {
                console.log(error);
                this.modalService.open('bad-request-modal');
            })
        ),
        {dispatch: false}
    );

    constructor(private actions$: Actions, private httpService: HttpService, private authService: AuthService, private modalService: ModalService, private storageService: StorageService) {}
}