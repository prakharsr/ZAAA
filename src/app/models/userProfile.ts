export class UserProfile {
    constructor(public name: string,
        public designation: string,
        public firmName: string,
        public registeredAddress: string,
        public officeAddress: string,
        public landlineNo: string,
        public fax: string,
        public website: string,
        public panNo : string,
        public gstNo : string,
        public bankAccountName : string,
        public bankAccountNo : string,
        public bankName : string,
        public bankIfsc : string,
        public bankBranchAddress : string,
        public bankAccountType : string) { }

    id: string;
}