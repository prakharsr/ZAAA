import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import { DirApiService } from './dir-api.service';

import { DirClientComponent } from './dir-client/dir-client.component';
import { DirExecutiveComponent } from './dir-executive/dir-executive.component';
import { DirMediaHouseComponent } from './dir-media-house/dir-media-house.component';

@NgModule({
  imports: [
    BaseModule
  ],
  declarations: [
    DirClientComponent,
    DirExecutiveComponent,
    DirMediaHouseComponent
  ],
  providers: [
    DirApiService
  ]
})
export class DirectoryModule { }
