import { OtherCharges, Insertion } from "../release-order/release-order";

export class Invoice {
    id = "";

    date: Date;
    releaseOrderId = "";

    adGrossAmount = 0;
    
    taxType: 'CGST' | 'IGST' | 'SGST';
    
    taxAmount = {
        primary: 0,
        secondary: 0
    }

    taxIncluded = false;

    otherCharges: OtherCharges[] = [];

    extraCharges = 0;

    publicationDiscount = 0;
    agencyDiscount1 = 0;
    agencyDiscount2 = 0;
    
    additionalCharges = 0;

    additionalTax = 0;

    caption = '';
    remark = '';
    otherRemark = '';
    FinalAmount = 0;
    FinalTaxAmount = 0;
    netAmountFigures = 0;
    netAmountWords = '';

    /*for payment reciept */
    clearedAmount = 0;
    pendingAmount = 0;

    insertions: Insertion[] = [];
}