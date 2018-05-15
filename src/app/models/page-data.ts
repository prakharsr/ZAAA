export class PageData<T> {
    constructor(public list: T[], public perPage: number, public page: number = 1, public pageCount: number = 1) { }
}