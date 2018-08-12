import { Component, OnInit } from '@angular/core';
import { MediaHouseApiService, MediaHouse } from 'app/directory';
import { ActivatedRoute } from '@angular/router';
import { AccountsApiService, MhReceiptResponse } from '../accounts-api.service';
import { NotificationService } from 'app/services';
import { ReleaseOrderSearchParams } from 'app/release-order';

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
    private notifications: NotificationService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: { list: MhReceiptResponse[], search: ReleaseOrderSearchParams }}) => {
      this.list = data.resolved.list;

      let pub = new MediaHouse();
      pub.pubName = data.resolved.search.mediaHouse;
      pub.address.edition = data.resolved.search.edition;

      this.mediaHouse = this.edition = pub;
    });
  }

}
