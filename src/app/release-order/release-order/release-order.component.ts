import { Component, OnInit } from '@angular/core';
import { ReleaseOrder } from '../releaseOrder';

@Component({
  selector: 'app-release-order',
  templateUrl: './release-order.component.html',
  styleUrls: ['./release-order.component.css']
})
export class ReleaseOrderComponent implements OnInit {

  releaseorder = new ReleaseOrder();
  error: string;

  constructor() { }

  ngOnInit() {
  }

  cancel() {}

  submit() {}
}
