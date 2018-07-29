import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute } from '@angular/router';
import { RateCard } from '../rate-card';
import { RateCardApiService } from '../rate-card-api.service';
import { DialogService } from 'app/services';
import { PageData } from 'app/models';
import { SuperAdminApiService } from '../../super-admin/super-admin-api.service';

@Component({
  selector: 'app-rate-card-list',
  templateUrl: './rate-card-list.component.html',
  styleUrls: ['./rate-card-list.component.css']
})
export class RateCardListComponent implements OnInit {

  ratecards: RateCard[] = [];
  global: boolean;

  pageCount: number;
  page: number;

  query: string;
  searchFailed = false;

  isSuperAdmin = false;

  constructor(private api: RateCardApiService,
    private superAdminApi: SuperAdminApiService,
    private dialog: DialogService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { list: PageData<RateCard>, global: boolean, superAdmin: boolean }) => {
      this.global = data.global;
      this.ratecards = data.list.list;
      this.pageCount = data.list.pageCount;
      this.page = data.list.page;
      this.isSuperAdmin = data.superAdmin;
    });      
  }

  search = (text: Observable<string>) =>
    text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term =>
        this.api.searchRateCards(term)
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }));

  inputFormatter = (result: RateCard) => {
    this.router.navigate([this.isSuperAdmin ? '/superadmin/ratecards' : '/ratecards', result.id]);
  }

  private navigateToReleaseOrder(ratecard: RateCard) {
    this.router.navigate(['/releaseorders/fromRateCard', ratecard.id]);
  }

  createReleaseOrder(ratecard: RateCard) {
    if (ratecard.validTill && ratecard.validTill < new Date()) {
      this.dialog.showYesNo('Rate Card Expired', 'This Rate Card has expired, Do you wish to continue?').subscribe(result => {
        if (result) {
          this.navigateToReleaseOrder(ratecard);
        }
      });
    }
    else if (ratecard.validTill && new Date(ratecard.validTill).setDate(-30) < Date.now()) {
      this.dialog.showYesNo('Rate Card Expired', 'This Rate Card is about to expire, Do you wish to continue?').subscribe(result => {
        if (result) {
          this.navigateToReleaseOrder(ratecard);
        }
      });
    }
    else this.navigateToReleaseOrder(ratecard);
  }

  deleteRateCard(ratecard: RateCard) {
    this.dialog.confirmDeletion("Are you sure you want to delete this Rate Card?").subscribe(confirm => {
      if (!confirm)
        return;

      let base: Observable<any>;

      if (this.isSuperAdmin) {
        base = this.superAdminApi.deleteGlobalRateCard(ratecard);
      }
      else base = this.api.deleteRateCard(ratecard);

      base.subscribe(
        data => {
          if (data.success) {
            this.ratecards = this.ratecards.filter(c => c.id !== ratecard.id);
          }
          else {
            console.log(data);
          }
        },
        err => console.log(err)
      );
    });
  }

  navigate(i: number) {
    this.router.navigate([this.isSuperAdmin ? '/superadmin/ratecards' : '/ratecards', 'list', i]);
  }
}
