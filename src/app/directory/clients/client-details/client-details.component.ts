import { Component, OnInit } from '@angular/core';
import { DirClient } from '../dirClient';
import { DirApiService } from '../../dir-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  client = new DirClient();
  id: string;

  constructor(private api: DirApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.api.getClient(this.id).subscribe(data => this.client = data);
    });
  }

}
