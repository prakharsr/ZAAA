import { Component, OnInit } from '@angular/core';
import { CreditDebitNote } from '../credit-debit-note';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientApiService, Client, MediaHouse, MediaHouseApiService } from 'app/directory';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AccountsApiService } from '../accounts-api.service';
import { NotificationService, OptionsService } from 'app/services';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  mediaHouseNote = false;
  clientNote = false;

  client;
  mediaHouse;
  edition;

  note = new CreditDebitNote();

  constructor(private route: ActivatedRoute,
    private clientApi: ClientApiService,
    private api: AccountsApiService,
    private notifications: NotificationService,
    private router: Router,
    private mediaHouseApi: MediaHouseApiService,
    private options: OptionsService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { mediaHouseNote: boolean, clientNote: boolean }) => {
      this.mediaHouseNote = data.mediaHouseNote;
      this.clientNote = data.clientNote;
    });
  }

  goBack() {
    if (this.mediaHouseNote) {
      this.router.navigateByUrl('/accounts/notes/mediahouse');
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
    this.note.publicationName = this.mediaHouseName;
    this.note.publicationEdition = this.editionName;

    let today = new Date();
    this.note.date.day = today.getDate();
    this.note.date.month = today.getMonth() + 1;
    this.note.date.year = today.getFullYear();

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

  searchMediaHouse = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.mediaHouseApi.searchMediaHouses(term))
      .catch(() => of([]));
  }

  private get mediaHouseName() {
    if (this.mediaHouse instanceof String) {
      return this.mediaHouse;
    }

    return this.mediaHouse ? this.mediaHouse.pubName : null;
  }

  searchEdition = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.mediaHouseApi.searchMediaHousesByEdition(term, this.mediaHouseName))
      .catch(() => of([]));
  }

  editionFormatter = (mediaHouse: MediaHouse) => mediaHouse.address.edition;

  mediaHouseNameFormatter = (mediaHouse: MediaHouse) => {
    this.edition = mediaHouse;

    return mediaHouse.pubName;
  }

  private get editionName() {
    if (this.edition instanceof String) {
      return this.edition;
    }

    return this.edition ? (this.edition.address ? this.edition.address.edition : null) : null;
  }
}
