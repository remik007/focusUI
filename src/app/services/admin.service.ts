import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environment/environment";
import { Trip } from "../models/trip.model";
import { SubPage } from "../models/subpage.model";
import { TripCategory } from "../models/tripcategory.model";
import { Contact } from "../models/contact.model";

@Injectable({
    providedIn: 'root'
})
export class AdminService{
    constructor(private http: HttpClient){}

    addTrip(trip: Trip): Observable<HttpResponse<Object>>{
        return this.http.post(environment.tripAdminUrl, trip, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "{\"email\":\"test@email.com\",\"accessToken\":\"testAccessToken\", \"refreshToken\":\"testRefreshToken\"}", \"Expiration\":\"expirationDate\"});
        //return of(test);
    }

    getTrip(tripId: number): Observable<HttpResponse<Object>>{
        return this.http.get(environment.tripAdminUrl+tripId, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "{\"email\":\"test@email.com\",\"accessToken\":\"testAccessToken\", \"refreshToken\":\"testRefreshToken\"}", \"Expiration\":\"expirationDate\"});
        //return of(test);
    }

    getTripImage(tripId: number): Observable<HttpResponse<Object>>{
        return this.http.get(environment.tripImageAdminUrl+tripId, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "{\"email\":\"test@email.com\",\"accessToken\":\"testAccessToken\", \"refreshToken\":\"testRefreshToken\"}", \"Expiration\":\"expirationDate\"});
        //return of(test);
    }

    getSubPage(subPageName: string): Observable<HttpResponse<Object>>{
        return this.http.get(environment.subpageAdminUrl+"/"+subPageName, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "[{\"id\":\"1\", \"name\":\"test1\"}, {\"id\":\"2\", \"name\":\"test2\"}]"});
        //return of(test);
    }

    updateTrip(trip: Trip): Observable<HttpResponse<Object>>{
        return this.http.put(environment.tripAdminUrl, trip, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "{\"email\":\"test@email.com\",\"accessToken\":\"testAccessToken\", \"refreshToken\":\"testRefreshToken\"}", \"Expiration\":\"expirationDate\"});
        //return of(test);
    }

    addSubPage(subpage: SubPage): Observable<HttpResponse<Object>>{
        return this.http.post(environment.subpageAdminUrl, subpage, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "{\"email\":\"test@email.com\",\"accessToken\":\"testAccessToken\", \"refreshToken\":\"testRefreshToken\"}", \"Expiration\":\"expirationDate\"});
        //return of(test);
    }

    updateSubPage(subpage: SubPage): Observable<HttpResponse<Object>>{
        return this.http.put(environment.subpageAdminUrl, subpage, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "{\"email\":\"test@email.com\",\"accessToken\":\"testAccessToken\", \"refreshToken\":\"testRefreshToken\"}", \"Expiration\":\"expirationDate\"});
        //return of(test);
    }

    addCategory(category: TripCategory): Observable<HttpResponse<Object>>{
        return this.http.post(environment.categoryAdminUrl, category, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "{\"email\":\"test@email.com\",\"accessToken\":\"testAccessToken\", \"refreshToken\":\"testRefreshToken\"}", \"Expiration\":\"expirationDate\"});
        //return of(test);
    }

    updateCategory(category: TripCategory): Observable<HttpResponse<Object>>{
        return this.http.put(environment.categoryAdminUrl, category, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "{\"email\":\"test@email.com\",\"accessToken\":\"testAccessToken\", \"refreshToken\":\"testRefreshToken\"}", \"Expiration\":\"expirationDate\"});
        //return of(test);
    }

    updateContactDetails(contact: Contact): Observable<HttpResponse<Object>>{
        return this.http.put(environment.contactAdminUrl, contact, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "{\"email\":\"test@email.com\",\"accessToken\":\"testAccessToken\", \"refreshToken\":\"testRefreshToken\"}", \"Expiration\":\"expirationDate\"});
        //return of(test);
    }

    deleteCategory(categoryName: string): Observable<HttpResponse<Object>>{
        return this.http.delete(environment.deleteCategoryAdminUrl + categoryName, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "{\"email\":\"test@email.com\",\"accessToken\":\"testAccessToken\", \"refreshToken\":\"testRefreshToken\"}", \"Expiration\":\"expirationDate\"});
        //return of(test);
    }

    deleteSubpage(subpageName: string): Observable<HttpResponse<Object>>{
        return this.http.delete(environment.deleteSubPageAdminUrl + "/"+ subpageName, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "{\"email\":\"test@email.com\",\"accessToken\":\"testAccessToken\", \"refreshToken\":\"testRefreshToken\"}", \"Expiration\":\"expirationDate\"});
        //return of(test);
    }

    deleteTrip(tripId: number): Observable<HttpResponse<Object>>{
        return this.http.delete(environment.deleteTripAdminUrl + tripId, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "{\"email\":\"test@email.com\",\"accessToken\":\"testAccessToken\", \"refreshToken\":\"testRefreshToken\"}", \"Expiration\":\"expirationDate\"});
        //return of(test);
    }
}