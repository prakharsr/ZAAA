export class CreditDebitNote {
    publicationName = "";
    publicationEdition = "";

    clientName = "";

    // Used with Client
    invoiceNO = "";

    // Used with Publication
    releaseOrderNO = "";
    
    amount = 0;
    remark = "";
    
    date = {
        day: 0,
        month: 0,
        year: 0
    }
    
    DocId = "";
    firm = "";
    user = "";
}