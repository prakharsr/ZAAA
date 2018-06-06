import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageData } from 'app/models';
import { CreditDebitNote } from '../credit-debit-note';
import { MediaHouse, Client, ClientApiService, MediaHouseApiService } from 'app/directory';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AccountsApiService } from '../accounts-api.service';
import { NotificationService, WindowService, DialogService } from 'app/services';

@Component({
  selector: 'app-credit-debit-notes',
  templateUrl: './credit-debit-notes.component.html',
  styleUrls: ['./credit-debit-notes.component.css']
})
export class CreditDebitNotesComponent implements OnInit {

  mediaHouseNote = false;
  clientNote = false;

  mediaHouse;
  edition;
  client;

  notes: CreditDebitNote[] = [];

  page: number;
  pageCount: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private clientApi: ClientApiService,
    private mediaHouseApi: MediaHouseApiService,
    private api: AccountsApiService,
    private notifications: NotificationService,
    private windowService: WindowService,
    private dialog: DialogService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {
      mediaHouseNote: boolean,
      clientNote: boolean,
      resolved: {
        list: PageData<CreditDebitNote>,
        client?: string,
        publication?: string,
        edition?: string
      }
    }) => {
      this.mediaHouseNote = data.mediaHouseNote;
      this.clientNote = data.clientNote;

      this.notes = data.resolved.list.list;

      this.page = data.resolved.list.page;
      this.pageCount = data.resolved.list.pageCount;

      let pub = new MediaHouse();
      pub.pubName = data.resolved.publication;
      pub.address.edition = data.resolved.edition;

      this.mediaHouse = this.edition = pub;
     
      let cl = new Client();
      cl.orgName = data.resolved.client;

      this.client = cl;
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

  search(page: number) {
    this.router.navigate(['/accounts/notes', this.clientNote ? 'client' : 'mediahouse', 'list', page], {
      queryParams: this.clientNote ? { client: this.clientName } : {
        publication: this.mediaHouseName,
        edition: this.editionName
      }
    });
  }

  gen(note: CreditDebitNote) {
    this.api.generateNotePdf(note).subscribe(data => {
      if (data.msg) {
        this.notifications.show(data.msg);
      }
      else {
        console.log(data);
        
        let blob = new Blob([data], { type: 'application/pdf' });
        let url = this.windowService.window.URL.createObjectURL(blob);

        let a = this.windowService.window.document.createElement('a');
        a.setAttribute('style', 'display:none;');
        this.windowService.window.document.body.appendChild(a);
        a.download = 'note.pdf';
        a.href = url;
        a.click();
      }
    });
  }

  sendMsg(note: CreditDebitNote) {
    this.dialog.getMailingDetails().subscribe(mailingDetails => {
      if (mailingDetails) {
        this.api.mailNote(note, mailingDetails).subscribe(data => {
          if (data.success) {
            this.notifications.show("Sent Successfully");
          }
          else {
            console.log(data);

            this.notifications.show(data.msg);
          }
        });
      }
    });
  }
}
