import { Component, OnInit } from '@angular/core';
import { TnC, ApiService } from 'app/services';
import { ActivatedRoute } from '@angular/router';
import { Firm } from '../../models';

@Component({
  selector: 'app-tnc',
  templateUrl: './tnc.component.html',
  styleUrls: ['./tnc.component.css']
})
export class TncComponent implements OnInit {

  tnc = new TnC();
  firm: Firm;

  constructor(private api: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.api.tnc.subscribe(data => {
      this.tnc = data;

      this.route.data.subscribe((data: { firm: Firm }) => {
        this.firm = data.firm;

        if (!this.tnc.Jurisdiction) {
          let city = "City*";

          if (this.firm.registeredAddress && this.firm.registeredAddress.city) {
            city = this.firm.registeredAddress.city;
          }

          this.tnc.Jurisdiction = `All disputes are subject to ${city} Jurisdiction.`;
        }

        if (!this.tnc.ROterms || !this.tnc.ROterms.length) {
          this.tnc.ROterms = [
            'Acceptance advice should be sent us immediately.',
            'Please mention RO No. and Date while billing.',
            'Please enclosed Full Tear Sheet / Advertisement Certificate with the bill.',
            'Insertion missed should advice to us immediately.',
            'We reserve the right to refuse the payment of advertisement which is not publish according to the RO details.'
          ];
        }

        if (!this.tnc.INterms || !this.tnc.INterms.length) {
          let firmName  = this.firm.name || 'Firm Name*'

          this.tnc.INterms = [
            'Payment Should be cleared within 10 days.',
            'Late Payment will liable of interest @ 24% per annum.',
            `Cheque / DD / Electronic payment should be in favour of "${firmName}".`,
            'No dispute is liable against inserted advertisement which is not considered by respected Media House.'
          ]
        }
      });
    });
  }

  submit () {}
}
