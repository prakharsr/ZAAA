export class InsertionCheckItem {
    _id = "";
    clientName = "";
    publicationName = "";
    publicationEdition = "";
    releaseOrderNO = "";
    insertions = {
        date: {
            year: 0,
            month: 0,
            day: 0
        },
        marked: false,
        state: 0,
        _id: "",
        ISODate: ""
    };
    executiveName = "";
    executiveOrg = "";
    checked = false;
}