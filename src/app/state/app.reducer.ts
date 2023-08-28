import { Action, createReducer, on } from "@ngrx/store";
import { IAppState } from "./app.state";
import * as Actions from "./app.actions";
import { TripType } from "../models/triptype.model";
import { Trip } from "../models/trip.model";

export const initialState: IAppState = {
    tripsTypes: new Array<TripType>(),
    contact: {
        name: '',
        addressLine1: '',
        addressLine2: '',
        phoneNumber: '',
        email: '',
        facebook: '',
        instagram: '',
        google: ''
    },
    currentCategoryTrips: {
        trips: new Array<Trip>(),
        categoryName: ''
    },
    currentTrip: {
        id: '',
        name: '',
        shortDescription: '',
        description: '',
        prize: '',
        newPrize: '',
        imageUrls: new Array<string>()
    },
    about: {
        id: '',
        name: '',
        shortDescription: '',
        description: '',
        imageUrl: ''
    },
    workshops: {
        id: '',
        name: '',
        shortDescription: '',
        description: '',
        imageUrl: ''
    }
}

const _reducer = createReducer(
    initialState,
    on(Actions.getTripTypesSuccess, (state, action) => {
        return {
            ...state,
            tripsTypes: action.tripTypes
        }
    })
)

export function AppReducer(state: IAppState | undefined, action: Action){
    return _reducer(state, action);
}