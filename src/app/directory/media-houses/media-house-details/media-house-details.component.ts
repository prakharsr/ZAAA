import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaHouse } from '@aaman/dir/media-houses/media-house';
import { MediaHouseApiService } from '@aaman/dir/media-houses/media-house-api.service';

@Component({
  selector: 'app-media-house-details',
  templateUrl: './media-house-details.component.html',
  styleUrls: ['./media-house-details.component.css']
})
export class MediaHouseDetailsComponent implements OnInit {

  mediaHouse = new MediaHouse();
  id: string;

  constructor(private api: MediaHouseApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data: { mediaHouse: MediaHouse }) => {
      this.mediaHouse = data.mediaHouse;
    });
  }

}
