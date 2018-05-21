import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Firm } from '@aaman/main/firm';
import { ApiService } from '@aaman/main/api.service';

@Injectable()
export class FirmResolver implements Resolve<Firm> {
  constructor(private api: ApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Firm> {
    return this.api.getFirmProfile();
  }
}