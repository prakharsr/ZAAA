import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { DirRoutingModule } from './dir-routing.module';

import {
  DirComponent,

  ClientListComponent,
  ClientComponent,
  ClientDetailsComponent,
  ClientResolver,
  ClientListResolver,
  ClientApiService,

  ExecutiveListComponent,
  ExecutiveComponent,
  ExecutiveDetailsComponent,
  ExecutiveResolver,
  ExecutiveListResolver,
  ExecutiveApiService,

  MediaHouseListComponent,
  MediaHouseComponent,
  MediaHouseResolver,
  MediaHouseListResolver,
  MediaHouseApiService
} from '.';

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
    ClientDetailsComponent,
    ExecutiveListComponent,
    ExecutiveDetailsComponent,
    MediaHouseListComponent
  ],
  providers: [
    ClientApiService,
    ExecutiveApiService,
    MediaHouseApiService,
    ClientResolver,
    ExecutiveResolver,
    MediaHouseResolver,
    ClientListResolver,
    ExecutiveListResolver,
    MediaHouseListResolver
  ]
})
export class DirectoryModule { }
