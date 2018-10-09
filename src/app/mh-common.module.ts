import { NgModule } from "@angular/core";
import { MediaHouseComponent, MediaHouseListComponent } from "./directory";
import { BaseModule } from "./base.module";

let components = [
  MediaHouseComponent,
  MediaHouseListComponent
];

@NgModule({
  imports: [BaseModule],
  declarations: components
})
export class MhCommonModule { }
