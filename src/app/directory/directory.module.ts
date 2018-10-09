import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import {
  DirComponent,

  ClientListComponent,
  ClientComponent,

  ExecutiveListComponent,
  ExecutiveComponent
} from '.';

import { DirRoutingModule } from './dir-routing.module';
import { MhCommonModule } from '../mh-common.module';

@NgModule({
  imports: [
    BaseModule,
    MhCommonModule,
    DirRoutingModule
  ],
  declarations: [
    ClientComponent,
    ExecutiveComponent,
    DirComponent,
    ClientListComponent,
    ExecutiveListComponent
  ]
})
export class DirectoryModule { }
