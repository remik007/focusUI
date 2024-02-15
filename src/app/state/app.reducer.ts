import { Action, createReducer, on } from "@ngrx/store";
import { IAppState } from "./app.state";
import * as Actions from "./app.actions";
import { TripCategory } from "../models/tripcategory.model";
import { Trip } from "../models/trip.model";
import { TransportType } from "../models/transporttype.model";
import { SubPage } from "../models/subpage.model";
import { Image } from "../models/image.model";

export const initialState: IAppState = {
    tripCategories: new Array<TripCategory>(),
    transportTypes: new Array<TransportType>(),
    contact: {
        name: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        zipCode: '',
        phoneNumber: '',
        email: '',
        facebook: '',
        instagram: '',
        google: ''
    },
    currentTripCategory: new TripCategory(),
    currentTrip: {
        id: undefined,
        name: '',
        shortName: '',
        country: '',
        departureCity: '',
        shortDescription: '',
        description: '',
        hotel: '',
        hotelStars: '',
        meals: '',
        prize: '',
        oldPrize: '',
        availableSeats: 0,
        currentAvailableSeats: undefined,
        transportType: undefined,
        tripCategory:  undefined,
        transportTypeId: -1,
        tripCategoryId: -1,
        from: new Date(),
        to: new Date(),
        isEnabled: false,
        isDeleted: false,
        isHighlighted: false,
        imageContent: '',
        imageName: ''
    },
    subPages: new Array<SubPage>(),
    currentSubPage: {
        id: undefined,
        shortName: '',
        name: '',
        shortDescription: '',
        description: '',
        imageName: '',
        imageContent: ''
    },
    countries: new Array<string>(),
    departureCities: new Array<string>(),
    highlightedTrips: new Array<Trip>(),
    highlightedImages: new Array<Image>(),
    currentTripCategoryImages: new Array<Image>(),
    currentTripImage: {},
    currentSubPageImage: {}
}

const _reducer = createReducer(
    initialState,

    on(Actions.getHeaderDataSuccess, (state, action) => {
        state.tripCategories = [];
        state.transportTypes = [];
        state.subPages = [];
        state.countries = [];
        state.departureCities = [];
        state.transportTypes.push(...action.header.transportTypes);
        state.tripCategories.push(...action.header.tripCategories);
        state.countries.push(...action.header.countries);
        state.departureCities.push(...action.header.departureCities);
        state.subPages.push(...action.header.subPages);
        return {
            ...state,
            contact: action.header.contactDetails
        };
    }),

    on(Actions.getTripCategoriesSuccess, (state, action) => {
        state.tripCategories = [];
        state.tripCategories.push(...action.tripCategories);
        return {
            ...state
        };
    }),

    on(Actions.getTransportTypesSuccess, (state, action) => {
        state.transportTypes = [];
        state.transportTypes.push(...action.transportTypes);
        return {
            ...state
        };
    }),
    
    on(Actions.getSubPageDetailsRequestSuccess, (state, action) => {
        
        return {
            ...state,
            currentSubPage: action.subPage
        };
    }),

    on(Actions.getTripCategoryRequestSuccess, (state, action) => {
        
        return {
            ...state,
            currentTripCategory: action.tripCategory
        };
    }),

    on(Actions.getSubPagesRequestSuccess, (state, action) => {
        state.subPages = [];
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

    on(Actions.getHighlightedTripsSuccess, (state, action) => {
        return {
            ...state,
            highlightedTrips: action.highlightedTrips
        };
    }),

    on(Actions.getHighlightedImagesSuccess, (state, action) => {
        return {
            ...state,
            highlightedImages: action.images
        };
    }),

    on(Actions.getCategoryImagesSuccess, (state, action) => {
        return {
            ...state,
            currentTripCategoryImages: action.images
        };
    }),

    on(Actions.getTripImageSuccess, (state, action) => {
        return {
            ...state,
            currentTripImage: action.image
        };
    }),

    on(Actions.getTripImageAdminSuccess, (state, action) => {
        return {
            ...state,
            currentTripImage: action.image
        };
    }),

    on(Actions.getSubPageImageSuccess, (state, action) => {
        return {
            ...state,
            currentSubPageImage: action.image
        };
    }),
);


export function AppReducer(state: IAppState | undefined, action: Action){
    return _reducer(state, action);
}