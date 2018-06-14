import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { MediaHouseInvoiceItem } from '../media-house-invoice-item';
import { AccountsApiService } from '../accounts-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaHouseApiService, MediaHouse } from 'app/directory';
import { PageData } from 'app/models';
import { ReleaseOrderSearchParams } from 'app/release-order';

@Component({
  selector: 'app-media-house-invoice-list',
  templateUrl: './media-house-invoice-list.component.html',
  styleUrls: ['./media-house-invoice-list.component.css']
})
export class MediaHouseInvoiceListComponent implements OnInit {

  mediaHouse;
  edition;

  pastDays = 0;

  page: number;
  pageCount: number;

  list: MediaHouseInvoiceItem[] = [];

  constructor(private api: AccountsApiService,
    private route: ActivatedRoute,
    private router: Router,
    private mediaHouseApi: MediaHouseApiService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: { list: PageData<MediaHouseInvoiceItem>, search: ReleaseOrderSearchParams } }) => {
      this.list = data.resolved.list.list;
      this.page = data.resolved.list.page;
      this.pageCount = data.resolved.list.pageCount;

      let pub = new MediaHouse();
      pub.pubName = data.resolved.search.mediaHouse;
      pub.address.edition = data.resolved.search.edition;

      this.mediaHouse = this.edition = pub;

      this.pastDays = data.resolved.search.past;
    });
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

  search(pageNo: number) {
    this.router.navigate(['/accounts/mediahouseinvoice/list/', pageNo], {
      queryParams: new ReleaseOrderSearchParams(this.mediaHouseName, this.editionName, null, null, null, this.pastDays)
    })
  }

}
