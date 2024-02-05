import { IDropdown } from "./dropdown.interface";
import { Trip } from "./trip.model";

export class TripCategory implements IDropdown{
    public id!: number;
    public name!: string;
    public trips!: Trip[];
}