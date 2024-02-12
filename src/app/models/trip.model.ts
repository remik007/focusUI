import { TransportType } from "./transporttype.model";
import { TripCategory } from "./tripcategory.model";

export class Trip {
    public id!: number;
    public name!: string;
    public shortName!: string;
    public country!: string;
    public departureCity!: string;
    public description!: string;
    public shortDescription!: string;
    public hotel!: string;
    public hotelStars!: string;
    public meals!: string;
    public prize!: string;
    public oldPrize!: string;
    public availableSeats!: number;
    public currentAvailableSeats!: number;
    public transportTypeId!: number;
    public transportType!: TransportType;
    public tripCategoryId!: number;
    public tripCategory!: TripCategory;
    public from!: Date;
    public to!: Date;
    public isEnabled!: boolean;
    public isDeleted!: boolean;
    public isHighlighted!: boolean;
    public imageContent!: string;
    public imageName!: string;
    //public reservations!: [];
}