export class PaymentReceipt {
    invoiceID = "";

    receiptNO = "";
    status = 0;

    id = "";

    paymentType = "";
    paymentDate = "";
    paymentNo = "";
    paymentAmount = 0;
    paymentAmountWords = "";
    paymentBankName = "";

    get isCancelled() {
        return this.status == 2;
    }

    set isCancelled(cancel: boolean) {
        this.status = cancel ? 2 : 0;
    }

    advanced = false;
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