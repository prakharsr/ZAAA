import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from 'app/models';
import { DashboardApiService } from '../../services/dashboard-api.service';

export class ChartDataItem {
  name = "";
  value = 0;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  admin: boolean;

  roChartResults: {
    name: string,
    series: ChartDataItem[]
  }[];

  invoices1 = {
    generated: 0,
    pending: 0
  }

  payments1 = {
    collected: 0,
    shadow: 0,
    completed: 0,
    received: 0
  }

  payments2 = {
    pending: 0,
    received: 0
  }

  mhi1 = {
    pending: 0,
    received: 0
  }

  dueOverdue = {
    due: 0,
    overdue: 0
  }

  paidUnpaid = {
    paid: 0,
    unpaid: 0
  }

  receiptCheques = [];
  mhiCheques = [];

  constructor(private route: ActivatedRoute,
    private dashboardApi: DashboardApiService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { user: UserProfile }) => {
      this.admin = data.user.isAdmin;
    });

    this.dashboardApi.getInvoiceData().subscribe(data => {
      if (data.totalAmount != 0) {
        this.invoices1.generated = data.generated * 100 / data.totalAmount;
        this.invoices1.pending = 100 - this.invoices1.generated;
      }
    });

    this.dashboardApi.getDuesData().subscribe(data => {
      let total = data.DueAmount + data.OverDueAmount;

      if (total != 0) {
        this.dueOverdue.due = data.DueAmount * 100 / total;
        this.dueOverdue.overdue = data.OverDueAmount * 100 / total;
      }
    });

    this.dashboardApi.getRoChartData().subscribe(data => {
      if (data.success) {
        this.roChartResults = [
          {
            name: 'Generated',
            series: []
          },
          {
            name: 'Total',
            series: []
          }
        ];

        let d : {
          _id: {
            day: string,
            month: string,
            year: string
          },
          count: number,
          totalAmount: number,
          generated: number
        }[] = data.releaseOrders;

        d.forEach(element => {
          this.roChartResults[0].series.push({ name: element._id.day, value: element.generated });
          this.roChartResults[1].series.push({ name: element._id.day, value: element.totalAmount });
        });
      }
    });

    this.updatePayments();

    this.dashboardApi.getMhiData().subscribe(data => {
      let total = data.pendingAmount + data.collectedAmount;

      if (total != 0) {
        this.mhi1.pending = data.pendingAmount * 100 / total;
        this.mhi1.received = data.collectedAmount * 100 / total;
      }
    });

    this.dashboardApi.getPaidUnpaid().subscribe(data => {
      let total = data.PaidAmount + data.UnpaidAmount;

      if (total != 0) {
        this.paidUnpaid.paid = data.PaidAmount * 100 / total;
        this.paidUnpaid.unpaid = data.UnpaidAmount * 100 / total;
      }
    });

    this.dashboardApi.getMhiChequeDetails().subscribe(data => {
      if (data.success) {
        this.mhiCheques = data.mhis;
      }
    });
    
    this.dashboardApi.getReceiptChequeDetails().subscribe(data => {
      if (data.success) {
        this.receiptCheques = data.receipts
      }
    });
  }

  private updatePayments() {
    this.dashboardApi.getPaymentsData().subscribe(data => {      
      let total1 = data.collectedAmount + data.shadow + data.completed;
      
      if (total1 != 0) {
        this.payments1.collected = data.collectedAmount * 100 / total1;
        this.payments1.shadow = data.shadow * 100 / total1;
        this.payments1.completed = data.completed * 100 / total1;
      }

      let total2 = data.collectedAmount + data.pendingAmount;
      
      if (total2 != 0) {
        this.payments2.received = data.collectedAmount * 100 / total2;
        this.payments2.pending = data.pendingAmount * 100 / total2;
      }
    });
  }
}
