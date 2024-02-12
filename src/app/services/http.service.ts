import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environment/environment";
import { SubPage } from "../models/subpage.model";
import { Login } from "../models/login.model";
import { Search } from "../models/search.model";

@Injectable({
    providedIn: 'root'
})
export class HttpService{
    constructor(private http: HttpClient){}

    getHighlightedTrips(): Observable<HttpResponse<Object>>{
        return this.http.get(environment.getHighlightedTripsUrl, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "[{\"id\":\"1\", \"name\":\"test1\"}, {\"id\":\"2\", \"name\":\"test2\"}]"});
        //return of(test);
    }

    getHeaderData(): Observable<HttpResponse<Object>>{
        return this.http.get(environment.getHeaderDataUrl, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "[{\"id\":\"1\", \"name\":\"test1\"}, {\"id\":\"2\", \"name\":\"test2\"}]"});
        //return of(test);
    }
    getTripCategories(): Observable<HttpResponse<Object>>{
        return this.http.get(environment.getTripCategoriesUrl, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "[{\"id\":\"1\", \"name\":\"test1\"}, {\"id\":\"2\", \"name\":\"test2\"}]"});
        //return of(test);
    }

    getTransportTypes(): Observable<HttpResponse<Object>>{
        return this.http.get(environment.getTransportTypesUrl, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "[{\"id\":\"1\", \"name\":\"test1\"}, {\"id\":\"2\", \"name\":\"test2\"}]"});
        //return of(test);
    }

    getSubPages(): Observable<HttpResponse<Object>>{
        //return this.http.get(environment.getSubPagesUrl, {responseType: 'text' as 'json', observe: 'response'});
        let test = new HttpResponse<Object>({status: 200, body: "[{\"id\":\"1\", \"name\":\"test1\"}, {\"id\":\"2\", \"name\":\"test2\"}]"});
        return of(test);
    }

    getSubPage(subPageName: string): Observable<HttpResponse<Object>>{
        //return this.http.get(environment.getSubPageUrl+"/"+subPageName, {responseType: 'text' as 'json', observe: 'response'});
        let test = new HttpResponse<Object>({status: 200, body: "[{\"id\":\"1\", \"name\":\"test1\"}, {\"id\":\"2\", \"name\":\"test2\"}]"});
        return of(test);
    }

    getTrip(id: number): Observable<HttpResponse<Object>>{
        return this.http.get(environment.getTripUrl+"/"+id, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "[{\"id\":\"1\", \"name\":\"test1\"}, {\"id\":\"2\", \"name\":\"test2\"}]"});
        //return of(test);
    }



    getTripCategory(search: Search): Observable<HttpResponse<Object>>{
        if(search.country !== undefined || search.departureCity !== undefined || search.from !== undefined || search.to !== undefined || search.transportType !== undefined){
            let params = new HttpParams()
                .set('country', search.country)
                .set('departureCity', search.departureCity)
                .set('from', search.from)
                .set('to', search.to)
                .set('transportType', search.transportType);
            if(search.isAdmin){
                return this.http.get(environment.getSearchAdminUrl, {params: params, responseType: 'text' as 'json', observe: 'response'});
            }
            return this.http.get(environment.getSearchUrl, {params: params, responseType: 'text' as 'json', observe: 'response'});
        }
        else if(search.isAdmin){
            return this.http.get(environment.getTripCategoryAdminUrl+"/"+search.category, {responseType: 'text' as 'json', observe: 'response'});
        }
        return this.http.get(environment.getTripCategoryUrl+"/"+search.category, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "[{\"id\":\"1\", \"name\":\"test1\"}, {\"id\":\"2\", \"name\":\"test2\"}]"});
        //return of(test);
    }

    getContactDetails(): Observable<HttpResponse<Object>>{
        //return this.http.get(environment.getContactDetailsUrl, {responseType: 'text' as 'json', observe: 'response'});
        let test = new HttpResponse<Object>({status: 200, body: "[{\"id\":\"1\", \"name\":\"test1\"}, {\"id\":\"2\", \"name\":\"test2\"}]"});
        return of(test);
    }

}