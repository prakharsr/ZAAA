import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ApiService } from '@aaman/main/api.service';
import { ClientApiService } from '@aaman/dir/clients/client-api.service';
import { MediaHouseApiService } from '@aaman/dir/media-houses/media-house-api.service';
import { ExecutiveApiService } from '@aaman/dir/executives/executive-api.service';
import { ReleaseOrder } from '@aaman/releaseorder/release-order';
import { ReleaseOrderDir } from '@aaman/releaseorder/release-order-dir-resolver.service';
import { PageData } from '@aaman/main/page-data';
import { InsertionCheckItem } from '@aaman/releaseorder/insertion-check-item';
import { ReleaseOrderSearchParams } from '@aaman/releaseorder/release-order-search-params';
import { MailingDetails } from '@aaman/main/mailing-details';

@Injectable()
export class ReleaseOrderApiService {

  constructor(private api: ApiService,
    private clientApi: ClientApiService,
    private mediaHouseApi: MediaHouseApiService,
    private executiveApi: ExecutiveApiService) { }

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

  getReleaseOrderDir(id: string): Observable<ReleaseOrderDir> {
    return this.api.get('/user/releaseorder/' + id).pipe(
      map(data => data.success ? {
        releaseorder: this.bodyToReleaseOrder(data.releaseOrder),
        mediaHouse: this.mediaHouseApi.bodyToMediaHouse(data.mediahouse),
        client: this.clientApi.bodyToClient(data.client),
        executive: this.executiveApi.bodyToExecutive(data.executive)
       } : null)
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

  searchReleaseOrders(page: number, params: ReleaseOrderSearchParams) : Observable<PageData<ReleaseOrder>> {
    return this.api.post('/user/releaseorders/search', {
      page: page,
      publicationName: params.mediaHouse,
      publicationEdition: params.edition,
      clientName: params.client,
      executiveName: params.executive,
      executiveOrg: params.executiveOrg,
      creationPeriod: params.past
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

  searchInsertions(page: number, params: ReleaseOrderSearchParams) : Observable<PageData<InsertionCheckItem>> {
    return this.api.post('/user/releaseorders/insertions/search', {
      page: page,
      publicationName: params.mediaHouse,
      publicationEdition: params.edition,
      clientName: params.client,
      executiveName: params.executive,
      executiveOrg: params.executiveOrg,
      insertionPeriod: params.past
    }).pipe(
      map(data => {
        let insertions : InsertionCheckItem[] = [];

        if (data.success) {
          insertions = data.insertions;
        }

        return new PageData<InsertionCheckItem>(insertions, data.perPage, data.page, data.pageCount);
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
