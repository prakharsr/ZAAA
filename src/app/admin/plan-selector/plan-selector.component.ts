import { Component, OnInit, ApplicationRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Plan, Firm } from 'app/models';

import {
  ApiService,
  RazorPayService,
  WindowService,
  DialogService
} from 'app/services';

import { BillingDetails } from 'app/components';

@Component({
  selector: 'app-plan-selector',
  templateUrl: './plan-selector.component.html',
  styleUrls: ['./plan-selector.component.css']
})
export class PlanSelectorComponent implements OnInit {

  plans: Plan[];
  paid: boolean;

  private selectedPlan: Plan;
  private firm: Firm;

  private email: string;
  private phone: string;

  constructor(private api: ApiService,
    private razorPay: RazorPayService,
    private appRef: ApplicationRef,
    private router: Router,
    private winRef: WindowService,
    private dialog: DialogService) { }

  ngOnInit() {
    this.api.plans.subscribe(data => {
      this.plans = [];

      data.plans.forEach(element => {
        let plan = new Plan(element.name, element.cost, element.maxUsers, element.maxAdmins);

        plan.id = element._id;

        this.plans.push(plan);
      });

      this.email = data.email;
      this.phone = data.phone;
    });

    this.api.getFirmProfile().subscribe(data => this.firm = data);
  }

  private openPay(details: BillingDetails) {
    this.razorPay.initPay(this.phone,
      this.email,
      this.selectedPlan.cost,
      "AAMan " + this.selectedPlan.name,
      response => {
        console.log(response.razorpay_payment_id);

        this.paid = true;

        this.api.setPlan(this.selectedPlan,
          response.razorpay_payment_id,
          details
        ).subscribe(
          data => {
            this.api.generatePaymentInvoice().subscribe(data => {
              // redirect
              this.winRef.window.location.pathname = '/dashboard';
              
              this.appRef.tick();
            });
          },
          err => alert("Plan was not saved.\n\nContact support with reference no: " + response.razorpay_payment_id)
        );
      });
  }

  billingDetails(param: BillingDetails) {
    this.openPay(param);
  }

  selectPlan(plan: Plan)
  {
    if (this.paid)
      return;

    if (plan.cost != 0) {
      this.selectedPlan = plan;

      if (this.firm && this.firm.name && this.firm.registeredAddress) {
        this.openPay({
          firmName: this.firm.name,
          billingAddress: this.firm.registeredAddress,
          GSTIN: this.firm.GSTIN
        });
      }
      else {
        this.dialog.getBillingDetails().subscribe(data => {
          this.billingDetails(data);
        });
      }
    }
    else {
      this.paid = true;
      
      this.api.setPlan(plan, '', new BillingDetails()).subscribe(
        data => {
          this.router.navigateByUrl('/profile');
        },
        err => alert("Plan was not saved.")
      );
    }
  }

}
