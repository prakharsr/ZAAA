import { TaxValues, OtherCharges, Insertion } from "app/release-order";

class Amount {
    constructor(public percentage = false, public amount = 0) { }
}

export class Invoice {
    id = "";

    invoiceNO = "";

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

    FinalTaxAmount = 0;

    /*for payment reciept */
    clearedAmount = 0;
    pendingAmount = 0;

    insertions: Insertion[] = [];
}