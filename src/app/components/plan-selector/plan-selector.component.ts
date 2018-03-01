import { Component, OnInit, Input, Output, EventEmitter, ApplicationRef } from '@angular/core';
import { Plan } from '../../models/plan';
import { ApiService } from '../../services/api.service';
import { RazorPayService } from '../../services/razorpay.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-plan-selector',
  templateUrl: './plan-selector.component.html',
  styleUrls: ['./plan-selector.component.css']
})
export class PlanSelectorComponent implements OnInit {

  plans: Plan[];
  paid: boolean;

  private email: string;
  private phone: string;

  @Output() done = new EventEmitter();

  constructor(private api: ApiService,
    private razorPay: RazorPayService,
    private appRef: ApplicationRef) { }

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

  selectPlan(plan: Plan)
  {
    if (this.paid)
      return;

    if (plan.cost != 0) {
      this.razorPay.initPay(this.phone,
        this.email,
        plan.cost,
        "ZAAA " + plan.name,
        response => {
          console.log(response.razorpay_payment_id);

          this.paid = true;

          this.api.setPlan(plan, response.razorpay_payment_id).subscribe(
            data => {
              this.done.emit();
              
              this.appRef.tick();
            },
            err => alert("Plan was not saved.\n\nContact support with reference no: " + response.razorpay_payment_id)
          );
        });
    }
    else {
      this.paid = true;
      
      this.api.setPlan(plan, '').subscribe(
        data => {
          this.done.emit();
        },
        err => alert("Plan was not saved.")
      );
    }
  }

}
