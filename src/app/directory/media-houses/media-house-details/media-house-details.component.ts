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
    this.route.data.subscribe((data: { mediaHouse: DirMediaHouse }) => {
      this.mediaHouse = data.mediaHouse;
    });
  }

}
