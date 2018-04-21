import { Address } from "./address";

export class Firm {
    name: string;
    registeredAddress = new Address();
    officeAddress = new Address();
    stdNo : string;
    landlineNo: string;
    fax: string;
    website: string;

    email: string;
    phone: string;

    OtherMobile: string;

    panNo : string;
    gstNo : string;

    incDate: Date;

    bankAccountName : string;
    bankAccountNo : string;
    bankName : string;
    bankIfsc : string;
    bankBranchAddress : string;
    bankAccountType: 'Savings' | 'Current' = 'Savings';

    tagline : string;
    nickname : string;
    
    facebook : string;
    twitter: string;
    other: string;

    logo: string;

    id: string;
}