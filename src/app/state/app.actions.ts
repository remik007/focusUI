import { createAction, props } from "@ngrx/store";
import { TripCategory } from "../models/tripcategory.model";
import { Trip } from "../models/trip.model";
import { SubPage } from "../models/subpage.model";
import { Contact } from "../models/contact.model";

export const getTripCategoriesRequest = createAction(
    '[Get] Get trip types request'
);

export const getTripCategoriesSuccess = createAction(
    '[Get] Get trip types request success',
    props<{tripCategories: TripCategory[]}>()
);

export const getTripCategoriesFailure = createAction(
    '[Get] Get trip types request failure',
    props<{error: string}>()
);

export const getTripsRequest = createAction(
    '[Get] Get trips request',
    props<{categoryName: string}>()
);

export const getTripsRequestSuccess = createAction(
    '[Get] Get trips request success',
    props<{trips: Trip[]}>()
);

export const getTripsRequestFailure = createAction(
    '[Get] Get trips request failure',
    props<{error: string}>()
);

export const getTripRequest = createAction(
    '[Get] Get trip request',
    props<{tripId: string}>()
);

export const getTripRequestSuccess = createAction(
    '[Get] Get trip request success',
    props<{trip: Trip}>()
);

export const getTripRequestFailure = createAction(
    '[Get] Get trip request failure',
    props<{error: string}>()
);

export const getContactDetailsRequest = createAction(
    '[Get] Get contact details request'
);

export const getContactDetailsRequestSuccess = createAction(
    '[Get] Get contact details request success',
    props<{trips: Contact}>()
);

export const getContactDetailsRequestFailure = createAction(
    '[Get] Get contact details request failure',
    props<{error: string}>()
);

export const getSubPageDetailsRequest = createAction(
    '[Get] Get sub page details request'
);

export const getSubPageDetailsRequestSuccess = createAction(
    '[Get] Get sub page details request success',
    props<{trips: SubPage}>()
);

export const getSubPageDetailsRequestFailure = createAction(
    '[Get] Get sub page details request failure',
    props<{error: string}>()
);

export const getSubPagesRequest = createAction(
    '[Get] Get sub pages request'
);

export const getSubPagesRequestSuccess = createAction(
    '[Get] Get sub pages request success',
    props<{trips: SubPage[]}>()
);

export const getSubPagesRequestFailure = createAction(
    '[Get] Get sub pages request failure',
    props<{error: string}>()
);