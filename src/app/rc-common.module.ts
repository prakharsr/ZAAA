import { NgModule } from "@angular/core";

import {
  RateCardComponent,
  RateCardListComponent,
  RateCardDetailsComponent
} from "./rate-card";

import { BaseModule } from "./base.module";

let components = [
  RateCardComponent,
  RateCardListComponent,
  RateCardDetailsComponent
];

@NgModule({
  imports: [BaseModule],
  declarations: components
})
export class RcCommonModule { }
