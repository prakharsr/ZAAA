import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageData } from '../../models/page-data';
import { InsertionCheckItem } from '../insertion-check-item';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { ReleaseOrderApiService } from '../release-order-api.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-insertion-check',
  templateUrl: './insertion-check.component.html',
  styleUrls: ['./insertion-check.component.css']
})
export class InsertionCheckComponent implements OnInit {

  insertions: InsertionCheckItem[] = [];

  page: number;
  pageCount: number;

  dummyArray;

  constructor(private route: ActivatedRoute,
    private api: ReleaseOrderApiService,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { list: PageData<InsertionCheckItem> }) => {
      this.insertions = data.list.list;

      this.page = data.list.page;
      this.pageCount = data.list.pageCount;

      this.dummyArray = new Array(this.pageCount);
    });
  }

  toDate(date: NgbDate) {
    return new Date(date.year, date.month - 1, date.day);
  }

  mark(state: number) {
    let selectedInsertions = this.insertions.filter(insertion => insertion.checked);

    let selectedIDs = selectedInsertions.map(insertion => insertion.insertions._id);

    this.api.setInsertionCheck(state, selectedIDs).subscribe(data => {
      if (data.success) {
        selectedInsertions.forEach(insertion => insertion.insertions.state = state);
      }
      else {
        console.log(data);

        this.notifications.show(data.msg);
      }
    },
    err => {
      console.log(err);

      this.notifications.show('Connection failed');
    });
  }
}
