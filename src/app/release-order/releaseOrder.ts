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
    agencyAdress = "";
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
    adSize = "";
    adTotalSpace = "";
    adEdition = "";
    adPosition = "";
    adScheme = ""
    adTotal = 0;
    insertions: Insertion[] = [];
    adGrossAmount = 0;
    publicationDiscount = 0;
    agencyDiscount1 = 0;
    agencyDiscount2 = 0;
    taxAmount = 0;
    netAmountFigures = 0;
    netAmountWords = "";
    caption = "";
    remark = "";
    paymentDetails = "";
    executiveName = "";
    otherCharges = 0;
    clientPayment = 0;
}