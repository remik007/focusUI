import { createAction, props } from "@ngrx/store";
import { TripCategory } from "../models/tripcategory.model";
import { Trip } from "../models/trip.model";
import { SubPage } from "../models/subpage.model";
import { Contact } from "../models/contact.model";
import { Login } from "../models/login.model";
import { User } from "../models/user.model";
import { TransportType } from "../models/transporttype.model";
import { Header } from "../models/header.model";
import { Search } from "../models/search.model";
import { Image } from "../models/image.model";

export const getSubPageImageRequest = createAction(
    '[Get] Get subpage image request',
    props<{name: string}>()
);

export const getSubPageImageSuccess = createAction(
    '[Get] Get subpage image request success',
    props<{image: Image}>()
);

export const getTripImageRequest = createAction(
    '[Get] Get trip image request',
    props<{id: number}>()
);

export const getTripImageSuccess = createAction(
    '[Get] Get trip image request success',
    props<{image: Image}>()
);

export const getTripImageAdminRequest = createAction(
    '[Get] Get trip image admin request',
    props<{id: number}>()
);

export const getTripImageAdminSuccess = createAction(
    '[Get] Get category images request success',
    props<{image: Image}>()
);

export const getCategoryImagesRequest = createAction(
    '[Get] Get category images request',
    props<{search: Search}>()
);

export const getCategoryImagesSuccess = createAction(
    '[Get] Get category images request success',
    props<{images: Image[]}>()
);

export const getHighlightedImagesRequest = createAction(
    '[Get] Get highlighted images categories request'
);

export const getHighlightedImagesSuccess = createAction(
    '[Get] Get highlighted images request success',
    props<{images: Image[]}>()
);

export const getImagesFailure = createAction(
    '[Get] Get highlighted images request failure',
    props<{error: string}>()
);

export const getHighlightedTripsRequest = createAction(
    '[Get] Get highlighted trips categories request'
);

export const getHighlightedTripsSuccess = createAction(
    '[Get] Get highlighted trips request success',
    props<{highlightedTrips: Trip[]}>()
);

export const getHighlightedTripsFailure = createAction(
    '[Get] Get highlighted trips request failure',
    props<{error: string}>()
);

export const getHeaderDataRequest = createAction(
    '[Get] Get header data categories request'
);

export const getHeaderDataSuccess = createAction(
    '[Get] Get header data request success',
    props<{header: Header}>()
);

export const getHeaderDataFailure = createAction(
    '[Get] Get header data request failure',
    props<{error: string}>()
);

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
    props<{search: Search}>()
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

export const getTripAdminRequest = createAction(
    '[Get] Get trip admin request',
    props<{tripId: number}>()
);

export const getTripAdminRequestSuccess = createAction(
    '[Get] Get trip admin request success',
    props<{trip: Trip}>()
);

export const getTripAdminRequestFailure = createAction(
    '[Get] Get trip admin request failure',
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

export const getSubPageDetailsAdminRequest = createAction(
    '[Get] Get sub page details admin request',
    props<{subPageName: string}>()
);

export const getSubPageDetailsAdminRequestSuccess = createAction(
    '[Get] Get sub page details admin request success',
    props<{subPage: SubPage}>()
);

export const getSubPageDetailsAdminRequestFailure = createAction(
    '[Get] Get sub page details admin request failure',
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
