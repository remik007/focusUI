import { Contact } from "../models/contact.model";
import { SubPage } from "../models/subpage.model";
import { TransportType } from "../models/transporttype.model";
import { Trip } from "../models/trip.model";
import { TripCategory } from "../models/tripcategory.model";

export interface IAppState{
    tripCategories: Array<TripCategory>;
    transportTypes: Array<TransportType>;
    currentTripCategory: TripCategory;
    contact: Contact;
    currentTrip: Trip;
    subPages: Array<SubPage>;
    currentSubPage: SubPage;
    countries: Array<string>;
    departureCities: Array<string>;
}