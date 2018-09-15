import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RateCard } from '../rate-card';
import { RateCardApiService } from '../rate-card-api.service';
import { DialogService, NotificationService } from 'app/services';
import { Observable } from 'rxjs/Observable';
import { SuperAdminApiService } from 'app/super-admin/super-admin-api.service';

@Component({
  selector: 'app-rate-card-details',
  templateUrl: './rate-card-details.component.html',
  styleUrls: ['./rate-card-details.component.css']
})
export class RateCardDetailsComponent implements OnInit {

  ratecard = new RateCard();

  global = false;
  isSuperAdmin = false;

  constructor(private api: RateCardApiService,
    private superAdminApi: SuperAdminApiService,
    private route: ActivatedRoute,
    private dialog: DialogService,
    private router: Router,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { rateCard: RateCard, global: boolean, superAdmin: boolean }) => {
      this.ratecard = data.rateCard;
      this.global = data.global;
      this.isSuperAdmin = data.superAdmin;
    });
  }

  get isTypeWords() {

    if (this.ratecard.mediaType == 'Print' && this.ratecard.adType == 'Text Classified') {
      return true;
    }

    if (this.ratecard.mediaType == 'Electronic' && this.ratecard.adType == 'Scroll') {
      return true;
    }

    return false;
  }

  get isTypeLen() {

    if (this.ratecard.mediaType == 'Print' && this.ratecard.adType != 'Text Classified') {
      return true;
    }

    return false;
  }

  get isTypeTime() {

    if (this.ratecard.mediaType == 'Air') {
      return true;
    }

    if (this.ratecard.mediaType == 'Electronic' && this.ratecard.adType != 'Scroll') {
      return true;
    }

    return false;
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
            this.router.navigateByUrl(this.isSuperAdmin ? '/superadmin/ratecards' : '/ratecards');
          }
          else {
            console.log(data);

            this.notifications.show(data.msg);
          }
        },
        err => console.log(err)
      );
    });
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

  get rateText() {
    if (this.isTypeLen) {
      //return this.releaseorder.fixRate ? "Rate per insertion" : "Rate per sqcm";

      return "Rate per sqcm";
    }

    if (this.isTypeWords) {
      return "Rate per insertion";
    }

    if (this.isTypeTime) {
      return "Rate per sec";
    }
  }
}
