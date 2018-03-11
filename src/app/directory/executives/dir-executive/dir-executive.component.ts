import { Component, OnInit } from '@angular/core';
import { DirExecutive } from '../dirExecutive';
import { ExecutiveApiService } from '../executive-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dir-executive',
  templateUrl: './dir-executive.component.html',
  styleUrls: ['./dir-executive.component.css']
})
export class DirExecutiveComponent implements OnInit {

  executive = new DirExecutive();
  error: string;

  id: string;

  edit = false;
  
  constructor(private api: ExecutiveApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');

        this.edit = true;

        this.api.getExecutive(this.id).subscribe(data => this.executive = data);
      }
    });
  }

  private goBack() {
    this.router.navigateByUrl(this.edit ? '/dir/executives/' + this.id : '/dir/executives');
  }

  private createExecutive() {
    this.api.createExecutive(this.executive).subscribe(
      data => {
        if (data.success) {
          this.goBack();
        }
        else {
          this.error = data.msg;
        }
      },
      err => {
        console.log(err);

        this.error = 'Connection failed';
      }
    )
  }

  private editExecutive() {
    this.api.editExecutive(this.executive).subscribe(
      data => {
        if (data.success) {
          this.goBack();
        }
        else {
          this.error = data.msg;
        }
      },
      err => {
        console.log(err);

        this.error = 'Connection failed';
      }
    )
  }

  submit() {
    this.error = '';

    if (this.edit) {
      this.editExecutive();
    }
    else this.createExecutive();
  }

  cancel() {
    this.goBack();
  }

}
