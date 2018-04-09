import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {

  private _loading = false;

  constructor() { }

  show() {
    this._loading = true;
  }

  hide() {
    setTimeout(() => this._loading = false, 300);
  }

  get loading() {
    return this._loading;
  }

}
