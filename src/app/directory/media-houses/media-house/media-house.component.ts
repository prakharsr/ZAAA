import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaHouse, MediaHouseScheduling, Pullout } from '../media-house';
import { MediaHouseApiService } from '../media-house-api.service';
import { StateApiService, NotificationService } from 'app/services';
import { SuperAdminApiService } from '../../../super-admin/super-admin-api.service';

@Component({
  selector: 'app-media-house',
  templateUrl: './media-house.component.html',
  styleUrls: ['./media-house.component.css']
})
export class MediaHouseComponent implements OnInit {

  mediaHouse = new MediaHouse();
  backup = new MediaHouse();
  backupPullouts: Pullout[] = [];
  backupSchedulings: MediaHouseScheduling[] = [];

  get permitEdit() {
    return !this.global || this.isSuperAdmin;
  }

  private makeBackup() {
    Object.assign(this.backup, this.mediaHouse);

    this.backupPullouts = [];
    this.mediaHouse.pullouts.forEach(pullout => {
      let item = new Pullout();

      Object.assign(item, pullout);

      this.backupPullouts.push(item);
    });

    this.backupSchedulings = [];
    this.mediaHouse.scheduling.forEach(scheduling => {
      let item = new MediaHouseScheduling();

      Object.assign(item, scheduling);

      this.backupSchedulings.push(item);
    });
  }

  private restoreBackup() {
    Object.assign(this.mediaHouse, this.backup);
   
    this.mediaHouse.pullouts = [];
    this.backupPullouts.forEach(pullout => {
      let item = new Pullout();

      Object.assign(item, pullout);

      this.mediaHouse.pullouts.push(item);
    });
    
    this.mediaHouse.scheduling = [];
    this.backupSchedulings.forEach(scheduling => {
      let item = new MediaHouseScheduling();

      Object.assign(item, scheduling);

      this.mediaHouse.scheduling.push(item);
    });
  }
  
  id: string;
  new = false;

  MainPullout = new Pullout();

  periods = ['Daily', 'Weekly', 'BiWeekly', 'Monthly'];
  mediaTypes = ['Print', 'Air', 'Electronic'];

  editPublicationDetails = false;
  editPulloutDetails = false;
  editContactDetails = false;
  editSchedulingDetails = false;

  morePublicationDetails = false;
  morePulloutDetails = false;
  moreContactDetails = false;
  moreSchedulingDetails = false;

  global = false;
  isSuperAdmin = false;
  
  constructor(private api: MediaHouseApiService,
    private route: ActivatedRoute,
    public stateApi: StateApiService,
    private notifications: NotificationService,
    private router: Router,
    private superAdminApi: SuperAdminApiService) {
   
    this.MainPullout.Name = 'Main';
  }

  ngOnInit() {
    this.route.data.subscribe((data: { global: boolean, superAdmin: boolean }) => {
      this.isSuperAdmin = data.superAdmin;
      this.global = data.global;
    });

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');

        this.route.data.subscribe((data: { mediaHouse: MediaHouse }) => {
          this.mediaHouse = data.mediaHouse;
          this.makeBackup();
        });
      }
      else {
        this.new = true;
        this.mediaHouse.mediaType = this.mediaTypes[0];
        this.addMainPullout();

        this.editPublicationDetails = this.editPulloutDetails = this.editContactDetails = this.editSchedulingDetails = true;

        this.makeBackup();
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

  private goBack() {
    this.router.navigateByUrl(this.new ? '/dir/media_houses/' + this.id : '/dir/media_house');
  }

  addScheduling() {
    this.mediaHouse.scheduling.push(new MediaHouseScheduling());
  }

  addMainPullout() {
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

  submit () {
    if (this.new) {
      if (this.isSuperAdmin) {
        this.superAdminApi.createGlobalMediaHouse(this.mediaHouse).subscribe(
          data => {
            if (data.success) {
              this.router.navigateByUrl('/superadmin/media_houses');
            }
            else {
              console.log(data);
              
              this.notifications.show(data.msg);
            }
          }
        );
      }
      else {
        this.api.createMediaHouse(this.mediaHouse).subscribe(
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
    }
    else {
      if (this.isSuperAdmin) {
        this.superAdminApi.updateGlobalMediaHouse(this.mediaHouse).subscribe(
          data => {
            if (data.success) {
              this.notifications.show('Updated');
            }
            else {
              console.log(data);
              
              this.notifications.show(data.msg);
            }
          }
        );
      }
      else {
        this.api.editMediaHouse(this.mediaHouse).subscribe(
          data => {
            if (data.success) {
              this.notifications.show("Saved");
            
              this.stopEditing();
            
              this.makeBackup();
            }
            else {
              console.log(data);
              
              this.notifications.show(data.msg);
            }
          }
        );
      }
    }
  }

  cancel() {
    this.stopEditing();

    this.restoreBackup();
  }

  private goToList() {
    this.router.navigateByUrl('/dir/media_houses');
  }

  cancelCreate() {
    this.goToList();
  }
}
