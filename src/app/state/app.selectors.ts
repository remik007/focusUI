import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "./app.state";

export const selectTripsFeature = createFeatureSelector<IAppState>('AppReducer');
export const selectTripTypes = createSelector(selectTripsFeature, state => state.tripsTypes);
export const selectContactDetails = createSelector(selectTripsFeature, state => state.contact);
export const selectAboutDetails = createSelector(selectTripsFeature, state => state.about);
export const selectTripDetails = createSelector(selectTripsFeature, state => state.currentTrip);
export const selectCurrentCategoryTrips = createSelector(selectTripsFeature, state => state.currentCategoryTrips);