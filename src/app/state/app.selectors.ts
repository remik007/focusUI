import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "./app.state";

export const selectTripsFeature = createFeatureSelector<IAppState>('AppReducer');
export const selectTripCategories = createSelector(selectTripsFeature, state => state.tripCategories);
export const selectContactDetails = createSelector(selectTripsFeature, state => state.contact);
export const selectSubPages = createSelector(selectTripsFeature, state => state.subPages);
export const selectCurrentSubPageDetails = createSelector(selectTripsFeature, state => state.currentSubPage);
export const selectTripDetails = createSelector(selectTripsFeature, state => state.currentTrip);
export const selectCurrentTripCategory = createSelector(selectTripsFeature, state => state.currentTripCategory);