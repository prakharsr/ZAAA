import { Component, OnInit } from '@angular/core';
import { DirMediaHouse } from '../dirMediaHouse';
import { MediaHouseApiService } from '../media-house-api.service';
import { DialogService } from '../../../services/dialog.service';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-media-house-list',
  templateUrl: './media-house-list.component.html',
  styleUrls: ['./media-house-list.component.css']
})
export class MediaHouseListComponent implements OnInit {

  mediaHouses: DirMediaHouse[] = [];

  query: string;
  searchFailed = false;

  constructor(private api: MediaHouseApiService, private dialog: DialogService, private router: Router) { }

  ngOnInit() {
    this.api.getMediaHouses().subscribe(data => this.mediaHouses = data);
  }

  search = (text: Observable<string>) =>
    text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term =>
        this.api.searchMediaHouses(term)
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }));

  inputFormatter = (result: DirMediaHouse) => {
    this.router.navigateByUrl('/dir/media_houses/' + result.id);
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
