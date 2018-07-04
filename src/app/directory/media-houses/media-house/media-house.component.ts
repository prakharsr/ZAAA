import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaHouse, MediaHouseScheduling, Pullout } from '../media-house';
import { MediaHouseApiService } from '../media-house-api.service';
import { StateApiService, NotificationService } from 'app/services';

@Component({
  selector: 'app-media-house',
  templateUrl: './media-house.component.html',
  styleUrls: ['./media-house.component.css']
})
export class MediaHouseComponent implements OnInit {

  mediaHouse = new MediaHouse();
  
  id: string;
  edit = false;

  MainPullout = new Pullout;

  periods = ['Daily', 'Weekly', 'BiWeekly', 'Monthly'];
  mediaTypes = ['Print', 'Air', 'Electronic'];

  editPublicationDetails = false;
  editPulloutDetails = false;
  editContactDetails = false;
  editSchedulingDetails = false;

  morePublicationDetails = false;
  morePulloutDetails = false;
  moreContactDetails = false;

  backup = new MediaHouse();

  constructor(private api: MediaHouseApiService,
    private route: ActivatedRoute,
    private router: Router,
    public stateApi: StateApiService,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.edit = true

        this.route.data.subscribe((data: { mediaHouse: MediaHouse }) => {
          this.mediaHouse = data.mediaHouse;
          Object.assign(this.backup, this.mediaHouse);
        });
      }
      else {
        this.mediaHouse.mediaType = this.mediaTypes[0];
        this.addMainPullout();
      }
    });
  }

  private stopEditing() {
    this.editPublicationDetails = false;
    this.editPulloutDetails = false;
    this.editContactDetails = false;
    this.editSchedulingDetails = false;
  }

  get editing() {
    return this.editPublicationDetails
     || this.editPulloutDetails
     || this.editContactDetails
     || this.editSchedulingDetails;
  }

  addScheduling() {
    this.mediaHouse.scheduling.push(new MediaHouseScheduling());
  }

  addMainPullout() {
    this.MainPullout.Name = 'Main';
    this.mediaHouse.pullouts.push(this.MainPullout);
  }

  addPullouts() {
    this.mediaHouse.pullouts.push(new Pullout());
  }

  removePullouts(i: number) {
    this.mediaHouse.pullouts.splice(i, 1);
  }

  removeScheduling(i: number) {
    this.mediaHouse.scheduling.splice(i, 1);
  }
  
  private createMediaHouse() {
    this.api.createMediaHouse(this.mediaHouse).subscribe(
      data => {
        if (data.success) {
          this.notifications.show("Saved");
          this.stopEditing();
          Object.assign(this.backup, this.mediaHouse);
        }
        else {
          console.log(data);
          this.notifications.show(data.msg);
        }
      }
    )
  }

  private editMediaHouse() {
    this.api.editMediaHouse(this.mediaHouse).subscribe(
      data => {
        if (data.success) {
          this.notifications.show("Saved");
          this.stopEditing();
          Object.assign(this.backup, this.mediaHouse);
        }
        else {
          console.log(data);
          this.notifications.show(data.msg);
        }
      }
    )
  }

  submit () {
    if (this.edit) {
      this.editMediaHouse();
    }
    else this.createMediaHouse();
  }


  cancel() {
    this.stopEditing();

    Object.assign(this.backup, this.mediaHouse);
  }

}
