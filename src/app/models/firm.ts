export class Firm {
    name: string;
    registeredAddress: string;
    officeAddress: string;
    landlineNo: string;
    fax: string;
    website: string;

    email: string;
    phone: string;

    panNo : string;
    gstNo : string;

    bankAccountName : string;
    bankAccountNo : string;
    bankName : string;
    bankIfsc : string;
    bankBranchAddress : string;
    bankAccountType: 'Savings' | 'Current' = 'Savings';

    tagline : string;
    nickname : string;
    state : string;

    logo: string;

    id: string;
}