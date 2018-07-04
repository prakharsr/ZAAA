import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from 'app/models';
import { DashboardApiService } from '../../services/dashboard-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  admin: boolean;

  invoiceData;
  duesData;
  mhiData;

  payments1 = {
    show: false,
    collected: 0,
    shadow: 0,
    completed: 0,
  }

  payments2 = {
    show: false,
    pending: 0,
    received: 0
  }

  constructor(private route: ActivatedRoute,
    private dashboardApi: DashboardApiService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { user: UserProfile }) => {
      this.admin = data.user.isAdmin;
    });

    this.invoiceData = this.dashboardApi.getInvoiceData();

    this.duesData = this.dashboardApi.getDuesData();

    this.updatePayments();

    this.mhiData = this.dashboardApi.getMhiData();
  }

  private updatePayments() {
    this.dashboardApi.getPaymentsData().subscribe(data => {      
      let total1 = data.collectedAmount + data.shadow + data.completed;
      
      if (total1 != 0) {
        this.payments1.show = true;
        this.payments1.collected = data.collectedAmount * 100 / total1;
        this.payments1.shadow = data.shadow * 100 / total1;
        this.payments1.completed = data.completed * 100 / total1;
      }

      let total2 = data.collectedAmount + data.pendingAmount;
      
      if (total2 != 0) {
        this.payments2.show = true;
        this.payments2.received = data.collectedAmount * 100 / total2;
        this.payments2.pending = data.pendingAmount * 100 / total2;
      }
    });
  }
}
