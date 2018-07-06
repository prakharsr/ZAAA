import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Executive } from '../executive';
import { Firm } from 'app/models';
import { ExecutiveApiService } from '../executive-api.service';
import { NotificationService } from 'app/services';

@Component({
  selector: 'app-executive',
  templateUrl: './executive.component.html',
  styleUrls: ['./executive.component.css']
})
export class ExecutiveComponent implements OnInit {

  executive = new Executive();
  firm: Firm;
  backup = new Executive();

  id: string;
  new = false;

  editExecutiveDetails = false;
  editContactDetails = false;

  moreExecutiveDetails = false;
  moreContactDetails = false;
  
  constructor(private api: ExecutiveApiService,
    private route: ActivatedRoute,
    private router: Router,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');

        this.route.data.subscribe((data: { executive: Executive, firm: Firm }) => {
          this.executive = data.executive;
          this.firm = data.firm;
          Object.assign(this.backup, this.executive);
        });
      }
      else {
        this.new = true;
        this.editExecutiveDetails = this.editContactDetails = true;
        this.route.data.subscribe((data: { firm: Firm }) => {
          this.firm = data.firm;
        });
      }
    });
  }

  private stopEditing() {
    this.editExecutiveDetails = false;
    this.editContactDetails = false;
  }

  get editing() {
    return this.editExecutiveDetails
     || this.editContactDetails
  }

  submit() {
    if (this.new) {
      this.api.createExecutive(this.executive).subscribe(
        data => {
          if (data.success) {
            this.goToList();
          }
          else {
            console.log(data);
            
            this.notifications.show(data.msg);
          }
        }
      );
    }
    else {
      this.api.editExecutive(this.executive).subscribe(
        data => {
          if (data.success) {
            this.notifications.show("Saved");
          
            this.stopEditing();
          
            Object.assign(this.backup, this.executive);
          }
          else {
            console.log(data);
            
            this.notifications.show(data.msg);
          }
        }
      );
    }
  }

  cancel() {
    this.stopEditing();

    Object.assign(this.executive, this.backup);
  }

  private goToList() {
    this.router.navigateByUrl('/dir/executives');
  }

  cancelCreate() {
    this.goToList();
  }
}
