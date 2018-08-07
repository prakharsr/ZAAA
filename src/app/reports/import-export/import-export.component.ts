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

  private import(base: Observable<any>) {
    base.subscribe(
      data => {
        if (data.success) {
          this.notifications.show('Imported successfully');
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

  clientExport() {
    this.download('client-export.xlsx', this.api.clientExport());
  }

  clientImport(files: FileList) {
    this.import(this.api.clientImport(files.item(0)));
  }

  executiveExport() {
    this.download('executive-export.xlsx', this.api.executiveExport());
  }

  executiveImport(files: FileList) {
    this.import(this.api.executiveImport(files.item(0)));
  }

  rateCardExport() {
    this.download('rate-card-export.xlsx', this.api.ratecardExport());
  }

  rateCardImport(files: FileList) {
    this.import(this.api.ratecardImport(files.item(0)));
  }

}
