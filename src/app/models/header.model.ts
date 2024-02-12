import { Contact } from "./contact.model";
import { SubPage } from "./subpage.model";
import { TransportType } from "./transporttype.model";
import { TripCategory } from "./tripcategory.model";

export class Header {
    public transportTypes!: TransportType[];
    public tripCategories!: TripCategory[];
    public countries!: string[];
    public departureCities!: string[];
    public subPages!: SubPage[];
    public contactDetails!: Contact;
}