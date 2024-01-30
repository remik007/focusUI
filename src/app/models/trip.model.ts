import { TransportType } from "./transporttype.model";
import { TripCategory } from "./tripcategory.model";

export class Trip {
    public id!: string;
    public name!: string;
    public shortName!: string;
    public description!: string;
    public shortDescription!: string;
    public prize!: string;
    public oldPrize!: string;
    public availableSeats!: number;
    public currentAvailableSeats!: number;
    public transportTypeId!: string;
    public transportType!: TransportType;
    public tripCategoryId!: string;
    public tripCategory!: TripCategory;
    public from!: Date;
    public to!: Date;
    public isEnabled!: boolean;
    public isDeleted!: boolean;
    public imageUrl!: string;
    //public reservations!: Reservation[];
}