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
    originalAmount = 0;

    get isCancelled() {
        return this.status == 2;
    }

    set isCancelled(cancel: boolean) {
        this.status = cancel ? 2 : 0;
    }

    advanced = false;

    mediahouseID = "";
    publicationName = "";
    publicationEdition = "";
    publicationState = "";
    publicationGSTIN = {
        GSTType: "URD",
        GSTNo: ""
    }

    clientID = "";
    clientName = "";
    clientState = "";
    clientGSTIN = {
        GSTType: "URD",
        GSTNo: ""
    }

    executiveID = "";
    executiveName = "";
    executiveOrg = "";
    remark = "";

    linked = false;
    originalReceiptNo = "";
    originalReceiptDate: Date;
}

export class AdvanceReceipt extends PaymentReceipt { }