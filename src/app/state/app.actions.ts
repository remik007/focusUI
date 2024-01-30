import { createAction, props } from "@ngrx/store";
import { TripCategory } from "../models/tripcategory.model";
import { Trip } from "../models/trip.model";
import { SubPage } from "../models/subpage.model";
import { Contact } from "../models/contact.model";
import { Login } from "../models/login.model";
import { User } from "../models/user.model";
import { TransportType } from "../models/transporttype.model";

export const getTripCategoriesRequest = createAction(
    '[Get] Get trip categories request'
);

export const getTripCategoriesSuccess = createAction(
    '[Get] Get trip categories request success',
    props<{tripCategories: TripCategory[]}>()
);

export const getTripCategoriesFailure = createAction(
    '[Get] Get trip categories request failure',
    props<{error: string}>()
);

export const getTransportTypesRequest = createAction(
    '[Get] Get transport types request'
);

export const getTransportTypesSuccess = createAction(
    '[Get] Get transport types request success',
    props<{transportTypes: TransportType[]}>()
);

export const getTransportTypesFailure = createAction(
    '[Get] Get transport types request failure',
    props<{error: string}>()
);

export const getTripCategoryRequest = createAction(
    '[Get] Get trip category request',
    props<{categoryName: string}>()
);

export const getTripCategoryRequestSuccess = createAction(
    '[Get] Get trips request success',
    props<{tripCategory: TripCategory}>()
);

export const getTripCategoryRequestFailure = createAction(
    '[Get] Get trips request failure',
    props<{error: string}>()
);

export const getTripRequest = createAction(
    '[Get] Get trip request',
    props<{tripId: number}>()
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
    props<{contact: Contact}>()
);

export const getContactDetailsRequestFailure = createAction(
    '[Get] Get contact details request failure',
    props<{error: string}>()
);

export const getSubPageDetailsRequest = createAction(
    '[Get] Get sub page details request',
    props<{subPageName: string}>()
);

export const getSubPageDetailsRequestSuccess = createAction(
    '[Get] Get sub page details request success',
    props<{subPage: SubPage}>()
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
    props<{subPages: SubPage[]}>()
);

export const getSubPagesRequestFailure = createAction(
    '[Get] Get sub pages request failure',
    props<{error: string}>()
);

//SIGNING IN

export const loginRequest = createAction(
    '[Post] Login request',
    props<{loginDetails: Login}>()
)

export const loginRequestSuccess = createAction(
    '[Post] Login request success',
    props<{user: User}>()
)

export const loginRequestFailure = createAction(
    '[Post] Login request failure',
    props<{error: string}>()
)
