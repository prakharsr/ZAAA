import { Injectable } from '@angular/core';
import { AuthTokenManager } from 'app/services/auth-token-manager.service';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { MediaHouseApiService, MediaHouse } from '../directory';

@Injectable()
export class SuperAdminApiService {
  private authTokenKey = "super_admin_auth_token";

  get isLoggedIn() : boolean {
    return this.authTokenManager.isLoggedIn(this.authTokenKey);
  }

  constructor(private authTokenManager: AuthTokenManager,
    private mediaHouseApi: MediaHouseApiService) { }

  private makeUrl(url: string) {
    return environment.adminApiUrl + url;
  }

  post(url: string, body: any, extra = {}) {
    return this.authTokenManager.post(this.makeUrl(url), body, this.authTokenKey, extra);
  }

  patch(url: string, body: any) {
    return this.authTokenManager.patch(this.makeUrl(url), body, this.authTokenKey);
  }

  get(url: string) {
    return this.authTokenManager.get(this.makeUrl(url), this.authTokenKey);
  }

  delete(url: string) {
    return this.authTokenManager.delete(this.makeUrl(url), this.authTokenKey);
  }

  fileUpload(url: string, key: string, fileToUpload: File) {
    return this.authTokenManager.fileUpload(this.makeUrl(url), key, fileToUpload, this.authTokenKey);
  }

  signup(name: string, email: string, password: string) : Observable<any>
  {
    const base = this.post('/signup', {
      name: name,
      email: email,
      password: password
    });

    return this.extractToken(base);
  }

  login(emailOrPhone: string, password: string): Observable<any> {
    
    let base : Observable<any>;

    if (emailOrPhone.indexOf('@') != -1) {
      base = this.post("/login", { email: emailOrPhone, password: password });
    }
    else base = this.post("/login", { phone: emailOrPhone, password: password });

    return this.extractToken(base);
  }

  private extractToken(base: Observable<any>) : Observable<any> {
    return base.pipe(
      map(data => {
        if (data.success) {
          this.authTokenManager.setAuthToken(this.authTokenKey, data.token);

          data.token = '';
        }

        return data;
      })
    );
  }

  createGlobalMediaHouse(mediaHouse: MediaHouse) {
    return this.post('/globalmediahouse/create', this.mediaHouseApi.createPostArgs(mediaHouse));
  }

  updateGlobalMediaHouse(mediaHouse: MediaHouse) {
    return this.post('/globalmediahouse/update', this.mediaHouseApi.editPostArgs(mediaHouse));
  }
}
