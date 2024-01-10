import { Trip } from "./trip.model";

export class TripCategory{
    public id!: string;
    public name!: string;
    public trips!: Trip[];
}