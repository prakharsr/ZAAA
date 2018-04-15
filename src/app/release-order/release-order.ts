import { NgbDate } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date";

export class Insertion {
    constructor(public date: NgbDate, public marked = false) {}
}

export class TaxValues
{
  constructor(public primary: number, public secondary = 0) {}
}

export class ReleaseOrder {
    id: string;

    date: Date;
    
    releaseOrderNO = "";
    
    agencyName = "";
    agencyAddress = "";
    agencyGSTIN = "";
    agencyPerson = "";
    
    signature = "";
    
    publicationName = "";
    publicationEdition = "";
    publicationState = "";
    publicationGSTIN = "";
    
    mediaType = "";
    
    clientName = "";
    clientState = "";
    clientGSTIN = "";
    
    adType = "";
    rate = 0;
    unit = "";
    
    adCategory1 = "";
    adCategory2 = "";
    adCategory3 = "";
    adCategory4 = "";
    adCategory5 = "";
    adCategory6 = "";
    
    adHue = "";

    adSizeL = 0;
    adSizeW = 0;
    adSizeCustom = false;
    adSizeAmount = 0;
    
    adTotalSpace = 0;
    
    adEdition = "";
    adPosition = "";
    adTime = ""
    
    adSchemePaid = 0;
    adSchemeFree = 0;
    
    adTotal = 0;

    AdWords = 0;
    AdWordsMax = 0;

    AdDuration = 0;
    
    insertions: Insertion[] = [];
    
    adGrossAmount = 0;
    
    publicationDiscount = 0;
    agencyDiscount1 = 0;
    agencyDiscount2 = 0;
    
    taxAmount = new TaxValues(0);
    taxIncluded = false;
    
    netAmountFigures = 0;
    netAmountWords = "";
    
    caption = "";
    remark = "";
    
    paymentType = "";
    paymentDate = "";
    paymentNo = "";
    paymentAmount = 0;
    paymentBankName = "";
    
    executiveName = "";
    executiveOrg = "";

    otherRemark = "";
    otherCharges: OtherCharges[] = [];

    
    clientPayment = 0;
}

export class OtherCharges {
    amount = "";
    chargeType = "";
}