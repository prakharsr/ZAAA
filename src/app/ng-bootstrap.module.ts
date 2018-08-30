import { NgModule } from "@angular/core";

import * as ngb from '@ng-bootstrap/ng-bootstrap';

const modules = [
  ngb.NgbRatingModule,
  ngb.NgbDatepickerModule,
  ngb.NgbTypeaheadModule,
  ngb.NgbCollapseModule
]

@NgModule({
  imports: modules.map(M => M.forRoot()),
  exports: modules,
  declarations: []
})
export class NgBootstrapModule { }  