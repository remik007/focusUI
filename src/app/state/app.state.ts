import { Contact } from "../models/contact.model";
import { SubPage } from "../models/subpage.model";
import { Trip } from "../models/trip.model";
import { TripCategory } from "../models/tripcategory.model";

export interface IAppState{
    tripCategories: TripCategory[];
    currentTripCategory: {
        trips: Trip[],
        categoryName: string;
    };
    contact: Contact;
    currentTrip: Trip;
    subPages: SubPage[];
    currentSubPage: SubPage;
}