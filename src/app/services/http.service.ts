import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environment/environment";
import { SubPage } from "../models/subpage.model";
import { Login } from "../models/login.model";

@Injectable({
    providedIn: 'root'
})
export class HttpService{
    constructor(private http: HttpClient){}

    getTripCategories(): Observable<HttpResponse<Object>>{
        //return this.http.get(environment.getTripCategoriesUrl, {responseType: 'text' as 'json', observe: 'response'});
        let test = new HttpResponse<Object>({status: 200, body: "[{\"id\":\"1\", \"name\":\"test1\"}, {\"id\":\"2\", \"name\":\"test2\"}]"});
        return of(test);
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
        //return this.http.get(environment.getTripUrl+"/"+id, {responseType: 'text' as 'json', observe: 'response'});
        let test = new HttpResponse<Object>({status: 200, body: "[{\"id\":\"1\", \"name\":\"test1\"}, {\"id\":\"2\", \"name\":\"test2\"}]"});
        return of(test);
    }

    getTripCategory(categoryName: string): Observable<HttpResponse<Object>>{
        //return this.http.get(environment.getTripsUrl+"/"+categoryName, {responseType: 'text' as 'json', observe: 'response'});
        let test = new HttpResponse<Object>({status: 200, body: "[{\"id\":\"1\", \"name\":\"test1\"}, {\"id\":\"2\", \"name\":\"test2\"}]"});
        return of(test);
    }

    getContactDetails(): Observable<HttpResponse<Object>>{
        //return this.http.get(environment.getContactDetailsUrl, {responseType: 'text' as 'json', observe: 'response'});
        let test = new HttpResponse<Object>({status: 200, body: "[{\"id\":\"1\", \"name\":\"test1\"}, {\"id\":\"2\", \"name\":\"test2\"}]"});
        return of(test);
    }

}