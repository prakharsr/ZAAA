import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ReleaseOrder } from './release-order';
import { ReleaseOrderPage } from './release-order-page';
import { MailingDetails } from '../models/mailing-details';

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

  getReleaseOrders(page: number): Observable<ReleaseOrderPage> {
    return this.api.get('/user/releaseorders/' + page).pipe(
      map(data => {
        let releaseOrders: ReleaseOrder[] = [];

        if (data.success) {
          data.releaseOrders.forEach(element => {
            releaseOrders.push(this.bodyToReleaseOrder(element))
          });
        }

        return new ReleaseOrderPage(releaseOrders, data.perPage, data.page, data.pageCount);
      })
    )
  }

  deleteReleaseOrder(releaseOrder: ReleaseOrder) {
    return this.api.delete('/user/releaseorder/' + releaseOrder.id);
  }

  searchReleaseOrders(mediaHouseName: string, edition: string, clientName: string, executiveName: string, executiveOrg: string) : Observable<ReleaseOrderPage> {
    return this.api.post('/user/releaseorders/search', {
      publicationName: mediaHouseName,
      publicationEdition: edition,
      clientName: clientName,
      executiveName: executiveName,
      executiveOrg: executiveOrg
    }).pipe(
      map(data => {
        let releaseOrders : ReleaseOrder[] = [];

        if (data.success) {
          data.releaseOrders.forEach(element => {
            releaseOrders.push(this.bodyToReleaseOrder(element));
          });
        }

        return new ReleaseOrderPage(releaseOrders, data.perPage, data.page, data.pageCount);
      })
    );
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
    });
  }
}
