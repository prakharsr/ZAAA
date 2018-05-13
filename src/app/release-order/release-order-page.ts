import { ReleaseOrder } from "./release-order";

export class ReleaseOrderPage {
    constructor(public releaseOrders: ReleaseOrder[], public perPage: number, public page: number, public pageCount: number) { }
}