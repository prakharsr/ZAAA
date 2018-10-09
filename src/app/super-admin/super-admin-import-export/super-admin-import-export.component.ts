import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../super-admin-api.service';
import { NotificationService, DialogService } from 'app/services';
import { Observable } from 'rxjs/Observable';
import { DialogComponent } from '../../components';

@Component({
  selector: 'app-super-admin-import-export',
  templateUrl: './super-admin-import-export.component.html',
  styleUrls: ['./super-admin-import-export.component.css']
})
export class SuperAdminImportExportComponent implements OnInit {

  constructor(private api: SuperAdminApiService,
    private notifications: NotificationService,
    private dialog: DialogService) { }

  ngOnInit() {
  }

  private download(fileName: string, base: Observable<any>) {
    base.subscribe(data => {
      if (data.msg) {
        this.notifications.show(data.msg);
      }
      else {
        console.log(data);
        
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        let url = URL.createObjectURL(blob);

        let a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = fileName;
        a.href = url;
        a.click();
      }
    });
  }

  private import(base: Observable<any>) {
    base.subscribe(
      data => {
        if (data.success) {
          this.notifications.show('Imported successfully');

          if (data.errorline) {
            this.dialog.show(DialogComponent, {
              data: {
                title: 'Imported with Errors',
                message: data.errorline,
                ok: true
              }
            });
          }
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      }
    );
  }

  mhExport() {
    this.download('media-house-export.xlsx', this.api.mediaHouseExport());
  }

  mhImport(files: FileList) {
    this.import(this.api.mediaHouseImport(files.item(0)));
  }

  rateCardExport() {
    this.download('rate-card-export.xlsx', this.api.ratecardExport());
  }

  rateCardImport(files: FileList) {
    this.import(this.api.ratecardImport(files.item(0)));
  }
}
