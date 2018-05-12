import { Executive } from "./executive";

export class ExecutivePage {
    constructor(public executives: Executive[], public perPage: number, public page: number, public pageCount: number) { }
} 