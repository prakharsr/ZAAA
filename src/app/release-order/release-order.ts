import { NgbDate } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date";

export class Insertion {
    constructor(public date: NgbDate, public marked = false, public state = 0) {}

    mhimarked = false;
    _id = null;
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
    agencyGSTIN = {
        GSTType: "URD",
        GSTNo: ""
    }
    agencyPerson = "";
    
    signature = "";
    
    publicationName = "";
    publicationEdition = "";
    publicationState = "";
    publicationGSTIN = {
        GSTType: "URD",
        GSTNo: ""
    }

    pulloutName = "";
    
    mediaType = "";
    
    clientName = "";
    clientState = "";
    clientGSTIN = {
        GSTType: "URD",
        GSTNo: ""
    }
    
    adType = "";

    fixRate = false;
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
    AdTime = ""
    
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

    PremiumCustom = {
        Amount: 0,
        Percentage: false,
        PremiumType: ""
    };

    PremiumBox = {
        Amount: 0,
        Included: false
    };

    PremiumBaseColour = {
        Amount: 0,
        Included: false
    };

    PremiumEmailId = {
        Amount: 0,
        Quantity: 1,
        Included: false
    };

    PremiumCheckMark = {
        Amount: 0,
        Included: false
    };
    
    PremiumWebsite = {
        Amount: 0,
        Quantity: 1,
        Included: false
    };

    PremiumExtraWords = {
        Amount: 0,
        Quantity: 1,
        Included: false
    };
    
    clientPayment = 0;

    generated = false;

    mediaHouseInvoiceID: string;
}

export class OtherCharges {
    amount = 0;
    chargeType = "";
}