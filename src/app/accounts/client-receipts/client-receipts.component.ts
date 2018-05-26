import { Component, OnInit } from '@angular/core';
import { PaymentReceipt } from 'app/receipts';
import { ReleaseOrderSearchParams } from 'app/release-order';
import { PageData } from 'app/models';
import { ActivatedRoute } from '@angular/router';

class CheckableReceipt {
  constructor(public receipt: PaymentReceipt) { }

  checked = false;
}

@Component({
  selector: 'app-client-receipts',
  templateUrl: './client-receipts.component.html',
  styleUrls: ['./client-receipts.component.css']
})
export class ClientReceiptsComponent implements OnInit {

  receipts: CheckableReceipt[] = [];

  page: number;
  pageCount: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: { list: PageData<PaymentReceipt>, search: ReleaseOrderSearchParams }}) => {
      this.receipts = data.resolved.list.list.map(item => new CheckableReceipt(item));

      this.pageCount = data.resolved.list.pageCount;
      this.page = data.resolved.list.page;
    });
  }

  mark(status: number) {}

}
