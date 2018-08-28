import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceDir } from '../../invoice';

@Component({
  selector: 'app-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.css']
})
export class CreateReceiptComponent implements OnInit {

  advance = false;
  invoiceDir: InvoiceDir;

  allowAdvance = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { advance: boolean, resolved: InvoiceDir }) => {
      this.advance = data.advance;
      this.invoiceDir = data.resolved;
    });
  }

}
