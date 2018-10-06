export class Plan {
    constructor(public name: string,
        public cost: number,
        public maxUsers: number,
        public maxAdmins: number) {
    }

    id: string
    dur: {
        from: Date,
        upto: Date
    }

    createdOn: Date;
    expiresOn: Date;
}