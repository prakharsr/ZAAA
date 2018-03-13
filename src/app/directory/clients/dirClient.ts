export class DirClient {
    orgName: string;
    companyName: string;
    nickName: string;
    category: string;
    address: string;
    landLine: string;
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
}