export class DirMediaHouse {
    orgName: string;
    pubName: string;
    nickName: string;
    mediaType: string;
    edition: string;
    address: string;
    officeLandLine: string;
    scheduling: MediaHouseScheduling[];

    id: string;
}

export class MediaHouseScheduling {
    person: "";
    designation: "";
    mobileNo: "";
    deskExtension: "";
    email: "";
}