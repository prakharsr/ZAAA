import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "./loader.service";
import { NotificationService } from "./notification.service";
import { Observable } from "rxjs/Observable";
import { retry } from "rxjs/operators";
import { environment } from "environments/environment";

@Injectable()
export class AuthTokenManager {
  constructor(private http: HttpClient,
    private loaderService: LoaderService,
    private notifications: NotificationService) { }

  getAuthToken(authTokenKey: string) : string {
    return localStorage.getItem(authTokenKey);
  }

  isLoggedIn(authTokenKey: string) : boolean {
    if (this.getAuthToken(authTokenKey))
      return true;
      
    return false;
  }

  setAuthToken(authTokenKey: string, authToken: string) {
    if (!authToken) {
      localStorage.removeItem(authTokenKey);
    }
    else {
      localStorage.setItem(authTokenKey, authToken);
    }
  }

  getHeaders(authTokenKey: string) {
    return { headers: { Authorization: this.getAuthToken(authTokenKey) }};
  }

  // ----------- REQUEST ------------------------

  private apply(obj: Observable<any>) {
    return obj.pipe(
      retry(2)
    ).catch(err => {
      console.log(err);

      this.notifications.show('Connection to ther server failed!');

      return Observable.throw(err);
    })
    .finally(() => this.loaderService.hide())  
  }

  post(url: string, body: any, authTokenKey: string, extra = {}) : Observable<any> {

    this.loaderService.show();

    if (this.getAuthToken(authTokenKey))
    {
        return this.apply(this.http.post(environment.apiUrl + url, body, {
          ...this.getHeaders(authTokenKey),
          ...extra
        }));
    }
    else {
      return this.apply(this.http.post(environment.apiUrl + url, body));
    }
  }

  patch(url: string, body: any, authTokenKey: string) : Observable<any> {

    this.loaderService.show();

    if (this.getAuthToken(authTokenKey))
    {
        return this.apply(this.http.patch(environment.apiUrl + url, body, this.getHeaders(authTokenKey)));
    }
    else {
      return this.apply(this.http.patch(environment.apiUrl + url, body));
    }
  }

  get(url: string, authTokenKey: string) : Observable<any> {
    
    this.loaderService.show();

    if (this.getAuthToken(authTokenKey))
    {
        return this.apply(this.http.get(environment.apiUrl + url, this.getHeaders(authTokenKey)));
    }
    else {
      return this.apply(this.http.get(environment.apiUrl + url));
    }
  }

  delete(url: string, authTokenKey: string) : Observable<any> {

    this.loaderService.show();

    return this.apply(this.http.delete(environment.apiUrl + url, this.getHeaders(authTokenKey)));
  }

  fileUpload(url: string, key: string, fileToUpload: File, authTokenKey: string) : Observable<any> {

    this.loaderService.show();

    const formData = new FormData();
    formData.append(key, fileToUpload, fileToUpload.name);

    return this.apply(this.http.post(environment.apiUrl + url, formData, this.getHeaders(authTokenKey)));
  }
}