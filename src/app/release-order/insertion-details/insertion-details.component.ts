import { Component, OnInit } from '@angular/core';
import { Address } from 'app/models';

// Prevent circular dependency
import { StateApiService } from 'app/services/state-api.service';
import { ReleaseOrder } from '../release-order';
import { Insertion } from '../release-order';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NotificationService } from '../../services/notification.service';
import { FixSize, Scheme, RateCard } from '../../rate-card/rate-card';
import { ActivatedRoute } from '@angular/router';

export class InsertionDetails {
  customScheme = false;
  selectedScheme: Scheme;
  insertions: Insertion[] = [];
  adCountPaid = 1;
  customPaid = 1;
  customFree = 0;
}

@Component({
  selector: 'app-insertion-details',
  templateUrl: './insertion-details.component.html',
  styleUrls: ['./insertion-details.component.css']
})
export class InsertionDetailsComponent implements OnInit {

  details = new InsertionDetails();
  releaseorder = new ReleaseOrder();
  edit = false;
  id: string;
  
  constructor(private route: ActivatedRoute, public stateApi: StateApiService, private notifications: NotificationService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');

        this.edit = true;

        this.initFromReleaseOrder();
      }
      else if (params.has('copy')) {
        this.initFromReleaseOrder();

        this.releaseorder.releaseOrderNO = "";
        this.releaseorder.id = "";
        this.releaseorder.generated = false;
        this.releaseorder.date = new Date();

        this.releaseorder.insertions = this.releaseorder.insertions.map(insertion => new Insertion(insertion.date));
      }
  
    });
  }
  private initFromReleaseOrder() {
    this.route.data.subscribe((data: { releaseOrder: ReleaseOrder }) => {
      this.releaseorder = data.releaseOrder;

      let insertionBkp = this.releaseorder.insertions;

      this.releaseorder.insertions = insertionBkp;
    });
  }

  get selectedScheme() {
    return this.details.selectedScheme;
  }

  set selectedScheme(scheme: Scheme) {
    this.details.selectedScheme = scheme;

    this.details.adCountPaid = scheme.paid;

    this.releaseorder.insertions = [];
  }

  isInsertionTimeLimitValid(date: NgbDate) {
    if (!this.details.customScheme && this.selectedScheme && this.selectedScheme.timeLimit) {
      let now = new Date();
      let last = new Date();
      now.setDate(now.getDate() - 1);
      last.setDate(last.getDate() + this.selectedScheme.timeLimit + 1);

      return date.before(new NgbDate(last.getFullYear(), last.getMonth() + 1, last.getDate()))
        && date.after(new NgbDate(now.getFullYear(), now.getMonth() + 1, now.getDate()));
    }

    return true;
  }

  addInsertion(date: NgbDate) {
    const index = this.findInsertion(date);

    if (index == -1) {
      if (this.releaseorder.insertions.length >= this.availableAds) {
        this.notifications.show('Total No of Ads reached');
  
        return;
      }
      else if (!this.isInsertionTimeLimitValid(date)) {
        this.notifications.show('Date outside Scheme Time Limit');

        return;
      }

      this.releaseorder.insertions.push(new Insertion(date));
    }
    else this.removeInsertion(index);
  }

  removeInsertion(i: number) {
    this.releaseorder.insertions.splice(i, 1);
  }

  findInsertion(date: NgbDate): number {
    return this.releaseorder.insertions.findIndex(element => element.date.day == date.day
      && element.date.month == date.month
      && element.date.year == date.year);
  }

  isSelected(date: NgbDate) {
    return this.findInsertion(date) != -1;
  }

  get availableAds() {
    if (this.details.customScheme) {
      let multiplier = this.details.adCountPaid / this.details.customPaid;

      return +this.details.adCountPaid + this.details.customFree * multiplier;
    }
    
    let multiplier = this.details.adCountPaid / this.selectedScheme.paid;

    return +this.details.adCountPaid + this.selectedScheme.Free * multiplier;
  }

}
