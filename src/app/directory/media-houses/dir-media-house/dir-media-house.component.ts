import { Component, OnInit } from '@angular/core';
import { DirMediaHouse, MediaHouseScheduling } from '../dirMediaHouse';
import { MediaHouseApiService } from '../media-house-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dir-media-house',
  templateUrl: './dir-media-house.component.html',
  styleUrls: ['./dir-media-house.component.css']
})
export class DirMediaHouseComponent implements OnInit {

  mediaHouse = new DirMediaHouse();
  error: string;
  
  id: string;

  edit = false;

  constructor(private api: MediaHouseApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.mediaHouse.scheduling = [new MediaHouseScheduling()];

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');

        this.edit = true;

        this.api.getMediaHouse(this.id).subscribe(data => this.mediaHouse = data);
      }
    });
  }

  addScheduling() {
    this.mediaHouse.scheduling.push(new MediaHouseScheduling());
  }

  removeScheduling(i: number) {
    this.mediaHouse.scheduling.splice(i, 1);
  }
  
  private goBack() {
    this.router.navigateByUrl('/dir/media_houses');
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
