import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() done = new EventEmitter();

  constructor(private api: ApiService,
    private razorPay: RazorPayService) { }

  ngOnInit() {
    this.api.plans.subscribe(data => this.plans = data);
  }

  selectPlan(plan: Plan)
  {
    if (this.paid)
      return;

    if (plan.cost != 0) {
      this.razorPay.initPay("8527852352",
        "mathew.sachin@outlook.com",
        plan.cost,
        "ZAAA " + plan.name,
        response => {
          console.log(response.razorpay_payment_id);

          this.paid = true;

          this.api.setPlan(plan, response.razorpay_payment_id).subscribe(
            data => this.done.emit(),
            err => alert("Plan was not saved.\n\nContact support with reference no: " + response.razorpay_payment_id)
          );
        });
    }
    else this.done.emit();
  }

}
