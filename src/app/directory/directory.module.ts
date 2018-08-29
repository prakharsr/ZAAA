import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import {
  DirComponent,

  ClientListComponent,
  ClientComponent,

  ExecutiveListComponent,
  ExecutiveComponent,

  MediaHouseListComponent,
  MediaHouseComponent,
} from '.';

import { DirRoutingModule } from './dir-routing.module';

@NgModule({
  imports: [
    BaseModule,
    DirRoutingModule
  ],
  declarations: [
    ClientComponent,
    ExecutiveComponent,
    MediaHouseComponent,
    DirComponent,
    ClientListComponent,
    ExecutiveListComponent,
    MediaHouseListComponent
  ]
})
export class DirectoryModule { }
