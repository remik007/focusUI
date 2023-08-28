import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: 'root'
})
export class HttpService{
    constructor(private http: HttpClient){}

    getTripTypes(): Observable<HttpResponse<Object>>{
        //return this.http.get(environment.getTripTypesUrl, {responseType: 'text' as 'json', observe: 'response'});
        let test = new HttpResponse<Object>({status: 200, body: "[{\"id\":\"1\", \"name\":\"test1\"}, {\"id\":\"2\", \"name\":\"test2\"}]"});
        return of(test);
    }
}