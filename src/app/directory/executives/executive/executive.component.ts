import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Executive } from '@aaman/dir/executives/executive';
import { Firm } from '@aaman/main/firm';
import { ExecutiveApiService } from '@aaman/dir/executives/executive-api.service';
import { NotificationService } from '@aaman/main/notification.service';

@Component({
  selector: 'app-executive',
  templateUrl: './executive.component.html',
  styleUrls: ['./executive.component.css']
})
export class ExecutiveComponent implements OnInit {

  executive = new Executive();
  firm: Firm;

  // dobModel;

  id: string;

  edit = false;
  
  constructor(private api: ExecutiveApiService,
    private route: ActivatedRoute,
    private router: Router,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');

        this.edit = true;

        this.route.data.subscribe((data: { executive: Executive, firm: Firm }) => {
          this.executive = data.executive;
          this.firm = data.firm;
        });
      }
      else {
        this.route.data.subscribe((data: { firm: Firm }) => {
          this.firm = data.firm;
        });
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
          this.notifications.show(data.msg);
        }
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
          this.notifications.show(data.msg);
        }
      }
    )
  }

  submit() {
    if (this.edit) {
      this.editExecutive();
    }
    else this.createExecutive();
  }

  cancel() {
    this.goBack();
  }

}
