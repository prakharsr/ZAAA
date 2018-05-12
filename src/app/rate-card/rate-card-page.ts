
import { RateCard } from "./rate-card";

export class RateCardPage {
    constructor(public rateCards: RateCard[], public perPage: number, public page: number, public pageCount: number) { }
} 