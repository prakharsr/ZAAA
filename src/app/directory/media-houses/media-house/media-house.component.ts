import { Component, OnInit } from '@angular/core';
import { MediaHouse, MediaHouseScheduling } from '../media-house';
import { MediaHouseApiService } from '../media-house-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StateApiService } from '../../../services/state-api.service';

@Component({
  selector: 'app-media-house',
  templateUrl: './media-house.component.html',
  styleUrls: ['./media-house.component.css']
})
export class MediaHouseComponent implements OnInit {

  mediaHouse = new MediaHouse();
  error: string;
  
  id: string;

  edit = false;

  constructor(private api: MediaHouseApiService,
    private route: ActivatedRoute,
    private router: Router,
    public stateApi: StateApiService) { }

  ngOnInit() {
    this.mediaHouse.scheduling = [new MediaHouseScheduling()];

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');

        this.edit = true;

        this.route.data.subscribe((data: { mediaHouse: MediaHouse }) => {
          this.mediaHouse = data.mediaHouse;
        });
      }
      else this.mediaHouse.mediaType = 'Print';
    });
  }

  addScheduling() {
    this.mediaHouse.scheduling.push(new MediaHouseScheduling());
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
          this.error = data.msg;
        }
      },
      err => {
        console.log(err);

        this.error = 'Connection failed';
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
          this.error = data.msg;
        }
      },
      err => {
        console.log(err);

        this.error = 'Connection failed';
      }
    )
  }

  submit () {
    this.error = '';

    if (this.edit) {
      this.editMediaHouse();
    }
    else this.createMediaHouse();
  }

  cancel() {
    this.goBack();
  }

}
