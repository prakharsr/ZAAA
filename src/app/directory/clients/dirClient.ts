import { Address } from "../../models/address";

export class DirClient {
    orgName: string;
    companyName: string;
    nickName: string;
    category: string;
    address = new Address();
    landLine: string;
    stdNo: string;
    website: string;
    panNo: string;
    gstNo: string;
    id: string;
    contactpersons: ContactPerson[] = []; 
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