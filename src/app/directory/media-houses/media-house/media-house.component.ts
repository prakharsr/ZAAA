import { Component, OnInit } from '@angular/core';
import { MediaHouse, MediaHouseScheduling, Pullout } from '../media-house';
import { MediaHouseApiService } from '../media-house-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StateApiService } from '../../../services/state-api.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-media-house',
  templateUrl: './media-house.component.html',
  styleUrls: ['./media-house.component.css']
})
export class MediaHouseComponent implements OnInit {

  mediaHouse = new MediaHouse();
  
  id: string;

  edit = false;

  periods = ['Daily', 'Weekly', 'BiWeekly', 'Monthly'];

  constructor(private api: MediaHouseApiService,
    private route: ActivatedRoute,
    private router: Router,
    public stateApi: StateApiService,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');

        this.edit = true;

        this.route.data.subscribe((data: { mediaHouse: MediaHouse }) => {
          this.mediaHouse = data.mediaHouse;
        });
      }
      else {
        this.mediaHouse.mediaType = 'Print';
        this.mediaHouse.scheduling = [new MediaHouseScheduling()];
        this.mediaHouse.pullouts = [new Pullout('Main')];
        this.mediaHouse.freqPeriod = this.periods[0];
      }
    });
  }

  addScheduling() {
    this.mediaHouse.scheduling.push(new MediaHouseScheduling());
  }

  addPullouts() {
    this.mediaHouse.pullouts.push(new Pullout(''));
  }

  removePullouts(i: number) {
    this.mediaHouse.pullouts.splice(i, 1);
  }

  removeScheduling(i: number) {
    this.mediaHouse.scheduling.splice(i, 1);
  }
  
  private goBack() {
    this.router.navigateByUrl(this.edit ? '/dir/media_houses/' + this.id : '/dir/media_houses');
  }

  private createMediaHouse() {
    this.api.createMediaHouse(this.mediaHouse).subscribe(
      data => {
        if (data.success) {
          this.goBack();
        }
        else {
          this.notifications.show(data.msg);
        }
      },
      err => {
        console.log(err);

        this.notifications.show('Connection failed');
      }
    )
  }

  private editMediaHouse() {
    this.api.editMediaHouse(this.mediaHouse).subscribe(
      data => {
        if (data.success) {
          this.goBack();
        }
        else {
          this.notifications.show(data.msg);
        }
      },
      err => {
        console.log(err);

        this.notifications.show('Connection failed');
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
    this.goBack();
  }

}
