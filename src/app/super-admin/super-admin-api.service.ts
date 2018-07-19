import { Injectable } from '@angular/core';
import { AuthTokenManager } from 'app/services/auth-token-manager.service';

@Injectable()
export class SuperAdminApiService {
  private authTokenKey = "super_admin_auth_token";

  get isLoggedIn() : boolean {
    return this.authTokenManager.isLoggedIn(this.authTokenKey);
  }

  constructor(private authTokenManager: AuthTokenManager) { }

  post(url: string, body: any, extra = {}) {
    return this.authTokenManager.post(url, body, this.authTokenKey, extra);
  }

  patch(url: string, body: any) {
    return this.authTokenManager.patch(url, body, this.authTokenKey);
  }

  get(url: string) {
    return this.authTokenManager.get(url, this.authTokenKey);
  }

  delete(url: string) {
    return this.authTokenManager.delete(url, this.authTokenKey);
  }

  fileUpload(url: string, key: string, fileToUpload: File) {
    return this.authTokenManager.fileUpload(url, key, fileToUpload, this.authTokenKey);
  }
}
