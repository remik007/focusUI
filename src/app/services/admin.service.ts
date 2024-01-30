import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environment/environment";
import { Trip } from "../models/trip.model";

@Injectable({
    providedIn: 'root'
})
export class AdminService{
    constructor(private http: HttpClient){}

    addTrip(trip: Trip): Observable<HttpResponse<Object>>{
        return this.http.post(environment.addTripUrl, trip, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "{\"email\":\"test@email.com\",\"accessToken\":\"testAccessToken\", \"refreshToken\":\"testRefreshToken\"}", \"Expiration\":\"expirationDate\"});
        //return of(test);
    }
}