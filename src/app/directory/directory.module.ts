import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import {
  DirComponent,

  ClientListComponent,
  ClientComponent,
  ClientResolver,
  ClientListResolver,
  ClientApiService,

  ExecutiveListComponent,
  ExecutiveComponent,
  ExecutiveResolver,
  ExecutiveListResolver,
  ExecutiveApiService,

  MediaHouseListComponent,
  MediaHouseComponent,
  MediaHouseResolver,
  MediaHouseListResolver,
  MediaHouseApiService
} from '.';

import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    BaseModule
  ],
  declarations: [
    ClientComponent,
    ExecutiveComponent,
    MediaHouseComponent,
    DirComponent,
    ClientListComponent,
    ExecutiveListComponent,
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
