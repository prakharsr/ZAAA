import { Component, OnInit } from '@angular/core';
import { RateCard } from '../rateCard';
import { RateCardApiService } from '../rate-card-api.service';
import { DialogService } from '../../services/dialog.service';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rate-card-list',
  templateUrl: './rate-card-list.component.html',
  styleUrls: ['./rate-card-list.component.css']
})
export class RateCardListComponent implements OnInit {

  ratecards: RateCard[] = [];

  query: string;
  searchFailed = false;

  constructor(private api: RateCardApiService, private dialog: DialogService, private router: Router) { }

  ngOnInit() {
    this.api.getRateCards().subscribe(data => this.ratecards = data);
  }

  search = (text: Observable<string>) =>
    text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term =>
        this.api.searchRateCards(term)
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }));

  inputFormatter = (result: RateCard) => {
    this.router.navigateByUrl('/dir/ratecards/' + result.id);
  }

  deleteRateCard(ratecard: RateCard) {
    this.dialog.confirm("Are you sure you want to delete this Rate Card?").subscribe(confirm => {
      if (!confirm)
        return;

      this.api.deleteRateCard(ratecard).subscribe(
        data => {
          if (data.success) {
            this.ratecards = this.ratecards.filter(c => c.id !== ratecard.id);
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
