import { Component, OnInit } from '@angular/core';
import { DirExecutive } from '../dirExecutive';
import { ExecutiveApiService } from '../executive-api.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-executive-list',
  templateUrl: './executive-list.component.html',
  styleUrls: ['./executive-list.component.css']
})
export class ExecutiveListComponent implements OnInit {

  executives: DirExecutive[] = [];

  constructor(private api: ExecutiveApiService, private dialog: DialogService) { }

  ngOnInit() {
    this.api.getExecutives().subscribe(data => this.executives = data);
  }

  deleteExecutive(executive: DirExecutive) {
    this.dialog.confirm("Are you sure you want to delete this executive?").subscribe(confirm => {
      if (!confirm)
        return;

      this.api.deleteExecutive(executive).subscribe(
        data => {
          if (data.success) {
            this.executives = this.executives.filter(c => c.id !== executive.id);
          }
          else {
            console.log(data);
          }
        },
        err => console.log(err)
      );
    });
  }
}
