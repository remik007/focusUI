import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AppActions from './app.actions';
import { exhaustMap, map } from "rxjs";
import { HttpService } from "../services/http.service";
import { TripType } from "../models/triptype.model";

@Injectable()
export class AppEffects {
    getTripTypesRequest$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AppActions.getTripTypesRequest),
            exhaustMap((/*parameter*/) => {
                
                return this.httpService
                .getTripTypes()
                .pipe(map((getTripTypesResponse) =>{
                    if(getTripTypesResponse.status == 200){
                        try{
                            if(getTripTypesResponse.body){
                                let tripTypesJson = JSON.parse(getTripTypesResponse.body.toString());
                                let tripTypes: TripType[] = Object.assign(new Array<TripType>(), tripTypesJson);
                                return AppActions.getTripTypesSuccess({tripTypes: tripTypes});
                            }
                        } catch (error){
                            console.log(error);
                        }
                    }
                    console.log("Get trip types request failed.");
                    return AppActions.getTripTypesFailure({error: "Get trip types request failed."});
                }))
            })
        )
    })
    constructor(private actions$: Actions, private httpService: HttpService) {}
}