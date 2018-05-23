import { Component, OnInit } from '@angular/core';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MediaHouse } from '../media-house';
import { MediaHouseApiService } from '../media-house-api.service';
import { DialogService } from '@aaman/main/dialog.service';
import { PageData } from '@aaman/main/page-data';

@Component({
  selector: 'app-media-house-list',
  templateUrl: './media-house-list.component.html',
  styleUrls: ['./media-house-list.component.css']
})
export class MediaHouseListComponent implements OnInit {

  mediaHouses: MediaHouse[] = [];

  global: boolean;

  pageCount: number;
  page: number;

  query: string;
  searchFailed = false;

  constructor(private api: MediaHouseApiService,
    private dialog: DialogService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { list: PageData<MediaHouse>, global: boolean }) => {
      this.global = data.global;
      this.mediaHouses = data.list.list;
      this.pageCount = data.list.pageCount;
      this.page = data.list.page;
    });
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

  inputFormatter = (result: MediaHouse) => {
    this.router.navigateByUrl('/dir/media_houses/' + result.id);
  }

  deleteMediaHouse(mediaHouse: MediaHouse) {
    this.dialog.confirmDeletion("Are you sure you want to delete this Media House?").subscribe(confirm => {
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

  navigate(i: number) {
    this.router.navigate(['/dir/media_houses/list', i]);
  }
}
