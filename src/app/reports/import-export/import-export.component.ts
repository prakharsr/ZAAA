import { Component, OnInit } from '@angular/core';
import { ImportExportApiService } from '../import-export-api.service';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from 'app/services';

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.css']
})
export class ImportExportComponent implements OnInit {

  constructor(private api: ImportExportApiService,
    private notifications: NotificationService) { }

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

  mhExport() {
    this.download('media-house-export.xlsx', this.api.mediaHouseExport());
  }

  clientExport() {
    this.download('client-export.xlsx', this.api.clientExport());
  }

  executiveExport() {
    this.download('executive-export.xlsx', this.api.executiveExport());
  }

  rateCardExport() {
    this.download('rate-card-export.xlsx', this.api.ratecardExport());
  }

}
