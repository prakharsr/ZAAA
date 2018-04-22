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

    scheduling: MediaHouseScheduling[] = [];

    GSTIN: string;

    global: boolean;

    Remark: string;

    id: string;
    pullouts: Pullout[] = [];

    Language: string;
}

export class MediaHouseScheduling {
    person: "";
    designation: "";
    mobileNo: "";
    deskExtension: "";
    email: "";
}

export class Pullout {
    Name: string;
    Language: string;
    Frequency: string;
    Remark: string;
}