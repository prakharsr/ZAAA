import { Component, OnInit, Inject } from '@angular/core';
import { Address } from 'app/models';

// Prevent circular dependency
import { StateApiService } from 'app/services/state-api.service';
import { ReleaseOrder } from '../release-order';
import { Insertion } from '../release-order';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NotificationService } from '../../services/notification.service';
import { FixSize, Scheme, RateCard } from '../../rate-card/rate-card';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

export class InsertionInjection {
  insertions: Insertion[] = [];

  availableAds = 0;

  timeLimit = 0;
}

@Component({
  selector: 'app-insertion-details',
  templateUrl: './insertion-details.component.html',
  styleUrls: ['./insertion-details.component.css']
})
export class InsertionDetailsComponent implements OnInit {

  currentInsertionDate;

  injected = new InsertionInjection();
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: InsertionInjection, private notifications: NotificationService) {
    this.injected = data;
  }

  ngOnInit() { }

  isInsertionTimeLimitValid(date: NgbDate) {
    if (this.injected.timeLimit) {
      let now = new Date();
      let last = new Date();
      now.setDate(now.getDate() - 1);
      last.setDate(last.getDate() + this.injected.timeLimit + 1);

      return date.before(new NgbDate(last.getFullYear(), last.getMonth() + 1, last.getDate()))
        && date.after(new NgbDate(now.getFullYear(), now.getMonth() + 1, now.getDate()));
    }

    return true;
  }

  addInsertion(date: NgbDate) {
    const index = this.findInsertion(date);

    if (index == -1) {
      if (this.injected.insertions.length >= this.injected.availableAds) {
        this.notifications.show('Total No of Ads reached');
  
        return;
      }
      else if (!this.isInsertionTimeLimitValid(date)) {
        this.notifications.show('Date outside Scheme Time Limit');

        return;
      }

      this.injected.insertions.push(new Insertion(date));
    }
    else this.removeInsertion(index);
  }

  removeInsertion(i: number) {
    this.injected.insertions.splice(i, 1);
  }

  findInsertion(date: NgbDate): number {
    return this.injected.insertions.findIndex(element => element.date.day == date.day
      && element.date.month == date.month
      && element.date.year == date.year);
  }

  isSelected(date: NgbDate) {
    return this.findInsertion(date) != -1;
  }
}
