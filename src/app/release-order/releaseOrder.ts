export class Insertion {
    date: string;
    time: string;
    marked: boolean;
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
    adTotalSpace = "";
    adEdition = "";
    adPosition = "";
    adTime = ""
    adSchemePaid = 0;
    adSchemeFree = 0;
    adTotal = 0;
    
    insertions: Insertion[] = [];
    
    adGrossAmount = 0;
    
    publicationDiscount = 0;
    agencyDiscount1 = 0;
    agencyDiscount2 = 0;
    
    taxAmount = 0;
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
    
    otherCharges = 0;
    otherChargesType = "";
    
    clientPayment = 0;
}