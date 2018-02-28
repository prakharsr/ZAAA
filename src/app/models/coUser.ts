import {UserRoles} from './userRoles';

export class CoUser {
    constructor(public name: string,
        public email: string,
        public phone: string) {}

    roles: UserRoles;
    id: string;
}