import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() page = 1;

  private _pageCount = 1;

  @Input() set pageCount(pageCount: number) {
    this._pageCount = pageCount;

    this.dummyArray = new Array(pageCount);
  };

  get pageCount() {
    return this._pageCount;
  }

  dummyArray;

  @Output() navigate = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
