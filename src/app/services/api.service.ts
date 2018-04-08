import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';

import { Plan } from '../models/plan';
import { Template } from '../models/template';

import { WindowService } from './window.service';

import { environment } from '../../environments/environment';
import { UserProfile } from '../models/userProfile';
import { Firm } from '../models/firm';
import { Address } from '../models/address';

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

  post(url: string, body: any) : Observable<any> {

    if (this.authToken)
    {
        return this.http.post(environment.apiUrl + url, body, this.headers);
    }
    else return this.http.post(environment.apiUrl + url, body);
  }

  patch(url: string, body: any) : Observable<any> {

    if (this.authToken)
    {
        return this.http.patch(environment.apiUrl + url, body, this.headers);
    }
    else return this.http.patch(environment.apiUrl + url, body);
  }

  get(url: string) : Observable<any> {

    if (this.authToken)
    {
        return this.http.get(environment.apiUrl + url, this.headers);
    }
    else return this.http.get(environment.apiUrl + url);
  }

  delete(url: string) : Observable<any> {
    return this.http.delete(environment.apiUrl + url, this.headers);
  }

  fileUpload(url: string, key: string, fileToUpload: File) : Observable<any> {
    const formData = new FormData();
    formData.append(key, fileToUpload, fileToUpload.name);

    return this.http.post(environment.apiUrl + url, formData, this.headers);
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
          this.authToken = data.token;

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
    this.authToken = '';
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

  setPlan(plan: Plan,
    payment: string,
    firmName: string,
    billingAddress: Address,
    gstNo: string) : Observable<any> {

    return this.post('/user/plan', {
      planID: plan.id,
      cost: plan.cost,
      paymentID: payment,
      firmName: firmName,
      billingAddress: billingAddress,
      gstNo: gstNo
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

  getUserProfile() : Observable<UserProfile> {
    let base = this.get('/user/profile');

    let result = base.pipe(
      map(data => {
        let profile = new UserProfile();

        if (data.success) {
          profile.name = data.user.name;
          profile.designation = data.user.designation;
          profile.contact = data.user.phone;
          profile.email = data.user.email;

          if (data.user.photo) {
            profile.photo = environment.uploadsBaseUrl + data.user.photo;
          }

          if (data.user.signature) {
            profile.sign = environment.uploadsBaseUrl + data.user.signature;
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
          profile.gstNo = data.firm.GSTIN;

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
      gst: firm.gstNo,

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
}
