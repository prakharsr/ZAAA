import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ReleaseOrder } from './release-order';
import { MailingDetails } from '../models/mailing-details';
import { PageData } from '../models/page-data';
import { InsertionCheckItem } from './insertion-check-item';

@Injectable()
export class ReleaseOrderApiService {

  constructor(private api: ApiService) { }

  private bodyToReleaseOrder(body: any) {
    let result = new ReleaseOrder();

    Object.assign(result, body);

    result.id = body._id;

    return result;
  }

  private releaseOrderToBody(releaseOrder: ReleaseOrder) {
    return releaseOrder;
  }

  createReleaseOrder(releaseOrder: ReleaseOrder) {
    return this.api.post('/user/releaseorder', this.releaseOrderToBody(releaseOrder));
  }

  editReleaseOrder(releaseOrder: ReleaseOrder) {
    return this.api.patch('/user/releaseorder', releaseOrder);
  }

  getReleaseOrder(id: string): Observable<ReleaseOrder> {
    return this.api.get('/user/releaseorder/' + id).pipe(
      map(data => data.success ? this.bodyToReleaseOrder(data.releaseOrder) : null)
    );
  }

  getReleaseOrders(page: number): Observable<PageData<ReleaseOrder>> {
    return this.api.get('/user/releaseorders/' + page).pipe(
      map(data => {
        let releaseOrders: ReleaseOrder[] = [];

        if (data.success) {
          data.releaseOrders.forEach(element => {
            releaseOrders.push(this.bodyToReleaseOrder(element))
          });
        }

        return new PageData<ReleaseOrder>(releaseOrders, data.perPage, data.page, data.pageCount);
      })
    )
  }

  getInsertions(page: number): Observable<PageData<InsertionCheckItem>> {
    return this.api.get('/user/releaseorders/insertions/' + page).pipe(
      map(data => {
        let insertions: InsertionCheckItem[] = [];

        if (data.success) {
          insertions = data.insertions;
        }

        return new PageData<InsertionCheckItem>(insertions, data.perPage, data.page, data.pageCount);
      })
    )
  }

  deleteReleaseOrder(releaseOrder: ReleaseOrder) {
    return this.api.delete('/user/releaseorder/' + releaseOrder.id);
  }

  searchReleaseOrders(mediaHouseName: string, edition: string, clientName: string, executiveName: string, executiveOrg: string, creationPeriod: number) : Observable<PageData<ReleaseOrder>> {
    return this.api.post('/user/releaseorders/search', {
      publicationName: mediaHouseName,
      publicationEdition: edition,
      clientName: clientName,
      executiveName: executiveName,
      executiveOrg: executiveOrg,
      creationPeriod: creationPeriod
    }).pipe(
      map(data => {
        let releaseOrders : ReleaseOrder[] = [];

        if (data.success) {
          data.releaseOrders.forEach(element => {
            releaseOrders.push(this.bodyToReleaseOrder(element));
          });
        }

        return new PageData<ReleaseOrder>(releaseOrders, data.perPage, data.page, data.pageCount);
      })
    );
  }

  setInsertionCheck(state: number, ids: string[]) {
    return this.api.post('/user/releaseorders/insertions/check', {
      ids: ids,
      state: state
    });
  }

  sendMail(releaseOrder: ReleaseOrder, mailingDetails: MailingDetails) {
    return this.api.post('/user/releaseorders/email', {
      id: releaseOrder.id,
      ...mailingDetails
    });
  }

  generate(releaseOrder: ReleaseOrder) {
    return this.api.post('/user/releaseorder/download', {
      id: releaseOrder.id
    }, { responseType: 'blob' });
  }
}
