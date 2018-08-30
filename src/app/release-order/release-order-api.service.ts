import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ApiService } from 'app/services';
import { ClientApiService, MediaHouseApiService, ExecutiveApiService } from 'app/directory';
import { ReleaseOrder } from './release-order';
import { ReleaseOrderDir } from './release-order-dir-resolver.service';
import { InsertionCheckItem } from './insertion-check-item';
import { ReleaseOrderSearchParams } from './release-order-search-params';
import { PageData, MailingDetails } from 'app/models';
import { Invoice } from '../invoice';

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

  cancel(releaseOrder: ReleaseOrder) {
    return this.api.post('/user/releaseorder/cancel', { id: releaseOrder.id }).pipe(
      map(data => {
        if (data.success) {
          releaseOrder.cancelled = true;
        }

        return data;
      })
    );
  }

  previewROPdf(releaseOrder: ReleaseOrder) {
    return this.api.post('/user/releaseorders/preview', {
      releaseOrder: releaseOrder
    }, { responseType: 'blob' });
  }

  previewROhtml(releaseOrder: ReleaseOrder) {
    return this.api.post('/user/releaseorders/previewHtml', {
      releaseOrder: releaseOrder
    });
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

  searchReleaseOrders(page: number, params: ReleaseOrderSearchParams, generated: boolean, releaseOrderNO = "", marked = false) : Observable<PageData<ReleaseOrder>> {
    return this.api.post('/user/releaseorders/search', {
      page: page,
      publicationName: params.mediaHouse,
      publicationEdition: params.edition,
      clientName: params.client,
      executiveName: params.executive,
      executiveOrg: params.executiveOrg,
      creationPeriod: params.past,
      generated: generated,
      releaseOrderNO: releaseOrderNO,
      marked: marked
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

  searchByNo(keyword: string) : Observable<ReleaseOrder[]> {
    return this.api.get('/user/releaseorders/searchByNo/' + keyword).pipe(
      map(data => {
        let releaseOrders: ReleaseOrder[] = [];

        if (data.success) {
          data.releaseOrders.forEach(element => {
            releaseOrders.push(this.bodyToReleaseOrder(element));
          });
        }

        return releaseOrders;
      })
    );
  }

  searchInsertions(page: number, params: ReleaseOrderSearchParams, releaseOrderNO?: string) : Observable<PageData<InsertionCheckItem>> {
    return this.api.post('/user/releaseorders/insertions/search', {
      page: page,
      publicationName: params.mediaHouse,
      publicationEdition: params.edition,
      clientName: params.client,
      executiveName: params.executive,
      executiveOrg: params.executiveOrg,
      insertionPeriod: params.past,
      releaseOrderNO: releaseOrderNO,
      generated: true
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

  generatePdf(releaseOrder: ReleaseOrder) {
    return this.api.post('/user/releaseorder/download', {
      id: releaseOrder.id
    }, { responseType: 'blob' });
  }

  generate(releaseOrder: ReleaseOrder) {
    return this.api.post('/user/releaseorder/generate', {
      id: releaseOrder.id
    });
  }

  getInvoices(releaseOrder: ReleaseOrder): Observable<Invoice[]> {
    return this.api.post('/user/invoice/pre', {
      releaseOrderId: releaseOrder.id
    }).pipe(
      map(data => {
        let result : Invoice[] = [];

        if (data.success) {
          result = data.invoices;
        }

        return result;
      })
    );
  }
}
