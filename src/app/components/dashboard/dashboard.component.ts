import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from 'app/models';
import { DashboardApiService } from 'app/services/dashboard-api.service';

export class ChartDataItem {
  name: Date;
  value = 0;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  admin: boolean;

  constructor(private route: ActivatedRoute,
    private dashboardApi: DashboardApiService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { user: UserProfile }) => {
      this.admin = data.user.isAdmin;
    });

    this.refresh();
  }

  refresh() {
    this.setInvoiceFilter(this.currentInvoiceFilter);

    this.setROChartFilter(this.currentROChartFilter);

    this.setPaymentsFilter(this.currentPaymentsFilter);

    this.setMhiFilter(this.currentMhiFilter);

    this.setReceiptChequesFilter(this.currentReceiptChequesFilter);

    this.setMhiChequesFilter(this.currentMhiChequesFilter);
  }

  //#region Invoices
  invoicesData = {
    genAmount: 0,
    pendingAmount: 0,
    generated: 0,
    pending: 0
  }

  dueOverdue = {
    dueAmount: 0,
    overdueAmount: 0,
    due: 0,
    overdue: 0
  }

  currentInvoiceFilter = 1;

  setInvoiceFilter(i: number) {
    this.currentInvoiceFilter = i;

    this.dashboardApi.getInvoiceData(i).subscribe(data => {
      if (data.totalAmount != 0) {
        this.invoicesData.genAmount = data.generated;
        this.invoicesData.pendingAmount = data.totalAmount - data.generated;

        this.invoicesData.generated = data.generated * 100 / data.totalAmount;
        this.invoicesData.pending = 100 - this.invoicesData.generated;
      }
    });

    this.dashboardApi.getDuesData(i).subscribe(data => {
      this.dueOverdue.dueAmount = data.DueAmount;
      this.dueOverdue.overdueAmount = data.OverDueAmount;

      let total = data.DueAmount + data.OverDueAmount;

      if (total != 0) {
        this.dueOverdue.due = data.DueAmount * 100 / total;
        this.dueOverdue.overdue = data.OverDueAmount * 100 / total;
      }
    });
  }
  //#endregion

  //#region RO Chart
  roChartResults: {
    name: string,
    series: ChartDataItem[]
  }[];

  currentROChartFilter = 1;

  setROChartFilter(i: number) {
    this.currentROChartFilter = i;

    this.dashboardApi.getRoChartData(i).subscribe(data => {
      if (data.success) {
        this.roChartResults = [
          {
            name: 'Last Year',
            series: []
          },
          {
            name: 'Current Year',
            series: []
          }
        ];

        let d : {
          _id: {
            day: number,
            month: number,
            year: number
          },
          count: number,
          totalAmount: number,
          generated: number
        }[] = data.releaseOrders;

        d.forEach(element => {
          this.roChartResults[0].series.push({ name: this.toChartKey(element._id), value: element.generated });
          this.roChartResults[1].series.push({ name: this.toChartKey(element._id), value: element.totalAmount });
        });
      }
    });
  }

  toChartKey(date: { year: number, month: number, day: number }) {
    // keep the year same
    return new Date(2018, date.month - 1, date.day);
  }

  xAxisTick(val: Date) {
    if (val.getHours() || val.getMinutes() || val.getSeconds() || val.getMilliseconds())
      return '';

    return val.getDate().toString().padStart(2, '0')
      + '-'
      + (val.getMonth() + 1).toString().padStart(2, '0');
  }

  yAxisTick(val) {
    return '₹ ' + val;
  }
  //#endregion

  //#region Payments
  paymentsData = {
    collected: 0,
    shadow: 0,
    completed: 0,
    received: 0,
    pending: 0,
    collectedAmount: 0,
    shadowAmount: 0,
    completedAmount: 0,
    receivedAmount: 0,
    pendingAmount: 0
  }

  currentPaymentsFilter = 1;

  setPaymentsFilter(i: number) {
    this.currentPaymentsFilter = i;

    this.dashboardApi.getPaymentsData(i).subscribe(data => {
      this.paymentsData.collectedAmount = data.collected;
      this.paymentsData.pendingAmount = data.pending;
      this.paymentsData.shadowAmount = data.shadow;
      this.paymentsData.receivedAmount = data.received;
      this.paymentsData.completedAmount = data.completed;

      let total1 = data.collected + data.shadow + data.completed;
      
      if (total1 != 0) {
        this.paymentsData.collected = data.collected * 100 / total1;
        this.paymentsData.shadow = data.shadow * 100 / total1;
        this.paymentsData.completed = data.completed * 100 / total1;
      }

      let total2 = data.received + data.pending;
      
      if (total2 != 0) {
        this.paymentsData.received = data.received * 100 / total2;
        this.paymentsData.pending = data.pending * 100 / total2;
      }
    });
  }
  //#endregion

  //#region Mhi
  mhiData = {
    pending: 0,
    pendingAmount: 0,
    received: 0,
    receivedAmount: 0
  }

  paidUnpaid = {
    paid: 0,
    paidAmount: 0,
    unpaid: 0,
    unpaidAmount: 0
  }

  currentMhiFilter = 1;

  setMhiFilter(i: number) {
    this.currentMhiFilter = i;

    this.dashboardApi.getMhiData(i).subscribe(data => {
      this.mhiData.pendingAmount = data.pendingAmount;
      this.mhiData.receivedAmount = data.collectedAmount;

      let total = data.pendingAmount + data.collectedAmount;

      if (total != 0) {
        this.mhiData.pending = data.pendingAmount * 100 / total;
        this.mhiData.received = data.collectedAmount * 100 / total;
      }
    });

    this.dashboardApi.getPaidUnpaid(i).subscribe(data => {
      this.paidUnpaid.paidAmount = data.PaidAmount;
      this.paidUnpaid.unpaidAmount = data.UnpaidAmount;

      let total = data.PaidAmount + data.UnpaidAmount;

      if (total != 0) {
        this.paidUnpaid.paid = data.PaidAmount * 100 / total;
        this.paidUnpaid.unpaid = data.UnpaidAmount * 100 / total;
      }
    });
  }
  //#endregion

  //#region Receipt Cheques
  receiptCheques = [];

  currentReceiptChequesFilter = 1;

  setReceiptChequesFilter(i: number) {
    this.currentReceiptChequesFilter = i;

    this.dashboardApi.getReceiptChequeDetails(i).subscribe(data => {
      if (data.success) {
        this.receiptCheques = data.receipts
      }
    });
  }
  //#endregion

  //#region Mhi Cheques
  mhiCheques = [];

  currentMhiChequesFilter = 1;

  setMhiChequesFilter(i: number) {
    this.currentMhiChequesFilter = i;

    this.dashboardApi.getMhiChequeDetails(i).subscribe(data => {
      if (data.success) {
        this.mhiCheques = data.mhis;
      }
    });
  }
  //#endregion
}
