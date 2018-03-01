import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IfscResponse } from '../models/ifscResponse';

@Injectable()
export class IfscService {

  constructor(private http: HttpClient) { }

  getData(ifsc: string) : Observable<IfscResponse> {
    return this.http.get<IfscResponse>("https://ifsc.razorpay.com/" + ifsc);
  }
}
