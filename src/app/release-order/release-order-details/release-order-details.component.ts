import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { ReleaseOrder } from '../release-order';
import { ReleaseOrderApiService } from '../release-order-api.service';

@Component({
  selector: 'app-release-order-details',
  templateUrl: './release-order-details.component.html',
  styleUrls: ['./release-order-details.component.css']
})
export class ReleaseOrderDetailsComponent implements OnInit {

  releaseOrder = new ReleaseOrder();

  constructor(private api: ReleaseOrderApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { releaseOrder: ReleaseOrder }) => {
      this.releaseOrder = data.releaseOrder;
    });
  }

  toDate(date: NgbDate) {
    return new Date(date.year, date.month - 1, date.day);
  }

  get taxDisplay() {
    let tax = this.releaseOrder.taxAmount.primary + "%";

    if (this.releaseOrder.taxAmount.secondary != 0) {
      tax += " + " + this.releaseOrder.taxAmount.secondary + "%"
    }

    return tax + (this.releaseOrder.taxIncluded ? " Tax Included" : " Tax Excluded");
  }

  get isTypeWords() {

    if (this.releaseOrder.mediaType == 'Print' && this.releaseOrder.adType == 'Text Classified') {
      return true;
    }

    if (this.releaseOrder.mediaType == 'Electronic' && this.releaseOrder.adType == 'Scroll') {
      return true;
    }

    return false;
  }

  get isTypeLen() {

    if (this.releaseOrder.mediaType == 'Print' && this.releaseOrder.adType != 'Text Classified') {
      return true;
    }

    return false;
  }

  get isTypeTime() {

    if (this.releaseOrder.mediaType == 'Air') {
      return true;
    }

    if (this.releaseOrder.mediaType == 'Electronic' && this.releaseOrder.adType != 'Scroll') {
      return true;
    }

    return false;
  }

  get rateText() {
    if (this.isTypeLen) {
      return this.releaseOrder.fixRate ? "Rate per insertion" : "Rate per sqcm";
    }

    if (this.isTypeWords) {
      return "Rate per insertion";
    }

    if (this.isTypeTime) {
      return "Rate per sec";
    }
  }
}
