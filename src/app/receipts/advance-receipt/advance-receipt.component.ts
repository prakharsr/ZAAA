import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdvanceReceipt } from '../payment-receipt';
import { ReceiptsApiService } from '../receipts-api.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-advance-receipt',
  templateUrl: './advance-receipt.component.html',
  styleUrls: ['./advance-receipt.component.css']
})
export class AdvanceReceiptComponent implements OnInit {

  receipt = new AdvanceReceipt();

  constructor(private router: Router,
    private api: ReceiptsApiService,
    private notifications: NotificationService) { }

  ngOnInit() {
  }

  private goBack() {
    this.router.navigateByUrl('/receipts/advance');
  }

  submit() {
    this.api.createAdvanceReceipt(this.receipt).subscribe(data => {
      if (data.success) {
        this.goBack();
      }
      else {
        this.notifications.show(data.msg);
      }
    });
  }

  cancel() {
    this.goBack();
  }

}
