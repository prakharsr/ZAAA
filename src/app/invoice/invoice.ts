import { OtherCharges, Insertion, TaxValues } from "../release-order/release-order";

class Amount {
    constructor(public percentage = false, public amount = 0) { }
}

export class Invoice {
    id = "";

    date: Date;
    releaseOrderId = "";

    adGrossAmount = 0;
    
    taxType = "";
    
    taxAmount = new TaxValues(0);

    taxIncluded = false;

    otherCharges: OtherCharges[] = [];

    extraCharges = new Amount();

    publicationDiscount = new Amount(true);
    agencyDiscount1 = new Amount(true);
    
    additionalCharges = new Amount();

    caption = '';
    remark = '';
    otherRemark = '';
    netAmountFigures = 0;
    netAmountWords = '';

    /*for payment reciept */
    clearedAmount = 0;
    pendingAmount = 0;

    insertions: Insertion[] = [];

    generated = false;
}