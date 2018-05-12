import { Client } from "./client";

export class ClientPage {
    constructor(public clients: Client[], public perPage: number, public page: number, public pageCount: number) { }
}