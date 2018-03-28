import { Component, OnInit } from '@angular/core';
import { RateCard } from '../rateCard';
import { RateCardApiService } from '../rate-card-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rate-card-details',
  templateUrl: './rate-card-details.component.html',
  styleUrls: ['./rate-card-details.component.css']
})
export class RateCardDetailsComponent implements OnInit {

  ratecard = new RateCard();
  id: string;

  constructor(private api: RateCardApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.api.getRateCard(this.id).subscribe(data => this.ratecard = data);
    });
  }

}
