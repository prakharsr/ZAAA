import { Component, OnInit } from '@angular/core';
import { ReleaseOrderApiService } from '../release-order-api.service';
import { ReleaseOrder } from '../releaseOrder';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-release-order-list',
  templateUrl: './release-order-list.component.html',
  styleUrls: ['./release-order-list.component.css']
})
export class ReleaseOrderListComponent implements OnInit {

  releaseOrders = [];

  constructor(private api: ReleaseOrderApiService, private dialog: DialogService) { }

  ngOnInit() {
    this.api.getReleaseOrders().subscribe(data => this.releaseOrders = data);
  }

  deleteReleaseOrder(releaseOrder: ReleaseOrder) {
    this.dialog.confirm("Are you sure you want to delete this Release Order?").subscribe(confirm => {
      if (!confirm)
        return;

      this.api.deleteReleaseOrder(releaseOrder).subscribe(
        data => {
          if (data.success) {
            this.releaseOrders = this.releaseOrders.filter(c => c.id !== releaseOrder.id);
          }
          else {
            console.log(data);
          }
        },
        err => console.log(err)
      );
    });
  }

}
