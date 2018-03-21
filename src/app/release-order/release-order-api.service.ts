import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ReleaseOrder } from './releaseOrder';

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
      map(data => data.success ? this.bodyToReleaseOrder(data.releaseOrder) : new ReleaseOrder())
    );
  }

  getReleaseOrders(): Observable<ReleaseOrder[]> {
    return this.api.get('/user/releaseorders').pipe(
      map(data => {
        let releaseOrders: ReleaseOrder[] = [];

        if (data.success) {
          data.releaseOrders.forEach(element => {
            releaseOrders.push(this.bodyToReleaseOrder(element))
          });
        }

        return releaseOrders;
      })
    )
  }
}
