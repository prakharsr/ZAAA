import { Component, OnInit } from '@angular/core';
import { DirMediaHouse } from '../dirMediaHouse';
import { MediaHouseApiService } from '../media-house-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-media-house-details',
  templateUrl: './media-house-details.component.html',
  styleUrls: ['./media-house-details.component.css']
})
export class MediaHouseDetailsComponent implements OnInit {

  mediaHouse = new DirMediaHouse();
  id: string;

  constructor(private api: MediaHouseApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.api.getMediaHouse(this.id).subscribe(data => this.mediaHouse = data);
    });
  }

}
