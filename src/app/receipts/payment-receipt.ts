export class PaymentReceipt {
    invoiceID = "";

    id = "";

    paymentType = "";
    paymentDate = "";
    paymentNo = "";
    paymentAmount = 0;
    paymentAmountWords = "";
    paymentBankName = "";
}

export class AdvanceReceipt extends PaymentReceipt {
    publicationName = "";
    publicationEdition = "";
    publicationState = "";
    publicationGSTIN = {
        GSTType: "URD",
        GSTNo: ""
    }

    clientName = "";
    clientState = "";
    clientGSTIN = {
        GSTType: "URD",
        GSTNo: ""
    }

    executiveName = "";
    executiveOrg = "";
}