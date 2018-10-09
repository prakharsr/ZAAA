import { Component, OnInit } from '@angular/core';
import { ReportsApiService } from '../reports-api.service';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from 'app/services';

@Component({
  selector: 'app-reports-home',
  templateUrl: './reports-home.component.html',
  styleUrls: ['./reports-home.component.css']
})
export class ReportsHomeComponent implements OnInit {

  creationPeriod = 0;
  updationPeriod = 0;
  insertionPeriod = 0;

  constructor(private api: ReportsApiService,
    private notifications: NotificationService) { }

  ngOnInit() {
  }

  private download(base: Observable<any>, fileName: string) {
    base.subscribe(data => {
      if (data.msg) {
        this.notifications.show(data.msg);
      }
      else {
        console.log(data);
        
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        let url = URL.createObjectURL(blob);

        let a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = `${fileName}.xlsx`;
        a.href = url;
        a.click();
      }
    });
  }

  mediaHouse() {
    this.download(this.api.mediaHouseReport(this.creationPeriod, this.updationPeriod), 'media-houses');
  }

  client() {
    this.download(this.api.clientReport(this.creationPeriod, this.updationPeriod), 'clients');
  }

  executive() {
    this.download(this.api.executiveReport(this.creationPeriod, this.updationPeriod), 'executives');
  }

  invoice() {
    this.download(this.api.invoiceReport(this.creationPeriod, this.updationPeriod), 'invoices');
  }

  ro() {
    this.download(this.api.releaseOrderReport(this.creationPeriod, this.updationPeriod), 'release-orders');
  }

  receipt() {
    this.download(this.api.receiptReport(this.creationPeriod, this.updationPeriod), 'receipts');
  }

  mhi() {
    this.download(this.api.mediaHouseInvoiceReport(this.creationPeriod, this.updationPeriod), 'media-house-invoices');
  }

  mhNote() {
    this.download(this.api.mediaHouseNotesReport(this.creationPeriod, this.updationPeriod), 'media-house-notes');
  }

  clientNote() {
    this.download(this.api.clientNotesReport(this.creationPeriod, this.updationPeriod), 'client-notes');
  }

  ratecard() {
    this.download(this.api.ratecardReport(this.creationPeriod, this.updationPeriod), 'rate-cards');
  }

  insertions() {
    this.download(this.api.insertionsReport(this.creationPeriod, this.updationPeriod, this.insertionPeriod), 'insertions');
  }
}
