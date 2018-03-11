import { Component, OnInit } from '@angular/core';
import { DirMediaHouse } from '../dirMediaHouse';
import { MediaHouseApiService } from '../media-house-api.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-media-house-list',
  templateUrl: './media-house-list.component.html',
  styleUrls: ['./media-house-list.component.css']
})
export class MediaHouseListComponent implements OnInit {

  mediaHouses: DirMediaHouse[] = [];

  constructor(private api: MediaHouseApiService, private dialog: DialogService) { }

  ngOnInit() {
    this.api.getMediaHouses().subscribe(data => this.mediaHouses = data);
  }

  deleteMediaHouse(mediaHouse: DirMediaHouse) {
    this.dialog.confirm("Are you sure you want to delete this Media House?").subscribe(confirm => {
      if (!confirm)
        return;

      this.api.deleteMediaHouse(mediaHouse).subscribe(
        data => {
          if (data.success) {
            this.mediaHouses = this.mediaHouses.filter(c => c.id !== mediaHouse.id);
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
