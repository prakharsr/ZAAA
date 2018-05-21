import { Component, OnInit } from '@angular/core';
import { PaymentReceipt, AdvanceReceipt } from '../payment-receipt';
import { ActivatedRoute, Router } from '@angular/router';
import { ReleaseOrderSearchParams } from '../../release-order/release-order-search-params';
import { PageData } from '../../models/page-data';
import { ReceiptsApiService } from '../receipts-api.service';
import { Invoice } from '../../invoice/invoice';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-link-advance',
  templateUrl: './link-advance.component.html',
  styleUrls: ['./link-advance.component.css']
})
export class LinkAdvanceComponent implements OnInit {

  receipts: PaymentReceipt[] = [];
  invoice = new Invoice();

  page: number;
  pageCount: number;

  constructor(private route: ActivatedRoute,
    private api: ReceiptsApiService,
    private router: Router,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: { list: PageData<PaymentReceipt>, search: ReleaseOrderSearchParams }, invoice: Invoice }) => {
      this.receipts = data.resolved.list.list;
      this.invoice = data.invoice;

      this.page = data.resolved.list.page;
      this.pageCount = data.resolved.list.pageCount;
    });
  }

  link(receipt: AdvanceReceipt) {
    this.api.link(this.invoice, receipt).subscribe(data => {
      if (data.success) {
        this.router.navigateByUrl('/invoices');
      }
      else {
        this.notifications.show(data.msg);
      }
    });
  }

  navigate(i: number) {
    this.router.navigate(['/receipts/advance/link', this.invoice.id, i]);
  }
}