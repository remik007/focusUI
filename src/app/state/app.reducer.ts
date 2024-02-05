import { Action, createReducer, on } from "@ngrx/store";
import { IAppState } from "./app.state";
import * as Actions from "./app.actions";
import { TripCategory } from "../models/tripcategory.model";
import { Trip } from "../models/trip.model";
import { TransportType } from "../models/transporttype.model";
import { SubPage } from "../models/subpage.model";

export const initialState: IAppState = {
    tripCategories: new Array<TripCategory>(),
    transportTypes: new Array<TransportType>(),
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
    currentTripCategory: new TripCategory(),
    currentTrip: {
        id: -1,
        name: '',
        shortName: '',
        shortDescription: '',
        description: '',
        prize: '',
        oldPrize: '',
        availableSeats: -1,
        currentAvailableSeats: -1,
        transportType: new TransportType(),
        tripCategory: new TripCategory(),
        transportTypeId: -1,
        tripCategoryId: -1,
        from: new Date(),
        to: new Date(),
        isEnabled: false,
        isDeleted: false,
        imageContent: '',
        imageName: ''
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
        state.tripCategories.push(...action.tripCategories);
        return {
            ...state
        };
    }),

    on(Actions.getTransportTypesSuccess, (state, action) => {
        state.transportTypes.push(...action.transportTypes);
        return {
            ...state
        };
    }),

    on(Actions.getTripCategoryRequestSuccess, (state, action) => {
        
        return {
            ...state,
            currentTripCategory: action.tripCategory
        };
    }),

    on(Actions.getSubPagesRequestSuccess, (state, action) => {
        state.subPages.push(...action.subPages);
        return {
            ...state
        };
    }),

    on(Actions.getTripAdminRequestSuccess, (state, action) => {
        return {
            ...state,
            currentTrip: action.trip
        };
    }),

    on(Actions.getTripRequestSuccess, (state, action) => {
        return {
            ...state,
            currentTrip: action.trip
        };
    }),
);


export function AppReducer(state: IAppState | undefined, action: Action){
    return _reducer(state, action);
}