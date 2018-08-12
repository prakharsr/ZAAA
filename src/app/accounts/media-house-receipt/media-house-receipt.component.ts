import { Component, OnInit } from '@angular/core';
import { MediaHouseApiService, MediaHouse } from 'app/directory';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsApiService, MhReceiptResponse, MhiReceiptInsertion } from '../accounts-api.service';
import { NotificationService } from 'app/services';
import { ReleaseOrderSearchParams } from 'app/release-order';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-media-house-receipt',
  templateUrl: './media-house-receipt.component.html',
  styleUrls: ['./media-house-receipt.component.css']
})
export class MediaHouseReceiptComponent implements OnInit {

  list: MhReceiptResponse[] = [];

  mediaHouse;
  edition;

  constructor(private mediaHouseApi: MediaHouseApiService,
    private route: ActivatedRoute,
    private api: AccountsApiService,
    private notifications: NotificationService,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: { list: MhReceiptResponse[], search: ReleaseOrderSearchParams }}) => {
      this.list = data.resolved.list;

      let pub = new MediaHouse();
      pub.pubName = data.resolved.search.mediaHouse;
      pub.address.edition = data.resolved.search.edition;

      this.mediaHouse = this.edition = pub;
    });
  }

  search() {
    this.router.navigate(['/accounts/mediahousereceipts/'], {
      queryParams: new ReleaseOrderSearchParams(this.mediaHouseName, this.editionName, null, null, null, 0)
    })
  }

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

  private get editionName() {
    if (this.edition instanceof String) {
      return this.edition;
    }

    return this.edition ? (this.edition.address ? this.edition.address.edition : null) : null;
  }

  submit() {
    let mapped: MhiReceiptInsertion[] = [];

    this.list.forEach(item => {
      item.entries.filter(entry => entry.receiptNumber != null).forEach(entry => {
        mapped.push({
          _id: entry._id,
          receiptDate: entry.receiptDate,
          receiptNumber: entry.receiptNumber
        });
      })
    });

    if (mapped.length == 0) {
      this.notifications.show('Nothing to submit');

      return;
    }

    this.api.updateMhiReceipts(mapped).subscribe(data => {
      if (data.success) {
        this.notifications.show('Success');
      }
      else {
        console.log(data);

        this.notifications.show(data.msg);
      }
    });
  }
}
