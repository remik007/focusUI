import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "./app.state";

export const selectTripsFeature = createFeatureSelector<IAppState>('AppReducer');
export const selectTripCategories = createSelector(selectTripsFeature, state => state.tripCategories);
export const selectCountries = createSelector(selectTripsFeature, state => state.countries);
export const selectDepartureCities = createSelector(selectTripsFeature, state => state.departureCities);
export const selectTransportTypes = createSelector(selectTripsFeature, state => state.transportTypes);
export const selectContactDetails = createSelector(selectTripsFeature, state => state.contact);
export const selectSubPages = createSelector(selectTripsFeature, state => state.subPages);
export const selectCurrentSubPageDetails = createSelector(selectTripsFeature, state => state.currentSubPage);
export const selectTripDetails = createSelector(selectTripsFeature, state => state.currentTrip);
export const selectCurrentTripCategory = createSelector(selectTripsFeature, state => state.currentTripCategory);
export const selectHighlightedTrips = createSelector(selectTripsFeature, state => state.highlightedTrips);
export const selectHighlightedImages = createSelector(selectTripsFeature, state => state.highlightedImages);
export const selectCategoryImages = createSelector(selectTripsFeature, state => state.currentTripCategoryImages);
export const selectCurrentTripImage = createSelector(selectTripsFeature, state => state.currentTripImage);
export const selectCurrentSubPageImage = createSelector(selectTripsFeature, state => state.currentSubPageImage);