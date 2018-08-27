import { NgModule } from "@angular/core";

import {
  NgbRatingModule,
  NgbDatepickerModule,
  NgbTypeaheadModule,
  NgbCollapseModule
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    NgbRatingModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    NgbTypeaheadModule.forRoot(),
    NgbCollapseModule.forRoot()
  ],
  exports: [
    NgbRatingModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbCollapseModule
  ],
  declarations: []
})
export class NgBootstrapModule { }  