import { MediaHouse } from "./media-house";

export class MediaHousePage {
    constructor(public mediaHouses: MediaHouse[], public perPage: number, public page: number, public pageCount: number) { }
}