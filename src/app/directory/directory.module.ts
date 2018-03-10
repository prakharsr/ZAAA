import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { DirRoutingModule } from './dir-routing.module';

import { DirApiService } from './dir-api.service';

import { DirClientComponent } from './dir-client/dir-client.component';
import { DirExecutiveComponent } from './dir-executive/dir-executive.component';
import { DirMediaHouseComponent } from './dir-media-house/dir-media-house.component';
import { DirComponent } from './dir/dir.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailsComponent } from './client-details/client-details.component';

@NgModule({
  imports: [
    BaseModule,
    DirRoutingModule
  ],
  declarations: [
    DirClientComponent,
    DirExecutiveComponent,
    DirMediaHouseComponent,
    DirComponent,
    ClientListComponent,
    ClientDetailsComponent
  ],
  providers: [
    DirApiService
  ]
})
export class DirectoryModule { }
