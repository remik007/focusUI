import { createAction, props } from "@ngrx/store";
import { TripType } from "../models/triptype.model";

export const getTripTypesRequest = createAction(
    '[Get] Get trip types request'
);

export const getTripTypesSuccess = createAction(
    '[Get] Get trip types request success',
    props<{tripTypes: TripType[]}>()
);

export const getTripTypesFailure = createAction(
    '[Get] Get trip types request failure',
    props<{error: string}>()
);

export const getTripsRequest = createAction(
    '[Get] Get trips request',
    props<{categoryName: string}>()
);

export const getTripRequest = createAction(
    '[Get] Get trip request',
    props<{tripId: string}>()
);

export const getContactDetailsRequest = createAction(
    '[Get] Get contact details request'
);

export const getWorkshopsDetailsRequest = createAction(
    '[Get] Get workshops details request'
);