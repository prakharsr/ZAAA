import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';

import { Plan } from '../models/plan';
import { Template } from '../models/template';
import { User } from '../models/user';

import { WindowService } from './window.service';
import { UserRoles } from '../models/userRoles';

import { environment } from '../../environments/environment';
import { UserProfile } from '../models/userProfile';
import { Firm } from '../models/firm';
import { CoUser } from '../models/coUser';

@Injectable()
export class ApiService {

  private authTokenKey : string = "auth_token";

  private _authToken: string;

  private get authToken() : string {
    if (!this._authToken)
    {
      this._authToken = this.windowService.window.localStorage.getItem(this.authTokenKey);
    }

    return this._authToken;
  }

  get isLoggedIn() : boolean {
    if (this.authToken)
        return true;
      
    return false;
  }

  private set authToken(authToken: string) {
    if (!authToken) {
      this._authToken = '';
      this.windowService.window.localStorage.removeItem(this.authTokenKey);
    }
    else {
      this._authToken = authToken;
      this.windowService.window.localStorage.setItem(this.authTokenKey, authToken);
    }
  }

  constructor(private http: HttpClient, private windowService: WindowService) { }

  private get headers() {
    return { headers: { Authorization: this.authToken }};
  }

  private post(url: string, body: any) : Observable<any> {

    if (this.authToken)
    {
        return this.http.post(environment.apiUrl + url, body, this.headers);
    }
    else return this.http.post(environment.apiUrl + url, body);
  }

  private get(url: string) : Observable<any> {

    if (this.authToken)
    {
        return this.http.get(environment.apiUrl + url, this.headers);
    }
    else return this.http.get(environment.apiUrl + url);
  }

  private delete(url: string) : Observable<any> {
    return this.http.delete(environment.apiUrl + url, this.headers);
  }

  deleteCoUser(coUser: CoUser) : Observable<any> {
    return this.delete('/user/co_user/' + coUser.id);
  }

  private fileUpload(url: string, key: string, fileToUpload: File) : Observable<any> {
    const formData = new FormData();
    formData.append(key, fileToUpload, fileToUpload.name);

    return this.http.post(environment.apiUrl + url, formData, this.headers);
  }

  uploadProfilePicture(fileToUpload: File) : Observable<any> {
    return this.fileUpload("/user/image", "user", fileToUpload);
  }

  uploadSign(fileToUpload: File) : Observable<any> {
    return this.fileUpload("/user/sign", "sign", fileToUpload);
  }
  
  uploadFirmLogo(fileToUpload: File) : Observable<any> {
    return this.fileUpload("/firm/logo", "logo", fileToUpload);
  }

  private extractToken(base: Observable<any>) : Observable<any> {
    return base.pipe(
      map(data => {
        if (data.success) {
          this.authToken = data.token;

          data.token = '';
        }

        return data;
      })
    );
  }

  signup(name: string, email: string, password: string) : Observable<any>
  {
    const base = this.post('/user/signup', {
      name: name,
      email: email,
      password: password
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
    this.authToken = '';
  }

  get plans() : Observable<any> {
    return this.get('/plans');
  }

  get coUsers() : Observable<any> {
    return this.get('/user/co_user');
  }

  createCoUser(name: string, email: string, phone: string, password: string) : Observable<any> {
    return this.post('/user/co_user', {
      name: name,
      email: email,
      phone: phone,
      password: password
    });
  }

  get templates() : Observable<Template[]> {
    return of([
      new Template("Template 1", "http://www.monsterbeatsstudio.us/download/20039/systemdesigndocument1.gif"),
      new Template("Template 2", "http://www.le-chuang.com/wp-content/uploads/2016/09/business-case-template-businesscase9-SUFOjh.jpg")
    ]);
  }

  setPlan(plan: Plan, payment: string) : Observable<any> {
    return this.post('/user/plan', { planID: plan.id, paymentID: payment });
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

  setRoles(coUserId : string, roles : UserRoles) : Observable<any> {
    return this.post('/user/role', { 
      id: coUserId,
      release_order: roles.release_order,
      invoice: roles.invoice,
      payment_receipts: roles.payment_receipts,
      accounts: roles.accounts,
      reports: roles.reports,
      media_house: roles.media_house,
      clients: roles.clients,
      executives: roles.executives 
    });
  }

  getRoles(coUserId: string) : Observable<UserRoles> {
    let base = this.get('/user/role/' + coUserId);

    return base.pipe(
      map(data => {
        let roles = new UserRoles();

        if (data.success) {
          roles.release_order = data.msg.Release_order;
          roles.invoice = data.msg.Invoice;
          roles.payment_receipts = data.msg.Payment_receipts;
          roles.accounts = data.msg.Accounts;
          roles.reports = data.msg.Reports;

          if (data.msg.directory) {
            let dir = data.msg.directory;

            roles.media_house = dir.media_house;
            roles.clients = dir.clients;
            roles.executives = dir.executives;
          }
        }

        return roles;
      })
    );
  }

  getUser() : Observable<any> {
    return this.get('/user/profile');
  }

  getUserProfile() : Observable<UserProfile> {
    let base = this.get('/user/profile');

    let result = base.pipe(
      map(data => {
        let profile = new UserProfile();

        if (data.success) {
          profile.name = data.user.name;
          profile.designation = data.user.designation;

          if (data.user.photo) {
            profile.photo = environment.uploadsBaseUrl + data.user.photo;
          }

          if (data.user.signature) {
            profile.sign = environment.uploadsBaseUrl + data.user.signature;
          }

          if (data.user.Socials) {
            profile.facebook = data.user.Socials.fb;
            profile.twitter = data.user.Socials.twitter;
            profile.other = data.user.Socials.other;
          }
        }

        return profile;
      })
    );

    return result;
  }

  setUserProfile(userProfile: UserProfile) : Observable<any> {
    return this.post('/user/profile', {
      name: userProfile.name,
      designation: userProfile.designation,
      fb: userProfile.facebook,
      twitter: userProfile.twitter,
      other: userProfile.other
    });
  }

  resetPsw(email: string): Observable<any> {
    return this.post('/user/resetpassword', {
      email: email
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
          profile.website = data.firm.Website;
          profile.panNo = data.firm.PanNo;
          profile.gstNo = data.firm.GSTIN;
          profile.registeredAddress = data.firm.RegisteredAddress;
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
      website: firm.website,
      pan: firm.panNo,
      gst: firm.gstNo,

      incorporationDate: firm.incDate,

      email: firm.email,
      mobile: firm.phone,

      accountName: firm.bankAccountName,
      accountNo: firm.bankAccountNo,
      ifsc: firm.bankIfsc,
      bankName: firm.bankName,
      bankAddress: firm.bankBranchAddress,
      accountType: firm.bankAccountType
    });
  }

  changePassword(oldPassword: string, newPassword: string) : Observable<any> {
    return this.post('/user/changePassword', {
      oldPassword: oldPassword,
      newPassword: newPassword
    });
  }
}
