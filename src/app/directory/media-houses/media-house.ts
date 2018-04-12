export class MediaHouse {
    orgName: string;
    pubName: string;
    nickName: string;
    mediaType: string;
    address = {
        edition: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    };
    officeLandLine: string;
    officeStdNo: string;
    scheduling: MediaHouseScheduling[];

    freqPeriod = "";
    freqRemark = "";

    GSTIN: string;

    global: boolean;

    id: string;
    pullouts: Pullout[] = [];
}

export class MediaHouseScheduling {
    person: "";
    designation: "";
    mobileNo: "";
    deskExtension: "";
    email: "";
}

export class Pullout {

    constructor(public name: string) {

    }
}