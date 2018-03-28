import { Component, OnInit } from '@angular/core';
import { ReleaseOrder } from '../releaseOrder';
import { ReleaseOrderApiService } from '../release-order-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-release-order-details',
  templateUrl: './release-order-details.component.html',
  styleUrls: ['./release-order-details.component.css']
})
export class ReleaseOrderDetailsComponent implements OnInit {

  releaseOrder = new ReleaseOrder();
  id: string;

  constructor(private api: ReleaseOrderApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.api.getReleaseOrder(this.id).subscribe(data => this.releaseOrder = data);
    });
  }
}
