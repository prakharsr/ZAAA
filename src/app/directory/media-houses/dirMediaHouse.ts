export class DirMediaHouse {
    orgName: string;
    pubName: string;
    nickName: string;
    mediaType: string;
    address = {
        edition: "",
        address: "",
        city: "",
        state: ""
    };
    officeLandLine: string;
    scheduling: MediaHouseScheduling[];

    GSTIN: string;

    global: boolean;

    id: string;
}

export class MediaHouseScheduling {
    person: "";
    designation: "";
    mobileNo: "";
    deskExtension: "";
    email: "";
}