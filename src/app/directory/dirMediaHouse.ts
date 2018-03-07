export class DirMediaHouse {
    orgName: string;
    pubName: string;
    nickName: string;
    mediaType: string;
    edition: string;
    address: string;
    officeLandLine: string;
    scheduling: {
        person: string;
        designation: string;
        mobileNo: string;
        deskExtension: string;
        email: string;
        assignAdType: 'Single' | 'Multiple';
        assignEdition: 'Single' | 'Multiple';
    }
}