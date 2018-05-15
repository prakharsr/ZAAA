import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageData } from '../../models/page-data';
import { InsertionCheckItem } from '../insertion-check-item';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';

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

  constructor(private route: ActivatedRoute) { }

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
}
