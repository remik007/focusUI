import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AppActions from './app.actions';
import { exhaustMap, map, tap } from "rxjs";
import { HttpService } from "../services/http.service";
import { TripCategory } from "../models/tripcategory.model";
import { ModalService } from "../components/_modal/modal.service";

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



    constructor(private actions$: Actions, private httpService: HttpService, private modalService: ModalService) {}
}