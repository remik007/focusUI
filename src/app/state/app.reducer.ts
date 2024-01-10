import { Action, createReducer, on } from "@ngrx/store";
import { IAppState } from "./app.state";
import * as Actions from "./app.actions";
import { TripCategory } from "../models/tripcategory.model";
import { Trip } from "../models/trip.model";
import { TransportType } from "../models/transporttype.model";
import { SubPage } from "../models/subpage.model";

export const initialState: IAppState = {
    tripCategories: new Array<TripCategory>(),
    kupa: '',
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
    currentTripCategory: {
        trips: new Array<Trip>(),
        categoryName: ''
    },
    currentTrip: {
        id: '',
        name: '',
        shortName: '',
        shortDescription: '',
        description: '',
        prize: '',
        oldPrize: '',
        availableSeats: 0,
        currentAvailableSeats: 0,
        transportType: new TransportType(),
        tripCategory: new TripCategory(),
        from: new Date(),
        to: new Date(),
        isEnabled: false,
        isDeleted: false,
        imageUrls: new Array<string>()
    },
    subPages: new Array<SubPage>(),
    currentSubPage: {
        id: '',
        shortName: '',
        name: '',
        shortDescription: '',
        description: '',
        imageUrl: ''
    }
}

const _reducer = createReducer(
    initialState,

    on(Actions.getTripCategoriesSuccess, (state, action) => {
        
        return {
            ...state,
            tripsCategories: state.tripCategories.push(...action.tripCategories)
        };
    }),

    on(Actions.getSubPagesRequestSuccess, (state, action) => {
        
        return {
            ...state,
            tripsCategories: state.subPages.push(...action.subPages)
        };
    })
);


export function AppReducer(state: IAppState | undefined, action: Action){
    return _reducer(state, action);
}