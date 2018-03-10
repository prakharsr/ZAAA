import { Component, OnInit } from '@angular/core';
import { DirExecutive } from '../dirExecutive';
import { ExecutiveApiService } from '../executive-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-executive-details',
  templateUrl: './executive-details.component.html',
  styleUrls: ['./executive-details.component.css']
})
export class ExecutiveDetailsComponent implements OnInit {

  executive = new DirExecutive();
  id: string;

  constructor(private api: ExecutiveApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.api.getExecutive(this.id).subscribe(data => this.executive = data);
    });
  }

}
