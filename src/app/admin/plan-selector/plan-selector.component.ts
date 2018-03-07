import { Component, OnInit, ApplicationRef } from '@angular/core';
import { Plan } from '../../models/plan';
import { ApiService } from '../../services/api.service';
import { RazorPayService } from '../../services/razorpay.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { WindowService } from '../../services/window.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-plan-selector',
  templateUrl: './plan-selector.component.html',
  styleUrls: ['./plan-selector.component.css']
})
export class PlanSelectorComponent implements OnInit {

  plans: Plan[];
  paid: boolean;

  private selectedPlan: Plan;

  private email: string;
  private phone: string;

  constructor(private api: ApiService,
    private razorPay: RazorPayService,
    private appRef: ApplicationRef,
    private router: Router,
    private winRef: WindowService,
    private modalService: NgbModal) { }

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
  }

  billingDetails(param: { firmName: string, billingAddress: string, gstNo: string }) {
    console.log(param);

    this.razorPay.initPay(this.phone,
      this.email,
      this.selectedPlan.cost,
      "ZAAA " + this.selectedPlan.name,
      response => {
        console.log(response.razorpay_payment_id);

        this.paid = true;

        this.api.setPlan(this.selectedPlan,
          response.razorpay_payment_id,
          param.firmName,
          param.billingAddress,
          param.gstNo
        ).subscribe(
          data => {
            // redirect
            this.winRef.window.location.pathname = '/dashboard';
            
            this.appRef.tick();
          },
          err => alert("Plan was not saved.\n\nContact support with reference no: " + response.razorpay_payment_id)
        );
      });
  }

  selectPlan(plan: Plan, modalContent)
  {
    if (this.paid)
      return;

    if (plan.cost != 0) {
      this.selectedPlan = plan;

      this.modalService.open(modalContent);
    }
    else {
      this.paid = true;
      
      this.api.setPlan(plan, '', '', '', '').subscribe(
        data => {
          this.router.navigateByUrl('/dashboard');
        },
        err => alert("Plan was not saved.")
      );
    }
  }

}
