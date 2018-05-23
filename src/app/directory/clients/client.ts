import { Address } from "app/models";

export class Client {
    orgName: string;
    companyName: string;
    nickName: string;
    category: string;
    SubCategoryType: string;
    address = new Address();
    landLine: string;
    stdNo: string;
    website: string;
    panNo: string;
    
    GSTIN = {
        GSTType: "RD",
        GSTNo: ""
    }

    id: string;
    contactpersons: ContactPerson[] = []; 
    Remark: string;
    IncorporationDate: Date;
}

export class ContactPerson {
    name = "";
    designation = "";
    department = "";
    mobileNo = "";
    email = "";
    photo = "";
    dob = "";
    anniversaryDate = "";
    personLandLine = "";
    personStdNo = "";
}