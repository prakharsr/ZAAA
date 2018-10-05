import { Component, OnInit } from '@angular/core';
import { CreditDebitNote } from '../credit-debit-note';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientApiService, Client } from 'app/directory';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AccountsApiService } from '../accounts-api.service';
import { NotificationService, OptionsService } from 'app/services';
import { ReleaseOrder } from '../../release-order';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  mediaHouseNote = false;
  clientNote = false;
  releaseOrder: ReleaseOrder;

  client;

  note = new CreditDebitNote();

  constructor(private route: ActivatedRoute,
    private clientApi: ClientApiService,
    private api: AccountsApiService,
    private notifications: NotificationService,
    private router: Router,
    private options: OptionsService) { }

  ngOnInit() {
    this.note.amount = null;

    this.route.data.subscribe((data: { mediaHouseNote: boolean, clientNote: boolean, ro: ReleaseOrder }) => {
      this.mediaHouseNote = data.mediaHouseNote;
      this.clientNote = data.clientNote;

      if (this.mediaHouseNote) {
        this.releaseOrder = data.ro;

        this.note.releaseOrderNO = this.releaseOrder.releaseOrderNO;
        this.note.publicationName = this.releaseOrder.publicationName;
        this.note.publicationEdition = this.releaseOrder.publicationEdition;
      }
    });
  }

  goBack() {
    if (this.mediaHouseNote) {
      this.router.navigate(['/releaseorders', this.releaseOrder.id]);
    }
    else if (this.clientNote) {
      this.router.navigateByUrl('/accounts/notes/client');
    }
  }

  cancel() {
    this.goBack();
  }

  submit() {
    this.note.clientName = this.clientName;

    this.note.amountWords = this.options.amountToWords(this.note.amount);

    let obs: Observable<any>;

    if (this.clientNote) {
      obs = this.api.createClientNote(this.note);
    }
    else if (this.mediaHouseNote) {
      obs = this.api.createMediaHouseNote(this.note);
    }

    obs.subscribe(data => {
      if (data.success) {
        this.goBack();
      }
      else {
        console.log(data);

        this.notifications.show(data.msg);
      }
    });
  }

  searchClient = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.clientApi.searchClients(term))
      .catch(() => of([]));
  }

  clientNameFormatter = (client: Client) => client.orgName;

  private get clientName() {
    if (this.client instanceof String) {
      return this.client;
    }

    return this.client ? this.client.orgName : null;
  }
}