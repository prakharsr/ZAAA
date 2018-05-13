import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ReleaseOrder } from './release-order';
import { ReleaseOrderPage } from './release-order-page';

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

  searchReleaseOrders(query: string) : Observable<ReleaseOrder[]> {
    if (query) {
      return this.api.get('/user/releaseorders/' + query).pipe(
        map(data => {
          let releaseOrders : ReleaseOrder[] = [];

          if (data.success) {
            data.releaseOrders.forEach(element => {
              releaseOrders.push(this.bodyToReleaseOrder(element));
            });
          }

          return releaseOrders;
        })
      );
    }
    
    return of([]);
  }

  sendMail() {
    return this.api.post('/user/releaseorders/email', {});
  }
}
