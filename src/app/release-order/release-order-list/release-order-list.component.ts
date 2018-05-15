import { Component, OnInit } from '@angular/core';
import { ReleaseOrderApiService } from '../release-order-api.service';
import { DialogService } from '../../services/dialog.service'
import { Observable } from 'rxjs/Observable';
import { ReleaseOrder } from '../release-order';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MailingDetails } from '../../models/mailing-details';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import {of} from 'rxjs/observable/of';
import { ClientApiService } from '../../directory/clients/client-api.service';
import { MediaHouseApiService } from '../../directory/media-houses/media-house-api.service';
import { ExecutiveApiService } from '../../directory/executives/executive-api.service';
import { Client } from '../../directory/clients/client';
import { Executive } from '../../directory/executives/executive';
import { MediaHouse } from '../../directory/media-houses/media-house';
import { WindowService } from '../../services/window.service';
import { PageData } from '../../models/page-data';

@Component({
  selector: 'app-release-order-list',
  templateUrl: './release-order-list.component.html',
  styleUrls: ['./release-order-list.component.css']
})
export class ReleaseOrderListComponent implements OnInit {

  releaseOrders = [];

  displayedColumns = ['data', 'action'];
  dataSource = new MatTableDataSource();

  pageCount: number;
  page: number;

  dummyArray;

  mediaHouse;
  edition;
  client;
  executive;
  executiveOrg;

  pastDays = 0;

  constructor(private api: ReleaseOrderApiService,
    private dialog: DialogService,
    private route: ActivatedRoute,
    private notifications: NotificationService,
    private router: Router,
    private clientApi: ClientApiService,
    private mediaHouseApi: MediaHouseApiService,
    private executiveApi: ExecutiveApiService,
    private windowService: WindowService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { list: PageData<ReleaseOrder> }) => {
      this.init(data.list);
    });
  }

  private init(data: PageData<ReleaseOrder>) {
    this.releaseOrders = data.list;

    this.dataSource.data = this.releaseOrders;

    this.pageCount = data.pageCount;
    this.page = data.page;

    this.dummyArray = Array(this.pageCount);
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
    return this.executive ? (this.executive.executiveName ? this.executive.executiveName : this.executive) : null;
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
    return this.mediaHouse ? (this.mediaHouse.pubName ? this.mediaHouse.pubName : this.mediaHouse) : null;
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

  deleteReleaseOrder(releaseOrder: ReleaseOrder) {
    this.dialog.confirmDeletion("Are you sure you want to delete this Release Order?").subscribe(confirm => {
      if (!confirm)
        return;

      this.api.deleteReleaseOrder(releaseOrder).subscribe(
        data => {
          if (data.success) {
            this.dataSource.data = this.releaseOrders = this.releaseOrders.filter(c => c.id !== releaseOrder.id);
          }
          else {
            console.log(data);

            this.notifications.show(data.msg);
          }
        },
        err => {
          console.log(err);

          this.notifications.show("Connection failed");
        }
      );
    });
  }

  gen(releaseOrder: ReleaseOrder) {
    this.api.generate(releaseOrder).subscribe(data => {
      if (data.msg) {
        this.notifications.show(data.msg);
      }
      else {
        console.log(data);
        
        let blob = new Blob([data], { type: 'application/pdf' });
        let url = this.windowService.window.URL.createObjectURL(blob);

        let a = this.windowService.window.document.createElement('a');
        a.download = 'releaseorder.pdf';
        a.href = url;
        a.click();
      }
    },
    err => {
      console.log(err);

      this.notifications.show("Connection failed");
    });
  }

  sendMsg(releaseOrder: ReleaseOrder) {
    this.dialog.getMailingDetails().subscribe(mailingDetails => {
      if (mailingDetails) {
        this.api.sendMail(releaseOrder, mailingDetails).subscribe(data => {
          if (data.success) {
            this.notifications.show("Sent Successfully");
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

  private get editionName() {
    return this.edition ? (this.edition.address ? this.edition.address.edition : this.edition) : null;
  }

  private get clientName() {
    return this.client ? (this.client.orgName ? this.client.orgName : this.client) : null;
  }

  private get exeOrg() {
    return this.executiveOrg ? (this.executiveOrg.orgName ? this.executiveOrg.orgName : this.executiveOrg) : null;
  }

  search() {
    this.api.searchReleaseOrders(this.mediaHouseName, this.editionName, this.clientName, this.executiveName, this.exeOrg, this.pastDays).subscribe(data => {
      this.init(data);

      this.notifications.show('Searched')
    },
    err => {
      console.log(err);

      this.notifications.show('Connection failed');
    });
  }
}
