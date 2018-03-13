import { Component, OnInit } from '@angular/core';
import { RateCard } from '../rateCard';
import { RateCardApiService } from '../rate-card-api.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-rate-card-list',
  templateUrl: './rate-card-list.component.html',
  styleUrls: ['./rate-card-list.component.css']
})
export class RateCardListComponent implements OnInit {

  ratecards: RateCard[] = [];

  constructor(private api: RateCardApiService, private dialog: DialogService) { }

  ngOnInit() {
    this.api.getRateCards().subscribe(data => this.ratecards = data);
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
