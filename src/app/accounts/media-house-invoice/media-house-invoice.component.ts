import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { Insertion, ReleaseOrderApiService, ReleaseOrder } from 'app/release-order';
import { DialogService, NotificationService } from 'app/services';
import { MediaHouseInvoice } from '../media-house-invoice';
import { AccountsApiService } from '../accounts-api.service';
import { MediaHouseInvoiceDialogComponent } from '../media-house-invoice-dialog/media-house-invoice-dialog.component';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-media-house-invoice',
  templateUrl: './media-house-invoice.component.html',
  styleUrls: ['./media-house-invoice.component.css']
})
export class MediaHouseInvoiceComponent implements OnInit {

  insertionCheckList: { insertion: Insertion, checked: boolean }[] = [];

  selectedRoId = "";
  releaseOrder;

  constructor(private dialog: DialogService,
    private api: AccountsApiService,
    private route: ActivatedRoute,
    private notifications: NotificationService,
    private router: Router,
    private roApi: ReleaseOrderApiService) { }

  ngOnInit() {
  }

  searchRO = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.roApi.searchByNo(term).pipe(
        map(data => data.filter(ro => !ro.cancelled))
      ))
      .catch(() => of([]));
  }

  roNoFormatter = (releaseOrder: ReleaseOrder) => {
    this.insertionCheckList = releaseOrder.insertions
      .filter(insertion => !insertion.mhimarked)
      .map(insertion => {
      return {
        insertion: insertion,
        checked: false
      };
    });

    this.selectedRoId = releaseOrder.id;

    return releaseOrder.releaseOrderNO;
  }

  get canProceed() {
    return this.insertionCheckList.some(insertion => insertion.checked);
  }

  show() {
    let insertions = this.insertionCheckList
    .filter(item => item.checked)
    .map(item => {
      return{
        ...item.insertion,
        insertionDate: this.toDate(item.insertion.date),
        Amount: 0,
        collectedAmount: 0,
        pendingAmount: 0,
      }
    });

    this.dialog.show(MediaHouseInvoiceDialogComponent, {
      data: { ro: this.releaseOrder, insertions: insertions }
    }).subscribe((invoice: MediaHouseInvoice) => {
      if (invoice) {
        this.api.createMediaHouseInvoice(invoice).subscribe(data => {
          if (data.success) {
            this.router.navigate(['/accounts/mediahouseinvoice']);
          }
          else {
            console.log(data);

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