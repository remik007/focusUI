import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environment/environment";
import { Login } from "../models/login.model";
import { Tokens } from "../models/tokens.model";
import { StorageService } from "./storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    constructor(private http: HttpClient, private storageService: StorageService){}

    login(loginDetails: Login): Observable<HttpResponse<Object>>{
        return this.http.post(environment.loginUrl, loginDetails, {responseType: 'text' as 'json', observe: 'response'});
        //let test = new HttpResponse<Object>({status: 200, body: "{\"email\":\"test@email.com\",\"accessToken\":\"testAccessToken\", \"refreshToken\":\"testRefreshToken\"}", \"Expiration\":\"expirationDate\"});
        //return of(test);
    }

    refreshToken(tokens: Tokens): Observable<HttpResponse<Object>>{
        //return this.http.post(environment.refreshTokenUrl, tokens, {responseType: 'text' as 'json', observe: 'response'});
        let test = new HttpResponse<Object>({status: 200, body: "{\"email\":\"test@email.com\",\"accessToken\":\"testAccessToken\", \"refreshToken\":\"testRefreshToken\", \"Expiration\":\"expirationDate\"}"});
        return of(test);
    }
    
    logout(): Observable<HttpResponse<Object>>{
        //return this.http.post(environment.loginUrl, {responseType: 'text' as 'json', observe: 'response'});
        console.log("test");
        this.storageService.clean();
        let test = new HttpResponse<Object>({status: 200});
        return of(test);
    }
}