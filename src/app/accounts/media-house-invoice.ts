import { Insertion } from "../release-order";

class InsertionWithDateObject extends Insertion {
    insertionDate: Date;
}

export class MediaHouseInvoice {
    constructor(public MHINo = "") { }

    releaseOrderId = ""; // Release Order Id

    insertions: InsertionWithDateObject[] = [];

    MHIDate: Date;
    MHIGrossAmount = 0;
    MHITaxAmount = 0;
}