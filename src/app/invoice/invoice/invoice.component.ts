import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReleaseOrder, Insertion } from '../../release-order/release-order';
import { Invoice } from '../invoice';

class AvailableInsertion {
  constructor(public insertion: Insertion, public checked = false) { }
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoice = new Invoice();
  releaseOrder: ReleaseOrder;

  availableInsertions: AvailableInsertion[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { releaseOrder: ReleaseOrder }) => {
      this.releaseOrder = data.releaseOrder;

      this.invoice.releaseOrder = data.releaseOrder.id;

      this.releaseOrder.insertions.forEach(element => {
        if (!element.marked) {
          this.availableInsertions.push(new AvailableInsertion(element));
        }
      });
    });
  }

}
