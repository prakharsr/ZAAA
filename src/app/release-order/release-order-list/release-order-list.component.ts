import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import {of} from 'rxjs/observable/of';
import { ReleaseOrder } from '../release-order';
import { ReleaseOrderApiService } from '../release-order-api.service';
import { DialogService, NotificationService } from 'app/services';
import { PageData } from 'app/models';
import { ReleaseOrderSearchParams } from '../release-order-search-params';

import {
  Client,
  MediaHouse,
  Executive,
  ClientApiService,
  MediaHouseApiService,
  ExecutiveApiService
} from 'app/directory';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';

class RoExpandable extends ReleaseOrder {
  expanded = false;
}

@Component({
  selector: 'app-release-order-list',
  templateUrl: './release-order-list.component.html',
  styleUrls: ['./release-order-list.component.css']
})
export class ReleaseOrderListComponent implements OnInit {

  releaseOrders: RoExpandable[] = [];

  pageCount: number;
  page: number;

  mediaHouse;
  edition;
  client;
  executive;
  executiveOrg;

  pastDays = 0;

  collapsed = true;

  constructor(private api: ReleaseOrderApiService,
    private dialog: DialogService,
    private route: ActivatedRoute,
    private notifications: NotificationService,
    private router: Router,
    private clientApi: ClientApiService,
    private mediaHouseApi: MediaHouseApiService,
    private executiveApi: ExecutiveApiService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: { list: PageData<ReleaseOrder>, search: ReleaseOrderSearchParams }}) => {
      this.init(data.resolved.list);

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

  private init(data: PageData<ReleaseOrder>) {
    this.releaseOrders = data.list.map(item => {
      return {
        ...item,
        expanded: false
      };
    });

    this.pageCount = data.pageCount;
    this.page = data.page;
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

  private confirmGeneration(releaseOrder: ReleaseOrder) : Observable<boolean> {
    if (releaseOrder.generated) {
      return of(true);
    }

    return this.dialog.showYesNo('Confirm Generation', "Release Order will be generated. Once generated it cannot be edited or deleted. Are you sure you want to continue?");
  }

  deleteReleaseOrder(releaseOrder: ReleaseOrder) {
    this.dialog.confirmDeletion("Are you sure you want to delete this Release Order?").subscribe(confirm => {
      if (!confirm)
        return;

      this.api.deleteReleaseOrder(releaseOrder).subscribe(
        data => {
          if (data.success) {
            this.releaseOrders = this.releaseOrders.filter(c => c.id !== releaseOrder.id);
          }
          else {
            console.log(data);

            this.notifications.show(data.msg);
          }
        }
      );
    });
  }

  pdf(releaseOrder: ReleaseOrder) {
    this.confirmGeneration(releaseOrder).subscribe(confirm => {
      if (confirm) {
        this.api.generatePdf(releaseOrder).subscribe(data => {
          if (data.msg) {
            this.notifications.show(data.msg);
          }
          else {
            releaseOrder.generated = true;

            console.log(data);
            
            let blob = new Blob([data], { type: 'application/pdf' });
            let url = URL.createObjectURL(blob);
    
            let a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = 'releaseorder.pdf';
            a.href = url;
            a.click();
          }
        });
      }
    })
  }

  sendMsg(releaseOrder: ReleaseOrder) {
    this.confirmGeneration(releaseOrder).subscribe(confirm => {
      if (confirm) {
        this.dialog.getMailingDetails().subscribe(mailingDetails => {
          if (mailingDetails) {
            this.api.sendMail(releaseOrder, mailingDetails).subscribe(data => {
              if (data.success) {
                this.notifications.show("Sent Successfully");

                releaseOrder.generated = true;
              }
              else {
                console.log(data);

                this.notifications.show(data.msg);
              }
            });
          }
        });
      }
    });
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
    this.router.navigate(['/releaseorders/list/', pageNo], {
      queryParams: new ReleaseOrderSearchParams(this.mediaHouseName, this.editionName, this.clientName, this.executiveName, this.exeOrg, this.pastDays)
    });
  }

  createInvoice(releaseorder: ReleaseOrder) {
    if (releaseorder.insertions.every(insertion => insertion.marked)) {
      this.notifications.show('No more insertions to create Invoices for');

      return;
    }

    this.router.navigate(['/invoices/new', releaseorder.id]);
  }

  generate(releaseOrder: ReleaseOrder) {
    this.api.generate(releaseOrder).subscribe(data => {
      if (data.success) {
        this.router.navigateByUrl('/releaseorders/generated');
      }
      else {
        this.notifications.show('Failed to Generate');
      }
    });
  }

  cancel(releaseOrder: ReleaseOrder) {
    this.dialog.showYesNo("Confirm Cancellation", "Do you want to cancel this Release Order? This cannot be undone.").subscribe(confirm => {
      if (confirm) {
        this.api.cancel(releaseOrder).subscribe(data => {
          if (!data.success) {
            this.notifications.show(data.msg);
          }
        });
      }
    });
  }

  toDate(date: NgbDate) {
    return new Date(date.year, date.month - 1, date.day);
  }
}
