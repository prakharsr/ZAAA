import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment';
import { BillingDetails } from 'app/components';

import {
  Template,
  Plan,
  UserProfile,
  Firm,
  Ticket,
  PageData
} from 'app/models';

import { AuthTokenManager } from './auth-token-manager.service';

@Injectable()
export class ApiService {
  private authTokenKey = "auth_token";

  get isLoggedIn() : boolean {
    return this.authTokenManager.isLoggedIn(this.authTokenKey);
  }

  constructor(private authTokenManager: AuthTokenManager) { }

  private makeUrl(url: string) {
    return environment.apiUrl + url;
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

  uploadProfilePicture(fileToUpload: File) : Observable<any> {
    return this.fileUpload("/user/image", "user", fileToUpload);
  }

  deleteProfilePicture() : Observable<any> {
    return this.delete('/user/image');
  }

  uploadSign(fileToUpload: File) : Observable<any> {
    return this.fileUpload("/user/sign", "sign", fileToUpload);
  }

  deleteSign() : Observable<any> {
    return this.delete('/user/sign');
  }
  
  uploadFirmLogo(fileToUpload: File) : Observable<any> {
    return this.fileUpload("/firm/logo", "logo", fileToUpload);
  }

  deleteFirmLogo() : Observable<any> {
    return this.delete('/firm/logo');
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

  signup(name: string, email: string) : Observable<any>
  {
    const base = this.post('/user/signup', {
      name: name,
      email: email
    });

    return this.extractToken(base);
  }

  login(emailOrPhone: string, password: string): Observable<any> {
    
    let base : Observable<any>;

    if (emailOrPhone.indexOf('@') != -1) {
      base = this.post("/user/login", { email: emailOrPhone, password: password });
    }
    else base = this.post("/user/login", { phone: emailOrPhone, password: password });

    return this.extractToken(base);
  }

  logout() {
    this.authTokenManager.setAuthToken(this.authTokenKey, '');
  }

  get plans() : Observable<any> {
    return this.get('/plans');
  }

  get templates() : Observable<Template[]> {
    return of([
      new Template("Template 1", "http://www.monsterbeatsstudio.us/download/20039/systemdesigndocument1.gif"),
      new Template("Template 2", "http://www.le-chuang.com/wp-content/uploads/2016/09/business-case-template-businesscase9-SUFOjh.jpg")
    ]);
  }

  setPlan(plan: Plan, payment: string, details: BillingDetails) : Observable<any> {

    return this.post('/user/plan', {
      planID: plan.id,
      cost: plan.cost,
      paymentID: payment,
      firmName: details.firmName,
      billingAddress: details.billingAddress,
      gstNo: details.GSTIN
    });
  }

  verifyOtp(otp: string) : Observable<any> {
    return this.post('/user/verify/mobile', { code: otp });
  }

  setTemplates(invoiceTemplate: Template,
    releaseOrderTemplate: Template,
    paymentReceiptTemplate: Template) {}

  setMobile(phone: string) : Observable<any> {
    return this.post('/user/mobile', { phone: phone });
  }

  getUser() : Observable<any> {
    return this.get('/user/profile');
  }

  private bodyToUser(data: any) {
    let profile = new UserProfile();

    profile.name = data.name;
    profile.designation = data.designation;
    profile.contact = data.phone;
    profile.email = data.email;

    if (data.photo) {
      profile.photo = environment.uploadsBaseUrl + data.photo;
    }

    if (data.signature) {
      profile.sign = environment.uploadsBaseUrl + data.signature;
    }

    profile.isAdmin = data.isAdmin;
    profile.id = data._id;
    
    return profile;
  }

  getUserProfile() : Observable<UserProfile> {
    return this.get('/user/profile').pipe(
      map(data => data.success ? this.bodyToUser(data.user) : new UserProfile())
    );
  }

  getFirmUsers() : Observable<UserProfile[]> {
    return this.get('/firm/users').pipe(
      map(data => {
        let result: UserProfile[] = [];

        if (data.success) {
          data.users.forEach(element => result.push(this.bodyToUser(element)));
        }

        return result;
      })
    );
  }

  setUserProfile(userProfile: UserProfile) : Observable<any> {
    return this.post('/user/profile', {
      name: userProfile.name,
      designation: userProfile.designation
    });
  }

  forgotPsw(email: string): Observable<any> {
    return this.post('/user/forgotPassword', {
      email: email
    });
  }

  resetPsw(token: string, password: string): Observable<any> {
    return this.post('/user/resetPassword', {
      token: token,
      password: password
    });
  }
  
  getFirm() : Observable<any> {
    return this.get('/firm/profile');
  }

  getFirmProfile() : Observable<Firm> {
    let base = this.get('/firm/profile');

    let result = base.pipe(
      map(data => {
        let profile = new Firm();

        if (data.success) {
          profile.name = data.firm.FirmName;
          profile.tagline = data.firm.TagLine;
          profile.nickname = data.firm.DisplayName;
          profile.fax = data.firm.Fax;
          profile.landlineNo = data.firm.Landline;
          profile.stdNo = data.firm.stdNo;
          profile.website = data.firm.Website;
          profile.panNo = data.firm.PanNo;

          if (data.firm.GSTIN)
            profile.GSTIN = data.firm.GSTIN;
          
          profile.OtherMobile = data.firm.OtherMobile;

          if (data.firm.RegisteredAddress)
            profile.registeredAddress = data.firm.RegisteredAddress;
          
          if (data.firm.OfficeAddress)
            profile.officeAddress = data.firm.OfficeAddress;

          profile.phone = data.firm.Mobile;
          profile.email = data.firm.Email;

          profile.incDate = data.firm.IncorporationDate;

          if (data.firm.LogoURL) {
            profile.logo = environment.uploadsBaseUrl + data.firm.LogoURL;
          }

          if (data.firm.BankDetails) {
            let bank = data.firm.BankDetails;

            profile.bankAccountName = bank.AccountName;
            profile.bankAccountNo = bank.AccountNo;
            profile.bankName = bank.BankName;
            profile.bankIfsc = bank.IFSC;
            profile.bankBranchAddress = bank.BranchAddress;
            profile.bankAccountType = bank.AccountType;
          }

          if (data.firm.Socials) {
            profile.facebook = data.firm.Socials.fb;
            profile.twitter = data.firm.Socials.twitter;
            profile.other = data.firm.Socials.Others;
          }
        }

        return profile;
      })
    );

    return result;
  }

  setFirmProfile(firm: Firm) : Observable<any> {
    return this.post('/firm/profile', {
      name: firm.name,
      tagline: firm.tagline,
      displayName: firm.nickname,
      registeredAddress: firm.registeredAddress,
      officeAddress: firm.officeAddress,
      fax: firm.fax,
      landline: firm.landlineNo,
      stdNo: firm.stdNo,
      website: firm.website,
      pan: firm.panNo,
      GSTIN: firm.GSTIN,
      OtherMobile: firm.OtherMobile,

      incorporationDate: firm.incDate,

      email: firm.email,
      mobile: firm.phone,

      accountName: firm.bankAccountName,
      accountNo: firm.bankAccountNo,
      ifsc: firm.bankIfsc,
      bankName: firm.bankName,
      bankAddress: firm.bankBranchAddress,
      accountType: firm.bankAccountType,

      fb: firm.facebook,
      twitter: firm.twitter,
      other: firm.other
    });
  }

  changePassword(oldPassword: string, newPassword: string) : Observable<any> {
    return this.post('/user/changePassword', {
      oldPassword: oldPassword,
      newPassword: newPassword
    });
  }

  generatePaymentInvoice() {
    return this.post('/user/plan/invoice', {});
  }

  createTicket(ticket: Ticket) {
    return this.post('/user/ticket', ticket);
  }

  queryTickets(page: number, insertionPeriod: number) : Observable<PageData<Ticket>> {
    return this.post('/user/ticket/search', {
      insertionPeriod: insertionPeriod,
      page: page
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

  get notifications() {
    return this.post('/user/notifications', {
      page: 1
    });
  }
}
