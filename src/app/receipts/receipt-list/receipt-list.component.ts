import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PaymentReceipt } from '../payment-receipt';
import { MediaHouse } from '../../directory/media-houses/media-house';
import { Client } from '../../directory/clients/client';
import { Executive } from '../../directory/executives/executive';
import { PageData } from '../../models/page-data';
import { ReleaseOrderSearchParams } from '../../release-order/release-order-search-params';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientApiService } from '../../directory/clients/client-api.service';
import { MediaHouseApiService } from '../../directory/media-houses/media-house-api.service';
import { ExecutiveApiService } from '../../directory/executives/executive-api.service';
import { of } from 'rxjs/observable/of';
import { NotificationService } from '../../services/notification.service';
import { DialogService } from '../../services/dialog.service';
import { ReceiptsApiService } from '../receipts-api.service';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.css']
})
export class ReceiptListComponent implements OnInit {

  receipts: PaymentReceipt[] = [];

  pageCount: number;
  page: number;

  mediaHouse;
  edition;
  client;
  executive;
  executiveOrg;

  pastDays = 0;

  constructor(private route: ActivatedRoute,
    private clientApi: ClientApiService,
    private mediaHouseApi: MediaHouseApiService,
    private executiveApi: ExecutiveApiService,
    private router: Router,
    private notifications: NotificationService,
    private dialog: DialogService,
    private api: ReceiptsApiService,
    private windowService: WindowService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: { list: PageData<PaymentReceipt>, search: ReleaseOrderSearchParams }}) => {
      this.receipts = data.resolved.list.list;

      this.pageCount = data.resolved.list.pageCount;
      this.page = data.resolved.list.page;

      let pub = new MediaHouse();
      pub.pubName = data.resolved.search.mediaHouse;
      pub.address.edition = data.resolved.search.edition;

      this.mediaHouse = this.edition = pub;
     
      let cl = new Client();
      cl.orgName = data.resolved.search.client;

      this.client = cl;

      let exe = new Executive();
      exe.executiveName = data.resolved.search.executive;
      exe.orgName = data.resolved.search.executiveOrg;

      this.executive = this.executiveOrg = exe;

      this.pastDays = data.resolved.search.past;
    });
  }

  searchClient = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.clientApi.searchClients(term))
      .catch(() => of([]));
  }

  clientNameFormatter = (client: Client) => client.orgName;
  
  searchExecutive = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.executiveApi.searchExecutives(term))
      .catch(() => of([]));
  }

  private get executiveName() {
    if (this.executive instanceof String) {
      return this.executive;
    }

    return this.executive ? this.executive.executiveName : null;
  }

  searchExecutiveOrg = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.executiveApi.searchExecutivesByOrg(this.executiveName, term))
      .catch(() => of([]));
  }

  executiveNameFormatter = (executive: Executive) => {
    this.executiveOrg = executive;

    return executive.executiveName;
  }
  
  executiveOrgFormatter = (executive: Executive) => executive.orgName;

  searchMediaHouse = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.mediaHouseApi.searchMediaHouses(term))
      .catch(() => of([]));
  }

  private get mediaHouseName() {
    if (this.mediaHouse instanceof String) {
      return this.mediaHouse;
    }

    return this.mediaHouse ? this.mediaHouse.pubName : null;
  }

  searchEdition = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.mediaHouseApi.searchMediaHousesByEdition(term, this.mediaHouseName))
      .catch(() => of([]));
  }

  editionFormatter = (mediaHouse: MediaHouse) => mediaHouse.address.edition;

  mediaHouseNameFormatter = (mediaHouse: MediaHouse) => {
    this.edition = mediaHouse;

    return mediaHouse.pubName;
  }

  gen(receipt: PaymentReceipt) {
    this.confirmGeneration(receipt).subscribe(confirm => {
      if (confirm) {
        this.api.generate(receipt).subscribe(data => {
          if (data.msg) {
            this.notifications.show(data.msg);
    
            receipt.generated = true;
          }
          else {
            console.log(data);
            
            let blob = new Blob([data], { type: 'application/pdf' });
            let url = this.windowService.window.URL.createObjectURL(blob);
    
            let a = this.windowService.window.document.createElement('a');
            a.download = 'receipt.pdf';
            a.href = url;
            a.click();
          }
        },
        err => {
          console.log(err);
    
          this.notifications.show("Connection failed");
        });
      }
    })
  }

  sendMsg(receipt: PaymentReceipt) {
    this.confirmGeneration(receipt).subscribe(confirm => {
      if (confirm) {
        this.dialog.getMailingDetails().subscribe(mailingDetails => {
          if (mailingDetails) {
            this.api.sendMail(receipt, mailingDetails).subscribe(data => {
              if (data.success) {
                this.notifications.show("Sent Successfully");

                receipt.generated = true;
              }
              else {
                console.log(data);

                this.notifications.show(data.msg);
              }
            },
            err => {
              console.log(err);

              this.notifications.show("Connection failed");
            });
          }
        });
      }
    });
  }

  private confirmGeneration(receipt: PaymentReceipt) : Observable<boolean> {
    if (receipt.generated) {
      return of(true);
    }

    return this.dialog.showYesNo('Confirm Generation', "Payment Receipt will be generated. Once generated it cannot be edited or deleted. Are you sure you want to continue?");
  }

  private get editionName() {
    if (this.edition instanceof String) {
      return this.edition;
    }

    return this.edition ? (this.edition.address ? this.edition.address.edition : null) : null;
  }

  private get clientName() {
    if (this.client instanceof String) {
      return this.client;
    }

    return this.client ? this.client.orgName : null;
  }

  private get exeOrg() {
    if (this.executiveOrg instanceof String) {
      return this.executiveOrg;
    }

    return this.executiveOrg ? this.executiveOrg.orgName : null;
  }

  search(pageNo: number) {
    this.router.navigate(['/receipts/list/', pageNo], {
      queryParams: new ReleaseOrderSearchParams(this.mediaHouseName, this.editionName, this.clientName, this.executiveName, this.exeOrg, this.pastDays)
    });
  }
}
