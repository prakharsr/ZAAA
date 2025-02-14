import { Injectable } from '@angular/core';
import { AuthTokenManager } from 'app/services/auth-token-manager.service';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { MediaHouse } from 'app/directory/media-houses/media-house';
import { MediaHouseApiService } from 'app/directory/media-houses/media-house-api.service';
import { AdCategory } from '../models/ad-category';
import { RateCard } from 'app/rate-card/rate-card';
import { RateCardApiService } from 'app/rate-card/rate-card-api.service';
import { Ticket, PageData } from '../models';

@Injectable()
export class SuperAdminApiService {
  private authTokenKey = "super_admin_auth_token";

  get isLoggedIn() : boolean {
    return this.authTokenManager.isLoggedIn(this.authTokenKey);
  }

  constructor(private authTokenManager: AuthTokenManager,
    private mediaHouseApi: MediaHouseApiService,
    private rateCardApi: RateCardApiService) { }

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
    return this.post('/signup', {
      name: name,
      email: email,
      password: password
    });
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

  createGlobalRateCard(rateCard: RateCard) {
    return this.post('/globalratecard/create', this.rateCardApi.createPostArgs(rateCard));
  }

  updateGlobalRateCard(rateCard: RateCard) {
    return this.post('/globalratecard/update', this.rateCardApi.editPostArgs(rateCard));
  }

  deleteGlobalRateCard(rateCard: RateCard) {
    return this.delete('/globalratecard/delete/' + rateCard.id);
  }

  getCategories(level: number, parent: AdCategory) : Observable<AdCategory[]> {
    return this.post('/category/list', {
      level: level,
      parent: parent == null ? '' : parent._id
    }).pipe(
      map(data => {
        let result: AdCategory[] = [];

        if (data.success) {
          result = data.categories;
        }

        return result;
      })
    );
  }

  createCategory(category: AdCategory) {
    return this.post('/category', category).pipe(
      map(data => {
        if (data.success) {
          category._id = data.category._id;
        }

        return data;
      })
    );
  }

  ticketStatus(ticket: Ticket, status: number) {
    return this.post('/ticket/status', {
      id: ticket._id,
      status: status
    }).pipe(
      map(data => {
        if (data.success) {
          ticket.status = status;
        }

        return data;
      })
    );
  }

  queryTickets(page: number, insertionPeriod: number, status: number) : Observable<PageData<Ticket>> {
    return this.post('/ticket/list', {
      insertionPeriod: insertionPeriod,
      page: page,
      status: status
    }).map(data => {
      let tickets: Ticket[] = [];

      if (data.success) {
        data.tickets.forEach(element => {
          let ticket = new Ticket();

          Object.assign(ticket, element);

          tickets.push(ticket);
        });
      }

      return new PageData<Ticket>(tickets, data.perPage, data.page, data.pageCount);
    });
  }

  get admins(): Observable<any[]> {
    return this.get('/admins').pipe(
      map(data => {
        let result = [];

        if (data.success) {
          result = data.admins;
        }

        return result;
      })
    );
  }

  sendNotification(title: string, body: string) {
    return this.post('/notifications/send', {
      title: title,
      notifBody: body
    });
  }
}
