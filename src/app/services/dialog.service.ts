import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WindowService } from './window.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class DialogService {

  constructor(private winRef: WindowService) { }

  confirm(msg: string) : Observable<boolean> {
    const confirmation = this.winRef.window.confirm(msg);

    return of(confirmation);
  }
}
