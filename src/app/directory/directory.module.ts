import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import {
  DirComponent,
  DirRoutingModule,

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
  MediaHouseDetailsComponent,
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
    MediaHouseListComponent,
    MediaHouseDetailsComponent
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
