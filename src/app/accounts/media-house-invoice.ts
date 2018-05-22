export class MediaHouseInvoice {
    constructor(public invoiceNo = "") { }

    date: Date;
    amount = 0;
    taxAmount = 0;
}