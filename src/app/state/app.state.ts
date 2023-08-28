import { Contact } from "../models/contact.model";
import { SubPage } from "../models/subpage.model";
import { Trip } from "../models/trip.model";
import { TripType } from "../models/triptype.model";

export interface IAppState{
    tripsTypes: TripType[];
    currentCategoryTrips: {
        trips: Trip[],
        categoryName: string;
    };
    contact: Contact;
    currentTrip: Trip;
    about: SubPage;
    workshops: SubPage;
}

